import { Flex, Spinner, Text } from "@chakra-ui/react";

const LoadingPage = () => {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      minH="100vh"
      bg="beige.400"
    >
      <Spinner
        size="xl"
        color="brand.primary"
      />
      <Text
        mt={4}
        fontSize="lg"
        fontWeight="bold"
      >
        Loading...
      </Text>
    </Flex>
  );
};

export default LoadingPage;
