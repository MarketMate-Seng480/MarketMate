'use client';
import React, { useState, useEffect } from "react";
import {
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
import { Vendor } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CustomButton } from "../CustomButton";


export default function ProfileCreationForm({
    isOpen,
    onClose,
    onExit,
    onSave,
    initialVendorInfo,
}: {
    isOpen: boolean;
    onClose: () => void;
    onExit: () => void;
    onSave: (vendor_info: any) => void;
    initialVendorInfo: any;
}) {

  const [vendorInfo, setVendorInfo] = useState(initialVendorInfo);

  const handleInputChange = (field: keyof Vendor, value: string) => {
    setVendorInfo((prev: any) => ({ ...prev, [field]: value }));
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
                value={vendorInfo?.name}
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
                    value={vendorInfo?.logo}
                    onChange={(e) => handleInputChange("logo", e.target.value)}
                  />
                </FormControl>
                <Avatar
                  size="xl"
                  src={vendorInfo?.logo}
                />
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
          <CustomButton
            mr={3}
            onClick={() => {
              onSave(vendorInfo);
            }}
          >
            Save
          </CustomButton>
          <CustomButton variant={'secondary'} onClick={onExit}>Cancel</CustomButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}