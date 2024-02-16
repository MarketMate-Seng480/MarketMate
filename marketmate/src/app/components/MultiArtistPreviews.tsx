import { VStack, Flex } from "@chakra-ui/react";
import React from "react";
import ArtistPreview from "./ArtistPreview";
import { Vendor } from "../types";

export interface MultiArtistsPreviewsProps {
  vendors: Vendor[];
}

export const MultiArtistsPreviews: React.FC<MultiArtistsPreviewsProps> = ({ vendors }) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      w="full"
    >
      <VStack spacing={5}>
        {vendors.map((vendor, index) => (
          <ArtistPreview
            key={index}
            id={vendor.id + ""}
            name={vendor.name}
            logo={vendor.logo}
            description={vendor.description}
            images={vendor.images}
          />
        ))}
      </VStack>
    </Flex>
  );
};
