import { Box, Flex, Heading, Avatar, useColorModeValue } from "@chakra-ui/react";

export default function TopBanner({ name, logo }: { name: string; logo: string }) {
  return (
    <Box
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      rounded={"md"}
      overflow={"hidden"}
    >
      {/* Background Image with Vendor Shop Name */}
      <Box
        backgroundColor={"#EFEDEE"}
        h={"200px"}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
      >
        <Heading
          as="h1"
          size="2xl"
          color={"black"}
        >
          {name}
        </Heading>
      </Box>

      {/* Vendor Logo */}
      <Flex
        justify={"start"}
        mt={-20}
        ml={10}
      >
        <Avatar
          size={"2xl"}
          src={logo}
          name={name}
          bg={"white"}
          css={{
            border: "2px solid white",
          }}
        />
      </Flex>
    </Box>
  );
}
