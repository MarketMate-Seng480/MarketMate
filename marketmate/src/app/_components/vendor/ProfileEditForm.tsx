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
import useUser from "@/app/lib/hooks";
import { supabase } from "@/app/lib/supabase";

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
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const {data:user} = useUser();

  const handleInputChange = (field: keyof Vendor, value: string) => {
    setVendorInfo((prev: Vendor) => ({ ...prev, [field]: value }));
  };

  const uploadFileToStorage = async (file: File, bucket: string): Promise<string | undefined> => {
    if (!file) {
      console.log("No file selected to upload");
      return;
    }

    try {
      const filePath = `${user?.id}/${bucket}`;
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
      // Bug: program never reaches here (stops executing after upload)
      if (error) {
        console.error("Upload error:", error.message);
        return;
      }
      const fileUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      + '/storage/v1/object/public/'
      + bucket
      + '/'
      + data.path;
      return fileUrl;   
    } catch (e) {
      console.error("Error during file upload:", e);
    }
  };

  const updateVendorInfo = async (info: Vendor) => {
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

  const handleSubmit = async () => {
    try {
      let updatedVendorInfo = { ...vendorInfo };
      if (avatarFile) {
        const uploadedUrl = await uploadFileToStorage(avatarFile, 'avatar');
        // Bug: program stops in uploadFileToStorage (never reaches this if statement)
        if (uploadedUrl) {
          updatedVendorInfo.logo = uploadedUrl;
        }
      }
      await updateVendorInfo(updatedVendorInfo);
    } catch (e) {
      console.error("Error in submit:", e);
    }
  }
  
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
                <ImageUploader bucket="avatar" setSelectedFile={setAvatarFile} savedImage={vendorInfo?.logo}/>
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
