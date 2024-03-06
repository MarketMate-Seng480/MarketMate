import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
} from "@chakra-ui/react";
import { Vendor } from "@/app/types";

export default function ProfileEditModalContainer({
  isOpen,
  onClose,
  initialVendorInfo,
  setVendorInfo,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialVendorInfo: Vendor;
  setVendorInfo: (info: Vendor) => void;
}) {
  const [tempVendorInfo, setTempVendorInfo] = useState(initialVendorInfo);

  const handleInputChange = (field: keyof Vendor, value: string) => {
    setTempVendorInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleTagsChange = (value: string) => {
    setTempVendorInfo((prevState) => ({
      ...prevState,
      shopTags: value.split(",").map((tag) => tag.trim()),
    }));
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
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Stack spacing={5}>
            <FormControl id="name">
              <FormLabel fontWeight={600}>Shop Name</FormLabel>
              <Input
                type="text"
                value={tempVendorInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </FormControl>

            <FormControl id="logo">
              <Stack
                direction={["column", "row"]}
                spacing={10}
              >
                <FormControl id="logo">
                  <FormLabel fontWeight={600}>Shop Logo URL</FormLabel>
                  <Input
                    type="text"
                    value={tempVendorInfo.logo}
                    onChange={(e) => handleInputChange("logo", e.target.value)}
                  />
                </FormControl>
                <Avatar
                  size="xl"
                  src={tempVendorInfo.logo}
                />
              </Stack>
            </FormControl>

            <FormControl id="email">
              <FormLabel fontWeight={600}>Email</FormLabel>
              <Input
                type="email"
                value={tempVendorInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </FormControl>

            <FormControl id="phone">
              <FormLabel fontWeight={600}>Phone</FormLabel>
              <Input
                type="tel"
                value={tempVendorInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </FormControl>

            <FormControl id="address">
              <FormLabel fontWeight={600}>Address</FormLabel>
              <Input
                type="text"
                value={tempVendorInfo.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </FormControl>

            <FormControl id="tags">
              <FormLabel fontWeight={600}>Store tags (split by &quot;,&quot;)</FormLabel>
              <Input
                type="text"
                value={tempVendorInfo.shopTags.join(", ")}
                onChange={(e) => handleTagsChange(e.target.value)}
              />
            </FormControl>

            <FormControl id="aboutUs">
              <FormLabel fontWeight={600}>About Us</FormLabel>
              <Textarea
                value={tempVendorInfo.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            bg={"#D1C7BD"}
            _hover={{ bg: "#C4BEB5" }}
            mr={3}
            onClick={() => {
              setVendorInfo(tempVendorInfo);
              onClose();
            }}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
