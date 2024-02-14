import React from "react";
import { Box, Heading, Img, Center } from "@chakra-ui/react";
import { AuthProvider, useAuth } from "./authContext";
import { ChakraProvider } from "@chakra-ui/react";

const Home: React.FC = () => {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Box>
          <Center>
            <Heading
              as="h1"
              size="xl"
            >
              Welcome to MarketMate
            </Heading>
          </Center>
          <Center>
            <Img
              src="https://via.placeholder.com/150"
              alt="logo"
            />
          </Center>
        </Box>
        <Box>
          <Center>
            <Heading
              as="h3"
              size="lg"
            >
              {/* {isVendor ? "Vendor" : "Customer"} Dashboard */}
            </Heading>
          </Center>
        </Box>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default Home;
