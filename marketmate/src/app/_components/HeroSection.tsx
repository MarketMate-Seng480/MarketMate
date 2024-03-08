import { Flex, Heading } from "@chakra-ui/react";
import '@fontsource/averia-serif-libre';

export default function HeroSection() {
  return (
    <Flex
      w="100%"
      h={{
        base: "40vh",
        lg: "50vh",
      }}
      bgGradient="linear(to-r, #CA7A6C, #575F90)"
      color="white"
      alignItems="center"
      justifyContent="center"
    >
      <Heading
        size={{ base: "md", md: "lg" }}
        px={20}
        textAlign={"center"}
        fontFamily={'Averia Serif Libre'}
      >
        Connecting local art makers to local art buyers
      </Heading>
    </Flex>
  );
}
