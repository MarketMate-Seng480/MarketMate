"use client";
import React, { useState } from "react";
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
    HStack,
} from "@chakra-ui/react";
import { Vendor } from "@prisma/client";
import { CustomButton } from "../CustomButton";
import { ImageUploader } from "../ImageUpload";
import useUser from "@/app/lib/hooks";
import { supabase } from "@/app/lib/supabase";
import { useToast } from "@chakra-ui/react";

export default function ProfileEditModal({
    isOpen,
    onClose,
    onSave,
    initialVendorInfo,
    setPageVendorInfo,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    initialVendorInfo: Vendor;
    setPageVendorInfo: (vendor: Vendor) => void;
}) {
    const [modalVendorInfo, setModalVendorInfo] = useState(initialVendorInfo);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const { data: user } = useUser();
    const toast = useToast();

    const handleInputChange = (field: keyof Vendor, value: string) => {
        setModalVendorInfo((prev: Vendor) => ({ ...prev, [field]: value }));
    };

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

    const uploadVendorToDatabase = async (info: Vendor) => {
        const selectedInfo = {
            name: info.name,
            email: info.email,
            phone: info.phone,
            description: info.description,
            logo: info.logo,
            banner: info.banner,
            // storeTags: info.storeTags,
        };

        const res = await fetch(`/api/vendors/${info.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedInfo),
        });
        const vendor = await res.json();
        if (res.status !== 200) {
            console.error("Error updating vendor from profile edit", vendor.error);
            return;
        }

        toast({
            title: "Storefront info updated successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
        });

        return vendor.data;
    };

    const handleSubmit = async () => {
        try {
            let updatedVendorInfo = { ...modalVendorInfo };
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
            await uploadVendorToDatabase(updatedVendorInfo);
            setModalVendorInfo(updatedVendorInfo);
            setPageVendorInfo(updatedVendorInfo);
        } catch (e) {
            console.error("Error in submit:", e);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={"2xl"}
            closeOnOverlayClick={false}
        >
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Edit Storefront</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Stack spacing={5}>
                        <FormControl id="name">
                            <FormLabel fontWeight={600}>Shop Name</FormLabel>
                            <Input
                                type="text"
                                value={modalVendorInfo?.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                            />
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
                                        savedImage={modalVendorInfo?.logo}
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
                                        savedImage={modalVendorInfo?.banner}
                                    />
                                </Stack>
                            </FormControl>
                        </HStack>

                        <FormControl id="email">
                            <FormLabel fontWeight={600}>Email</FormLabel>
                            <Input
                                type="email"
                                value={modalVendorInfo?.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                            />
                        </FormControl>

                        <FormControl id="phone">
                            <FormLabel fontWeight={600}>Phone</FormLabel>
                            <Input
                                type="tel"
                                value={modalVendorInfo?.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                            />
                        </FormControl>

                        <FormControl id="tags">
                            <FormLabel fontWeight={600}>
                                Store tags (split by &quot;,&quot;)
                            </FormLabel>
                        </FormControl>

                        <FormControl id="aboutUs">
                            <FormLabel fontWeight={600}>About Us</FormLabel>
                            <Textarea
                                value={modalVendorInfo?.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                            />
                        </FormControl>
                    </Stack>
                </ModalBody>

                <ModalFooter gap="1rem">
                    <CustomButton
                        variant={"secondary"}
                        onClick={onClose}
                    >
                        Cancel
                    </CustomButton>
                    <CustomButton
                        mr={3}
                        onClick={() => {
                            handleSubmit();
                            onSave();
                        }}
                    >
                        Save
                    </CustomButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
