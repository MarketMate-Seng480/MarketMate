"use client";

import { Button, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function LoginForm() {
  return (
    <Stack
      spacing={15}
      w={"full"}
      maxW={"lg"}
      p={6}
    >
      <Heading fontSize={{ base: "2xl", md: "3xl" }}>Welcome Back to MarketMate</Heading>

      <Stack
        spacing={5}
        my={10}
      >
        <FormControl
          id="email"
          isRequired
        >
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>

        <FormControl
          id="password"
          isRequired
        >
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
      </Stack>

      <Stack spacing={10}>
        <Button
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
        >
          Log In
        </Button>
      </Stack>

      <Text>Don&apos;t have an account?</Text>
      <Link href="/signup">
        <Text
          color={"blue.400"}
          as="b"
        >
          Sign Up Now
        </Text>
      </Link>
    </Stack>
  );
}
