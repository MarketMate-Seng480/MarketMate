"use client";
import React, { useRef, useState } from "react";
import { supabase } from '../lib/supabase';
import useUser from "../lib/hooks";
import { CustomButton } from "./CustomButton";
import { Avatar, AvatarProps, VStack } from "@chakra-ui/react";

interface ImageUploaderProps extends AvatarProps {
  savedImage?: string;
  bucket: 'avatar' | 'banner' | 'product' | 'logo';
  setImageUrl: (url: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  savedImage, bucket, setImageUrl
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [displayImage, setDisplayImage] = useState(savedImage);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const {data:user} = useUser()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setDisplayImage(e.target?.result as string);
      };
      fileReader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log("No file selected to upload");
      return;
    }

    const filePath = `${user?.id}/${bucket}`;
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, selectedFile, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error("Upload error:", error.message);
      return;
    }

    setImageUrl(
      process.env.NEXT_PUBLIC_SUPABASE_URL
      + '/storage/v1/object/public/'
      + bucket
      + '/'
      + data.path
    )
  };

  const openFileBrowser = () => {
    inputRef.current?.click();
  };

  return (
    <VStack>
    <Avatar size='2xl' src={displayImage} />
    <input
      type="file"
      accept="image/*"
      ref={inputRef}
      onChange={handleChange}
      style={{ display: 'none' }}
    />
    {savedImage ? (
      <CustomButton
          variant="secondary" 
          w='fit-content'
          onClick={openFileBrowser}
      >
          Change
      </CustomButton>
    ) : (
      <CustomButton
          variant="secondary" 
          w='fit-content'
          onClick={openFileBrowser}
      >
          Add
      </CustomButton>
    )}
    {/* TODO: Remove this so upload happens on parent component submission */}
    <CustomButton onClick={handleUpload}>Submit</CustomButton>
  </VStack>
  )
}