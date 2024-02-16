import { Box, Heading, Center } from "@chakra-ui/react";
import { PageContainer } from "../components/PageContainer";

export default function Shop() {
  return (
    <PageContainer>
      <Box>
        <Center>
          <Heading
            as="h1"
            size="xl"
          >
            A Vendors shop
          </Heading>
        </Center>
      </Box>
    </PageContainer>
  );
}