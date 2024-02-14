"use client";

import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
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
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };

    // Validate first name
    if (!firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    // Validate last name
    if (!lastName) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    // Validate email
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (validateForm()) {
      router.push("/vendor");
    }
  };

  return (
    <Stack
      spacing={15}
      w={"full"}
      maxW={"lg"}
      p={6}
    >
      <Heading fontSize={{ base: "2xl", md: "3xl" }}>Create An Account</Heading>

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
              isInvalid={!!errors.firstName}
            >
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <FormErrorMessage>{errors.firstName}</FormErrorMessage>
            </FormControl>
          </Box>
          <Box>
            <FormControl
              id="lastName"
              isRequired
              isInvalid={!!errors.lastName}
            >
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
              <FormErrorMessage>{errors.lastName}</FormErrorMessage>
            </FormControl>
          </Box>
        </HStack>
        <FormControl
          id="email"
          isRequired
          isInvalid={!!errors.email}
        >
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl
          id="password"
          isRequired
          isInvalid={!!errors.password}
        >
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>
      </Stack>

      <Stack spacing={10}>
        <Button
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
          onClick={handleSubmit}
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
