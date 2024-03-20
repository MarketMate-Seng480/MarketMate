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
import { AvatarUpload } from "./AvatarUpload";
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import { supabase } from "../../lib/supabase";
import useUser from "../../lib/hooks";
import { useRouter } from "next/navigation";

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
  // To delete
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {data:user} = useUser();
  const router = useRouter();
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleFileSelected = (newFile: File) => {
    setSelectedFile(newFile);
      uppy.addFile({
        source: "file-added",
        name: newFile.name,
        type: newFile.type,
        data: newFile
      });
    }

  // Executed before upload request is sent
  const onBeforeRequest = async (req: any) => {
    const { data } = await supabase.auth.getSession();
    req.setHeader("Authorization", `Bearer ${data.session?.access_token}`);
  };

  // Initialize Uppy with specific restrictions
  const [uppy] = useState(() => 
      new Uppy({
        restrictions:{
          maxNumberOfFiles: 1,
          allowedFileTypes: ['image/*'],
          maxFileSize: 5 * 1000 * 1000, // 5MB
        },
  // Use Tus protocol by specifying an endpoint for uploads 
    }).use(Tus, { 
      endpoint: process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/upload/resumable",
      onBeforeRequest,
      allowedMetaFields: [
        "bucketName",
        "objectName",
        "contentType",
        "cacheControl",
      ],
    })
  );

  uppy.on('file-added', (file) => {
    file.meta = {
            ...file.meta,
      bucketName: 'avatar',
      contentType: file.type,
    }

  });

  uppy.on("upload-success", () => {
    uppy.cancelAll();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    document.getElementById("trigger-close")?.click();
    router.refresh();
  });  

  const handleFileUpload = () => {
    if (uppy.getFiles().length === 0) console.error("No file to upload");

    const randomUUID = crypto.randomUUID();

    uppy.setFileMeta(uppy.getFiles()[0].id, {
      objectName: user?.id + "/" + randomUUID + "/" + uppy.getFiles()[0].name,
    });

    const filename = uppy.getFiles()[0].name;
    console.log('filename', filename);

    uppy.upload();
  };

  const handleInputChange = (field: keyof Vendor, value: string) => {
    setVendorInfo((prev: Vendor) => ({ ...prev, [field]: value }));
  };

  const updateVendorInfo = async (info: Vendor) => {
    if (selectedFile) {
      console.log('trying to upload file');
      handleFileUpload();
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
                <AvatarUpload
                  variant='avatar' 
                  savedImage={vendorInfo?.logo}
                  onFileSelected={handleFileSelected}
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
