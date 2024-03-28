"use client";
import React, { useRef, useState } from "react";
import { CustomButton } from "./CustomButton";
import { Avatar, AvatarProps, Image, VStack } from "@chakra-ui/react";

interface ImageUploaderProps extends AvatarProps {
    savedImage?: string;
    bucket: "avatar" | "banner" | "product" | "logo";
    setSelectedFile: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
    savedImage,
    bucket,
    setSelectedFile,
}) => {
    const [displayImage, setDisplayImage] = useState(savedImage);
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

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

    const openFileBrowser = () => {
        inputRef.current?.click();
    };

    return (
        <VStack>
            <>
                {bucket === "banner" ? (
                    <Image
                        alt={"banner-upload"}
                        src={displayImage}
                        borderRadius="md"
                        height="128px"
                        width="400px"
                        objectFit="cover"
                        fallbackSrc="https://image-assets.aus-2.volcanic.cloud/api/v1/assets/images/57937968d9a50e1e67171caa2db2247c?t=1688533841"
                    />
                ) : bucket === "product" ? (
                    <Image
                        alt={"product-upload"}
                        src={displayImage}
                        borderRadius="md"
                        height="128px"
                        width="128px"
                        objectFit="cover"
                    />
                ) : (
                    <Avatar
                        size="2xl"
                        src={displayImage}
                    />
                )}
            </>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleChange}
                style={{ display: "none" }}
            />
            {savedImage ? (
                <CustomButton
                    variant="secondary"
                    w="fit-content"
                    onClick={openFileBrowser}
                >
                    Change
                </CustomButton>
            ) : (
                <CustomButton
                    variant="secondary"
                    w="fit-content"
                    onClick={openFileBrowser}
                >
                    Add
                </CustomButton>
            )}
        </VStack>
    );
};
