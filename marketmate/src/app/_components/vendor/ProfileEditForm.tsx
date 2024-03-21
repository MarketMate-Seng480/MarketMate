'use client';
import React, { useEffect, useRef, useState } from "react";
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
} from "@chakra-ui/react";
import { Vendor } from "@prisma/client";
import { CustomButton } from "../CustomButton";
import { ImageUploader } from "../ImageUpload";

export default function ProfileEditModalContainer({
  isOpen,
  onClose,
  onSave,
  initialVendorInfo,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  initialVendorInfo: Vendor;
}) {
  const [vendorInfo, setVendorInfo] = useState(initialVendorInfo);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleInputChange = (field: keyof Vendor, value: string) => {
    setVendorInfo((prev: Vendor) => ({ ...prev, [field]: value }));
  };

  const updateVendorInfo = async (info: Vendor) => {
    if (imageUrl) {
      setVendorInfo(prev => ({ ...prev, logo: imageUrl }));
    }
    const res = await fetch(`/api/vendors/${info.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    const vendor = await res.json();
    return vendor.data;
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
                value={vendorInfo?.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </FormControl>

            <FormControl id="logo">
              <Stack
                direction={["column"]}
                spacing={8}
              >
                <FormLabel fontWeight={600}>Shop Logo</FormLabel>
                <ImageUploader bucket="avatar" setImageUrl={setImageUrl} savedImage={vendorInfo?.logo}/>
              </Stack>
            </FormControl>

            <FormControl id="email">
              <FormLabel fontWeight={600}>Email</FormLabel>
              <Input
                type="email"
                value={vendorInfo?.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </FormControl>

            <FormControl id="phone">
              <FormLabel fontWeight={600}>Phone</FormLabel>
              <Input
                type="tel"
                value={vendorInfo?.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </FormControl>

            <FormControl id="tags">
              <FormLabel fontWeight={600}>Store tags (split by &quot;,&quot;)</FormLabel>
            </FormControl>

            <FormControl id="aboutUs">
              <FormLabel fontWeight={600}>About Us</FormLabel>
              <Textarea
                value={vendorInfo?.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
        <CustomButton variant={'secondary'} onClick={onClose}>Cancel</CustomButton>
          <CustomButton
            mr={3}
            onClick={() => {
              updateVendorInfo(vendorInfo);
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
