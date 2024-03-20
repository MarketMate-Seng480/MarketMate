import { Box, Flex, Avatar, useColorModeValue, Image } from "@chakra-ui/react";

/// TopBanner component for vendor profile page, including the banner and logo
export default function TopBanner({
  shopName,
  logo,
  banner,
}: {
  shopName: string;
  logo: string;
  banner: string;
}) {
  return (
    <Box
      w={"full"}
      h={"300px"}
      bg={useColorModeValue("white", "gray.800")}
    >
      {/* Background Image with Vendor Shop Name */}
      <Box
        backgroundColor={"gray.600"}
        h={"200px"}
        rounded={"10px"}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
      >
        <Image
          src={banner}
          alt={shopName}
        />
      </Box>

      {/* Vendor Logo */}
      <Flex
        justify={"center"}
        mt={-20}
        ml={10}
      >
        <Avatar
          w={"200px"}
          h={"200px"}
          src={logo}
          name={shopName}
          bg={"white"}
          css={{
            border: "4px solid white",
          }}
        />
      </Flex>
    </Box>
  );
}
