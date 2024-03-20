import React, { useState, useRef } from 'react';
import { VStack, Avatar, AvatarProps } from '@chakra-ui/react';
import { CustomButton } from '../CustomButton';

interface AvatarUploadProps extends AvatarProps{
  savedImage: string;
  variant: 'avatar' | 'banner' | 'product';
  onFileSelected: (file: File) => void;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({ savedImage, variant, onFileSelected }) => {
  const [displayImage, setDisplayImage] = useState(savedImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setDisplayImage(e.target?.result as string);
      };
      fileReader.readAsDataURL(file);
      onFileSelected(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <VStack>
        {/* Condition here for type of image display (Avatar or Box) */}
      <Avatar size='2xl' src={displayImage} />
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      {savedImage ? (
        <CustomButton
            variant="secondary" 
            w='fit-content'
            onClick={triggerFileInput}
        >
            Change
        </CustomButton>
      ) : (
        <CustomButton
            variant="secondary" 
            w='fit-content'
            onClick={triggerFileInput}
        >
            Add
        </CustomButton>
      )}
    </VStack>
  );
};