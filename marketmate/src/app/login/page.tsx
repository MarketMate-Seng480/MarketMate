"use client";
import React from "react";
import { Button, Link, Box, Flex, Img, Center, Heading } from "@chakra-ui/react";
import { useAuth } from "../authContext";

// Switches user state to isVendor (logged in state)
const Login: React.FC = () => {
  const { login } = useAuth();
  return (
    <Flex>
      <Box>
        <Img
          src="https://via.placeholder.com/150"
          alt="logo"
        />
      </Box>
      <Box>
        <Center>
          <Heading
            as="h3"
            size="lg"
          >
            Login
          </Heading>
        </Center>
      </Box>
    </Flex>
  );
};

export default Login;

// <Box display='flex' flexDirection='column' gap='1rem'>
//       Login page
//       <Button onClick={login} width='fit-content'>
//         <Link href='/vendor'>Proceed as vendor</Link>
//       </Button>
//     </Box>
