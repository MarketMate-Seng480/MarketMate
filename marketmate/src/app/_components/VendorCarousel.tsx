"use client";

import React, { useEffect } from "react";
import Slider from "react-slick";
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VendorCard from "./VendorCard";
import { Vendor_Extended } from "@lib/types";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 3000,
  swipeToSlide: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 1024, // Everything below this screen size, show 1 slide
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export default function VendorCarousel() {
  const [vendors, setVendors] = React.useState<Vendor_Extended[]>([]);
  const [slider, setSlider] = React.useState<Slider | null>(null);

  const side = useBreakpointValue({ base: "30%", md: "10px", lg: "-60px" });

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("/api/vendors");
        const data = await response.json();
        setVendors(data.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };
    fetchVendors();
  }, []);

  const vendorCards = vendors.map((vendor) => (
    <VendorCard
      key={vendor.id}
      vendor={vendor}
    />
  ));

  return (
    <Box
      position={"relative"}
      height={"500px"}
      width={{ base: "100%", md: "90%" }}
      maxW={"1400px"}
    >
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        borderRadius="full"
        position="absolute"
        left={side}
        top="40%"
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
        display={{ base: "none", md: "flex" }}
        color={"gray.100"}
        bgColor={"gray.500"}
      >
        <FiChevronLeft />
      </IconButton>

      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        borderRadius="full"
        position="absolute"
        right={side}
        top="40%"
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
        display={{ base: "none", md: "flex" }}
        color={"gray.100"}
        bgColor={"gray.500"}
      >
        <FiChevronRight />
      </IconButton>

      {/* Slider */}
      <Slider
        {...settings}
        ref={(slider) => setSlider(slider)}
      >
        {vendorCards}
      </Slider>
    </Box>
  );
}
