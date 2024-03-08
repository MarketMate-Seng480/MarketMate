import React from "react";
import { Box, Center, Image, Avatar, VStack, Heading, Text, Flex, Spacer } from "@chakra-ui/react";
import type { Vendor } from "@prisma/client";
import { CustomButton } from "./CustomButton";
import { CustomCard } from "./CustomCard";
import { useRouter } from "next/navigation";

export default function VendorCard({ vendor }: { vendor: Vendor }) {
  const router = useRouter();

  return (
    <Center display={"flex"}>
      <CustomCard
        width={"400px"}
        height={"500px"}
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
            <Text
              color={"gray.700"}
              noOfLines={3}
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
