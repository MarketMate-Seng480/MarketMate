"use client";
import React from "react";
import { Box, AbsoluteCenter, Heading, Text, Stack } from "@chakra-ui/react";
import { CustomButton } from "./CustomButton";
import { useRouter } from "next/navigation";

export default function ConstructionPage({
  pageName,
  explanation,
}: {
  pageName: string;
  explanation: string;
}) {
  const router = useRouter();

  return (
    <AbsoluteCenter>
      <Box
        width={"full"}
        height={"full"}
        textAlign={"center"}
      >
        <Heading
          fontSize={"4xl"}
          fontWeight={500}
          fontFamily={"body"}
          mb={50}
        >
          {pageName} is under construction!
        </Heading>

        <Stack
          spacing={15}
          mb={50}
        >
          <Text fontSize={"xl"}>We&apos;re working hard on it 👷👷‍♀️. Please check back later!</Text>
          <Text fontSize={"xl"}>{explanation}</Text>
        </Stack>

        <CustomButton onClick={() => router.push("/")}>
          <Text as={"b"}>Return Home</Text>
        </CustomButton>
      </Box>
    </AbsoluteCenter>
  );
}
