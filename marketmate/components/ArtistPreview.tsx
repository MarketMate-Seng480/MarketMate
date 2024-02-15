'use client'
import React, { useState } from 'react';
import { Button, ButtonGroup, Stack, HStack, VStack, Box, Link, Text, Image } from '@chakra-ui/react'

interface ArtistPreviewProps {
    shopLogo: string;
    images: string[];
}

const ArtistPreview: React.FC<ArtistPreviewProps> = ({ shopLogo, images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div>
            <Box p={4} display={{ md: "flex" }}>
            <Box flexShrink={0}>
                <Image
                    borderRadius="lg"
                    width={{ md: 40 }}
                    src={shopLogo}
                    alt="Shop Logo"
                />
            </Box>
            <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                <Link
                mt={1}
                display="block"
                fontSize="lg"
                lineHeight="normal"
                fontWeight="semibold"
                href="#"
                >
                Finding customers for your new business
                </Link>
                <div>
                        {images.length > 3 && 
                        <HStack>
                            {currentImageIndex > 0 && <Button colorScheme='teal' variant='solid' onClick={handlePrev}>Previous</Button>}
                            <img src={images[currentImageIndex]} alt="Carousel Image" />
                            <img src={images[currentImageIndex + 1]} alt="Carousel Image" />
                            <img src={images[currentImageIndex + 2]} alt="Carousel Image" />
                            {currentImageIndex < (images.length - 3) && <Button colorScheme='teal' variant='solid' onClick={handleNext}>Next</Button>}
                        </HStack>   
                        }

                        {images.length <=3 && 
                        <HStack>
                            <img src={images[currentImageIndex]} alt="Carousel Image" />
                            <img src={images[currentImageIndex + 1]} alt="Carousel Image" />
                            <img src={images[currentImageIndex + 2]} alt="Carousel Image" />
                        </HStack>
                        }
                </div>
                <Text mt={2} color="gray.500">
                Getting a new business off the ground is a lot of hard work. Here are five
                ideas you can use to find your first customers.
                </Text>
            </Box>
        </Box>
        </div>
    );
};



export default ArtistPreview;