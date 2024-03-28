import { useEffect, useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Stack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Textarea,
    FormErrorMessage,
    HStack,
    Spacer,
    Text,
} from "@chakra-ui/react";
import { CustomButton } from "./CustomButton";
import { ImageUploader } from "./ImageUpload";
import { useToast } from "@chakra-ui/react";
import useUser from "@/app/lib/hooks";
import { supabase } from "@/app/lib/supabase";
import MultiSelectMenu from "./MultiSelectMenu";
import { ShopCategory } from "@prisma/client";

interface VendorInfo {
    name: string;
    email: string;
    phone: string;
    logo: string;
    banner: string;
    bio: string;
    description: string;
    shopTags: string[];
}

export default function BecomeAVendorForm({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [vendorInfo, setVendorInfo] = useState<VendorInfo>({
        name: "",
        email: "",
        phone: "",
        logo: "",
        banner: "",
        bio: "",
        description: "",
        shopTags: [],
    });
    const [errors, setErrors] = useState({
        shopName: "",
        bio: "",
        phone: "",
    });
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const { data: user } = useUser();
    const toast = useToast();
    const [allShopTags, setAllShopTags] = useState<ShopCategory[]>([]);
    const [tagMenu, setTagMenu] = useState<string[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleInputChange = (field: keyof VendorInfo, value: string) => {
        const newInfo = { ...vendorInfo, [field]: value };
        setVendorInfo(newInfo);
        validateForm(newInfo);
    };

    const handleBioChange = (value: string) => {
        setVendorInfo((prevState) => ({
            ...prevState,
            bio: value,
        }));

        if (value.length > 120) {
            setErrors({
                ...errors,
                bio:
                    "Bio must be less than 120 characters, you have " +
                    value.length +
                    " characters.",
            });
        } else {
            setErrors({ ...errors, bio: "" });
        }
    };

    const handleClose = () => {
        setErrors({
            shopName: "",
            bio: "",
            phone: "",
        });
        onClose();
    };

    useEffect(() => {
        // Load shop tags
        const fetchShopTags = fetch("/api/shopCategories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        fetchShopTags
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    setAllShopTags(data.data);
                    // get only the tag names and sort them
                    const tags = data.data.map((tag: ShopCategory) => tag.name).sort();
                    setTagMenu(tags);
                }
            })
            .catch((err) => {
                alert("Error fetching shop tags:");
            });
    }, []);

    const uploadFileToStorage = async (file: File, bucket: string): Promise<string | undefined> => {
        if (!file) {
            console.log("No file selected to upload");
            return;
        }
        try {
            // Append current timestamp to file path
            const timestamp = Date.now();
            const filePath = `${user?.id}/${file.name}-${timestamp}`;

            // Upload to Supabase storage
            const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
                cacheControl: "3600",
                upsert: true,
            });
            if (error) {
                console.error("Upload error:", error.message);
                return;
            }

            // Get file storage path to be saved in DB
            const fileUrl =
                process.env.NEXT_PUBLIC_SUPABASE_URL +
                "/storage/v1/object/public/" +
                bucket +
                "/" +
                data.path;
            return fileUrl;
        } catch (e) {
            console.error("Error during file upload:", e);
        }
    };

    const createVendorInDB = async (vendorInfo: VendorInfo) => {
        // find IDs of selected shop tags
        const selectedTags = allShopTags.filter((tag) => vendorInfo.shopTags.includes(tag.name));
        const tagIds = selectedTags.map((tag) => tag.id);
        vendorInfo.shopTags = tagIds;
        vendorInfo.email = user?.email || "";

        const res = await fetch("/api/vendors/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                vendor: vendorInfo,
                userID: user?.id,
                shopTags: tagIds,
            }),
        });

        const data = await res.json();

        console.log(res.status, data.data);

        if (data.message === "existed") {
            toast({
                title: "You already has a vendor profile!",
                status: "info",
                variant: "subtle",
                duration: 2000,
                isClosable: true,
                containerStyle: {
                    color: "white",
                },
            });

            return data.data;
        } else if (data.message === "ok") {
            toast({
                title: "Vendor Account Created Successfully! 🎉",
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            return data.data;
        } else {
            toast({
                title: "Unable to make a new Vendor Account. Please try again.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });

            return;
        }
    };

    // error handling
    const validateForm = (info: VendorInfo) => {
        let isValid = true;
        const newErrors = errors;

        // Validate shop name
        if (!info.name) {
            newErrors.shopName = "Shop name is required";
            isValid = false;
        } else {
            newErrors.shopName = "";
        }

        // Validate bio
        if (info.bio.length > 120) {
            newErrors.bio = "Bio must be less than 120 characters";
            isValid = false;
        } else {
            newErrors.bio = "";
        }

        // Validate phone to be a valid phone number
        if (info.phone && !/^\d{10}$/.test(info.phone)) {
            newErrors.phone = "Invalid phone number. Must be 10 digits.";
            isValid = false;
        } else {
            newErrors.phone = "";
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateForm(vendorInfo)) {
            return;
        }

        try {
            setIsProcessing(true);
            let updatedVendorInfo = { ...vendorInfo };
            if (logoFile) {
                const uploadedLogoUrl = await uploadFileToStorage(logoFile, "logo");
                if (uploadedLogoUrl) {
                    updatedVendorInfo.logo = uploadedLogoUrl;
                }
            }
            if (bannerFile) {
                const uploadedBannerUrl = await uploadFileToStorage(bannerFile, "banner");
                if (uploadedBannerUrl) {
                    updatedVendorInfo.banner = uploadedBannerUrl;
                }
            }
            const newVendor = await createVendorInDB(updatedVendorInfo);
            setVendorInfo(updatedVendorInfo);

            if (newVendor) {
                setIsProcessing(false);
            }

            onClose();
        } catch (e) {
            console.error("Error in submit:", e);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size={"2xl"}
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color={"text.primary"}>Become A Vendor</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={5}>
                        <FormControl
                            id="name"
                            isInvalid={!!errors.shopName}
                            isRequired
                        >
                            <FormLabel fontWeight={600}>Shop Name</FormLabel>
                            <Input
                                type="text"
                                value={vendorInfo?.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                placeholder="Enter Shop Name"
                                _placeholder={{ color: "gray.400" }}
                            />
                            <FormErrorMessage>{errors.shopName}</FormErrorMessage>
                        </FormControl>

                        <HStack
                            display="flex"
                            justifyContent="space-between"
                        >
                            <FormControl
                                id="logo"
                                width="fit-content"
                            >
                                <Stack
                                    direction={["column"]}
                                    alignItems="start"
                                    width="fit-content"
                                >
                                    <FormLabel fontWeight={600}>Shop Logo</FormLabel>
                                    <ImageUploader
                                        bucket="logo"
                                        setSelectedFile={setLogoFile}
                                        savedImage={vendorInfo?.logo}
                                    />
                                </Stack>
                            </FormControl>
                            <FormControl
                                id="banner"
                                width="fit-content"
                            >
                                <Stack
                                    direction={["column"]}
                                    alignItems="start"
                                    width="fit-content"
                                >
                                    <FormLabel fontWeight={600}>Banner Image</FormLabel>
                                    <ImageUploader
                                        bucket="banner"
                                        setSelectedFile={setBannerFile}
                                        savedImage={vendorInfo?.banner}
                                    />
                                </Stack>
                            </FormControl>
                        </HStack>

                        <FormControl
                            id="bio"
                            isInvalid={!!errors.bio}
                        >
                            <FormLabel fontWeight={600}>Brief Description</FormLabel>
                            <Textarea
                                value={vendorInfo?.bio}
                                onChange={(e) => handleBioChange(e.target.value)}
                                placeholder="Enter brief description to be displayed on your storefront's preview card. Max 120 characters."
                                _placeholder={{ color: "gray.400" }}
                            />
                            <FormErrorMessage>{errors.bio}</FormErrorMessage>
                        </FormControl>

                        <FormControl id="aboutUs">
                            <FormLabel fontWeight={600}>About Us</FormLabel>
                            <Textarea
                                value={vendorInfo?.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                placeholder="Enter full description to be displayed on your storefront's page."
                                _placeholder={{ color: "gray.400" }}
                            />
                        </FormControl>

                        <HStack>
                            <FormControl
                                id="phone"
                                isInvalid={!!errors.phone}
                            >
                                <FormLabel fontWeight={600}>Phone</FormLabel>
                                <Input
                                    type="tel"
                                    value={vendorInfo?.phone}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                />
                                <FormErrorMessage>{errors.phone}</FormErrorMessage>
                            </FormControl>

                            <Spacer />

                            <FormControl
                                id="email"
                                isReadOnly
                            >
                                <FormLabel fontWeight={600}>Email</FormLabel>
                                <Input
                                    type="email"
                                    value={user?.email}
                                />
                            </FormControl>
                        </HStack>

                        <FormControl id="tags">
                            <FormLabel fontWeight={600}>Store Tags (Max 3)</FormLabel>
                            <MultiSelectMenu
                                label="Select Shop Tags"
                                options={tagMenu}
                                onChange={(tags: string[]) =>
                                    setVendorInfo((prevState) => ({
                                        ...prevState,
                                        shopTags: tags,
                                    }))
                                }
                            />
                        </FormControl>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <CustomButton
                        onClick={handleSubmit}
                        mr={3}
                        isLoading={isProcessing}
                        loadingText="Creating Vendor Account..."
                    >
                        Create Vendor Account
                    </CustomButton>
                    <CustomButton
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Cancel
                    </CustomButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
