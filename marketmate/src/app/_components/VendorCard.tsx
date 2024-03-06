import React from "react";
import {
  Box,
  Center,
  Image,
  Avatar,
  VStack,
  Heading,
  Text,
  Stack,
  Button,
  Flex,
} from "@chakra-ui/react";
import type { Vendor } from "@prisma/client";

export default function VendorCard({ vendor }: { vendor: Vendor }) {
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
          src={vendor.logo}
          objectFit="cover"
          alt="#"
        />
        <Flex
          justify={"center"}
          mt={-12}
        >
          <Avatar
            size={"xl"}
            src={vendor.logo}
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
              {vendor.name}
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
