'use client'
import React, { useState } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react'

interface ArtistPreviewProps {
    images: string[];
}

const ArtistPreview: React.FC<ArtistPreviewProps> = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div>

            <div>
                
                {/* <Button colorScheme='teal' variant='solid' onClick={handlePrev}>Previous</Button> */}
                <button onClick={handlePrev}>Previous</button>
                <img src={images[currentImageIndex]} alt="Carousel Image" />
                <button onClick={handleNext}>Next</button>
            </div>
            {/* <Button colorScheme='blue'>Button</Button> */}
        </div>
    );
};



export default ArtistPreview;