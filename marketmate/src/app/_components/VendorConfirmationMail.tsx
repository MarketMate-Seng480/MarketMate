import { Box, Button, Center, Image, Link, Text } from "@chakra-ui/react";
import React from "react";

interface VendorEmailProps {
  vendorName: string;
  buyerName: string;
  buyerEmail: string;
  productLists: string[];
}

const VendorEmailTemplate: React.FC<VendorEmailProps> = ({
  vendorName,
  buyerName,
  buyerEmail,
  productLists,
}) => {
  return (
    <Box
      bg="white"
      w="100%"
      p={4}
      borderRadius="md"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
      border="1px solid rgba(0, 0, 0, 0.1)"
    >
      <Center>
        <Image
          src="./ArtiswayLogo.png" // Add the actual URL or local path for the vendor's logo
          alt={`${vendorName} Logo`}
          w="100px"
        />
      </Center>
      <Text
        fontSize="xl"
        fontWeight="bold"
        mt={4}
      >
        Hello {vendorName}!
      </Text>
      <Text
        fontSize="lg"
        mt={4}
      >
        Exciting news! {buyerName} is interested in your product{productLists.length > 1 ? "s" : ""}
        :
      </Text>
      <ul>
        {productLists.map((product, index) => (
          <li key={index}>{product}</li>
        ))}
      </ul>
      <Text
        fontSize="lg"
        mt={4}
      >
        {buyerName} can&apos;t wait to hear from you. Contact them at {buyerEmail}.
      </Text>
      <Link
        href={`mailto:${buyerEmail}`}
        isExternal
      >
        <Button
          mt={4}
          colorScheme="teal"
        >
          Contact {buyerName}
        </Button>
      </Link>
    </Box>
  );
};

export default VendorEmailTemplate;
