"use client";

import { Flex, Stack, Center, Container } from "@chakra-ui/react";
import Image from "next/image";
import LoginImage from "../../public/login.jpg";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <Stack
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
    >
      <Flex
        flex={1}
        minH="100vh"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Container maxW="2xl">
          <Center>
            <LoginForm />
          </Center>
        </Container>
      </Flex>
      <Flex
        flex={1}
        maxH="100vh"
      >
        <Image
          src={LoginImage}
          alt="Hero image with ceramic mugs"
          style={{
            objectFit: "cover",
          }}
        />
      </Flex>
    </Stack>
  );
}
