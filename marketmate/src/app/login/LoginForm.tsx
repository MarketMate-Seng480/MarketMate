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
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../authContext";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      login();
      //router.push("/"); // redirect to the home page
    }
  };

  return (
    <Stack
      spacing={15}
      w={"full"}
      maxW={"lg"}
      p={6}
    >
      <Link
        href="/"
        color="grey"
      >
        <ChevronLeftIcon
          boxSize={6}
          color={"grey.400"}
        />
        Return to Homepage
      </Link>

      <Heading
        as={"h1"}
        fontSize={{ base: "3xl", md: "4xl" }}
        mt={5}
      >
        Welcome Back to MarketMate
      </Heading>

      <Stack
        spacing={5}
        my={10}
      >
        <FormControl
          id="email"
          isRequired
          isInvalid={!!emailError}
        >
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormErrorMessage>{emailError}</FormErrorMessage>
        </FormControl>

        <FormControl
          id="password"
          isRequired
          isInvalid={!!passwordError}
        >
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormErrorMessage>{passwordError}</FormErrorMessage>
        </FormControl>
      </Stack>

      <Button
        bg={"#D1C7BD"}
        _hover={{ bg: "#C4BEB5" }}
        onClick={handleSubmit}
        mb={5}
      >
        Log In
      </Button>

      <Text>Don&apos;t have an account?</Text>

      <Link href="/signup">
        <Text
          color={"black"}
          as="b"
          style={{ textDecoration: "underline" }}
        >
          Sign Up Now
        </Text>
      </Link>
    </Stack>
  );
}
