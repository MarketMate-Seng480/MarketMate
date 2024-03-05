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
import { ViewIcon, ViewOffIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

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
  const [authError, setAuthError] = useState("");

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

  const handleSignUp = async () => {
    if (validateForm()) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
          data: {
            name: `${firstName} ${lastName}`,
          },
        },
      });
      if (error) {
        setAuthError(error.message);
      } else {
        // Add user to the database
        const user = {
          id: data?.user?.id,
          email: email,
          first_name: firstName,
          last_name: lastName,
        };

        const res = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        router.push("/vendor");
      }
    }
  };

  return (
    <Stack
      spacing={15}
      w={"full"}
      maxW={"lg"}
      p={6}
    >
      <Link href="/">
        <ChevronLeftIcon
          boxSize={6}
          color={"grey.400"}
        />
        Return to Homepage
      </Link>

      <Heading
        as={"h1"}
        fontSize={{ base: "2xl", md: "3xl" }}
        mt={5}
      >
        Create An Account
      </Heading>

      <Stack spacing={2}>
        <Text>At MarketMate, we believe in the power of community.</Text>
        <Text>
          With a single account, you can buy from local artisans or create and manage your own shop.
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

      <Text color="red.500">{authError}</Text>

      <Button
        bg={"#D1C7BD"}
        _hover={{ bg: "#C4BEB5" }}
        onClick={handleSignUp}
        mb={5}
      >
        Create An Account
      </Button>

      <Text>Already have an account?</Text>

      <Link href="/login">
        <Text
          color={"black"}
          as="b"
          style={{ textDecoration: "underline" }}
        >
          Log In
        </Text>
      </Link>
    </Stack>
  );
}
