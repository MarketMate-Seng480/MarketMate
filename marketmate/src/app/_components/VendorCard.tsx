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
} from "@chakra-ui/react";
import { CustomButton } from "./CustomButton";
import { CustomCard } from "./CustomCard";
import { useRouter } from "next/navigation";
import { Vendor_Extended } from "@lib/types";

export default function VendorCard({ vendor }: { vendor: Vendor_Extended }) {
  const router = useRouter();

  return (
    <Center display={"flex"}>
      <CustomCard
        width={"400px"}
        height={"512px"}
      >
        <Image
          h={"124px"}
          w={"full"}
          src={vendor.logo}
          objectFit="cover"
          alt={vendor.name + " logo"}
          borderRadius={4}
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

        <Box
          p={6}
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

            <HStack>
              {vendor.shopTags.map((tag) => (
                <>
                  <Text
                    color={"gray.400"}
                    size={"sm"}
                  >
                    {tag.name}
                  </Text>
                  {vendor.shopTags.indexOf(tag) !== vendor.shopTags.length - 1 && (
                    <Text
                      color={"gray.400"}
                      size={"sm"}
                    >
                      •
                    </Text>
                  )}
                </>
              ))}
            </HStack>

            <Text
              color={"gray.700"}
              noOfLines={5}
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
