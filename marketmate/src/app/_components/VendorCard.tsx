import React from "react";
import {
  Box,
  Center,
  Image,
  Avatar,
  VStack,
  Heading,
  Text,
  Flex,
  Spacer,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { CustomButton } from "./CustomButton";
import { CustomCard } from "./CustomCard";
import { useRouter } from "next/navigation";
import { Vendor_Extended } from "@lib/types";
import { brandTheme } from "../providers";

export default function VendorCard({ vendor }: { vendor: Vendor_Extended }) {
  const router = useRouter();

  return (
    <Center
      display={"flex"}
      key={vendor.id} // Add key prop here
      mx={2}
    >
      <CustomCard
        width={"400px"}
        height={"512px"}
      >
        <Image
          h={"150px"}
          w={"full"}
          src={vendor.banner}
          objectFit="cover"
          alt={vendor.name + " logo"}
          borderRadius={4}
          fallback={
            <Box
              background={brandTheme.colors.text.caption}
              w={"full"}
              h={"320px"}
              borderRadius={4}
            />
          }
        />
        <Flex
          justify={"center"}
          mt={-55}
        >
          <Avatar
            size={"xl"}
            src={vendor.logo}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box
          px={6}
          pb={6}
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
        >
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

            <HStack
              spacing={2}
              w={"full"}
              wrap={"wrap"}
              textAlign={"center"}
              justifyContent={"center"}
            >
              {vendor.shopTags.map((tag) => (
                <Badge
                  variant="outline"
                  key={tag.id}
                  color={"gray.400"}
                  size={"xs"}
                >
                  {tag.name}
                </Badge>
              ))}
            </HStack>

            <Text
              color={"gray.700"}
              noOfLines={vendor.shopTags.length > 0 ? 3 : 4}
            >
              {vendor.description}
            </Text>
          </VStack>

          <Spacer />

          <CustomButton
            w={"100%"}
            onClick={() => router.push(`/shop/${vendor.id}`)}
          >
            View Shop
          </CustomButton>
        </Box>
      </CustomCard>
    </Center>
  );
}
