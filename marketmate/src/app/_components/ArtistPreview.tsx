"use client";
import React, { useState } from "react";
import {
  HStack,
  VStack,
  Box,
  Link,
  Text,
  Image,
  IconButton,
  Card,
  CardBody,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export interface ArtistPreviewProps {
  id: string;
  name: string;
  logo: string;
  description: string;
  images: string[];
}

const ArtistPreview: React.FC<ArtistPreviewProps> = ({ id, name, logo, description, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Box w="full">
      <Card direction={{ base: "column", sm: "row" }}>
        <CardBody>
          <VStack align={"left"}>
            <Link
              as={NextLink}
              mt={1}
              display="block"
              fontSize="lg"
              lineHeight="normal"
              fontWeight="semibold"
              href={`/shop/${id}`}
              textAlign={"left"}
            >
              {name}
            </Link>
            <Flex>
              <Image
                boxSize="200px"
                borderRadius="lg"
                src={logo}
                alt="Shop Logo"
              />

              <Spacer />
              {images.length > 5 && (
                <HStack>
                  {currentImageIndex > 0 && (
                    <IconButton
                      variant="ghost"
                      isRound={true}
                      aria-label="Previous"
                      onClick={handlePrev}
                      icon={<ChevronLeftIcon />}
                    />
                  )}
                  {currentImageIndex == 0 && <Box w="40px" />}
                  <Image
                    src={images[currentImageIndex]}
                    boxSize="200px"
                    alt="Carousel Image"
                  />
                  <Image
                    src={images[currentImageIndex + 1]}
                    boxSize="200px"
                    alt="Carousel Image"
                  />
                  <Image
                    src={images[currentImageIndex + 2]}
                    boxSize="200px"
                    alt="Carousel Image"
                  />
                  <Image
                    src={images[currentImageIndex + 3]}
                    boxSize="200px"
                    alt="Carousel Image"
                  />
                  <Image
                    src={images[currentImageIndex + 4]}
                    boxSize="200px"
                    alt="Carousel Image"
                  />
                  {/* TODO: Update the remainder of this like above */}
                  {currentImageIndex == images.length - 3 && <Box w="40px" />}
                  {currentImageIndex < images.length - 3 && (
                    <IconButton
                      variant="ghost"
                      isRound={true}
                      aria-label="Next"
                      onClick={handleNext}
                      icon={<ChevronRightIcon />}
                    />
                  )}
                </HStack>
              )}

              {images.length <= 3 && (
                <HStack>
                  <Image
                    src={images[currentImageIndex]}
                    boxSize="200px"
                    alt="Carousel Image"
                  />
                  <Image
                    src={images[currentImageIndex + 1]}
                    boxSize="200px"
                    alt="Carousel Image"
                  />
                  <Image
                    src={images[currentImageIndex + 2]}
                    boxSize="200px"
                    alt="Carousel Image"
                  />
                </HStack>
              )}
              <Spacer />
            </Flex>

            <Text
              mt={2}
              color="gray.500"
              align={"left"}
              noOfLines={2}
            >
              {description}
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default ArtistPreview;
