import { Box, Flex, Avatar, useColorModeValue, Image } from "@chakra-ui/react";

export default function TopBanner({ name, logo, banner }: { name: string; logo: string, banner: string }) {
  return (
    <Box
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      rounded={"md"}
      overflow={"hidden"}
    >
      {/* Background Image with Vendor Shop Name */}
        <Image
          alt='banner' 
          src={banner} 
          h={"200px"} 
          w='full' 
          objectFit='cover'
        />

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
