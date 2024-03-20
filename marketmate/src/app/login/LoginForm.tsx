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
import { supabase } from "../lib/supabase";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");

  const validateForm = () => {
    let isValid = true;

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    }

    // Validate password is not empty
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });  
      // If there is an error, set the error message and clear the password
      if (error) {
        setPassword("");
        setPasswordError("");
        setAuthError(error.message);
      } else {
        console.log("Login successful", data);
        // Fetch user data after successful login to get the user role
        if (data) {
          const fetchUserData = async () => {
            try {
              const res = await fetch(`/api/users/${data.user.id}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const userData = (await res.json()).data;
              // Redirect to storefront admin for vendor role
              if (userData.role === "vendor") {
                router.push(`/vendor/storefront/${userData.vendorId}`);
              } else {
                router.push("/"); // Redirect to home for buyer role
              }
            } catch (err) {
              console.error("Error fetching user data:", err);
              // Handle error (e.g., show notification to the user)
              router.push("/"); // Fallback redirect
            }
          };
          fetchUserData();
        }
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
        Welcome Back to Artisway
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

      <Text color="red.500">{authError}</Text>

      <Button
        bg={"#D1C7BD"}
        _hover={{ bg: "#C4BEB5" }}
        onClick={handleLogin}
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
