"use client";

import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  HStack,
  Box,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Link from "next/link";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Stack
      spacing={15}
      w={"full"}
      maxW={"lg"}
      p={6}
    >
      <Heading fontSize={{ base: "2xl", md: "3xl" }}>Create an account</Heading>

      <Stack spacing={2}>
        <Text>At MarketMate, we believe in the power of community.</Text>
        <Text>
          With a single account, you can shop as a customer to support local businesses and manage
          your own shop.
        </Text>
      </Stack>

      <Stack
        spacing={5}
        my={10}
      >
        <HStack>
          <Box>
            <FormControl
              id="firstName"
              isRequired
            >
              <FormLabel>First Name</FormLabel>
              <Input type="text" />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="lastName">
              <FormLabel>Last Name</FormLabel>
              <Input type="text" />
            </FormControl>
          </Box>
        </HStack>
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
          <InputGroup>
            <Input type={showPassword ? "text" : "password"} />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
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
          Create An Account
        </Button>
      </Stack>

      <Text>Already have an account?</Text>
      <Link href="/login">
        <Text
          color={"blue.400"}
          as="b"
        >
          Log In
        </Text>
      </Link>
    </Stack>
  );
}
