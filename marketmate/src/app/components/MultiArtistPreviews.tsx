import { VStack } from "@chakra-ui/react";
import React from "react";
import ArtistPreview, { ArtistPreviewProps } from "./ArtistPreview";

export interface MultiArtistsPreviewsProps {
    vendors: ArtistPreviewProps[];
}

export const MultiArtistsPreviews: React.FC<MultiArtistsPreviewsProps> = ({vendors}) => {
    return (
        <VStack spacing={5}>
            {vendors.map((vendor, index) => (
                <ArtistPreview
                    key={index}
                    shopName={vendor.shopName} 
                    shopLogo={vendor.shopLogo} 
                    shopLink={vendor.shopLink} 
                    shopDescription={vendor.shopDescription} 
                    images={vendor.images}
                />
            ))}
        </VStack>
    );
}