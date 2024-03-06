"use client";

import React from "react";
import Slider from "react-slick";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Button,
  Text,
  Center,
  Image,
  VStack,
  Heading,
  Stack,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  responsive: [
    {
      breakpoint: 1024, // Everything below this screen size, show 1 slide
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

function Card() {
  return (
    <Center>
      <Box
        maxW={"520px"}
        w={"400px"}
        boxShadow={"lg"}
        rounded={"md"}
        overflow={"hidden"}
        mb={10}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={
            "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          objectFit="cover"
          alt="#"
        />
        <Flex
          justify={"center"}
          mt={-12}
        >
          <Avatar
            size={"xl"}
            src={
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <VStack
            spacing={4}
            align={"center"}
            mb={5}
          >
            <Heading
              fontSize={"2xl"}
              fontWeight={500}
              fontFamily={"body"}
            >
              John Doe
            </Heading>
            <Text color={"gray.500"}>Frontend Developer</Text>
          </VStack>

          <Stack
            direction={"row"}
            justify={"center"}
            spacing={6}
          >
            <Stack
              spacing={0}
              align={"center"}
            >
              <Text fontWeight={600}>23k</Text>
              <Text
                fontSize={"sm"}
                color={"gray.500"}
              >
                Followers
              </Text>
            </Stack>
            <Stack
              spacing={0}
              align={"center"}
            >
              <Text fontWeight={600}>23k</Text>
              <Text
                fontSize={"sm"}
                color={"gray.500"}
              >
                Followers
              </Text>
            </Stack>
          </Stack>

          <Button
            w={"full"}
            mt={8}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            Follow
          </Button>
        </Box>
      </Box>
    </Center>
  );
}

export default function VendorCarousel() {
  const [slider, setSlider] = React.useState<Slider | null>(null);

  const side = useBreakpointValue({ base: "30%", md: "10px", lg: "-60px" });
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
      >
        <FiChevronRight />
      </IconButton>

      {/* Slider */}
      <Slider
        {...settings}
        ref={(slider) => setSlider(slider)}
      >
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Slider>
    </Box>
  );
}
