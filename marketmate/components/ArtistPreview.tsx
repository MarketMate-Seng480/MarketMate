'use client'
import React, { useState } from 'react';
import { Button, ButtonGroup, Stack, HStack, VStack } from '@chakra-ui/react'

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
            <img src={shopLogo} alt="Shop Logo" />
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
            <Button colorScheme='blue'>Button</Button>
        </div>
    );
};



export default ArtistPreview;