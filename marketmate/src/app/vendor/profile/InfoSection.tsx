import {
  Stack,
  Heading,
  Text,
  InputGroup,
  Input,
  InputLeftAddon,
  Badge,
  Spacer,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { Vendor } from "@/app/types";
import { sampleMarkets } from "@/app/sampleData/sampleMarkets";
import { UpcomingEvents } from "@/app/components/UpcomingEvents";
import ProductCard from "../products/ProductCard";
import { sampleProducts } from "@/app/sampleData/sampleProducts";

const InfoComponent = (title: string, value: string) => {
  return (
    <InputGroup alignContent={"center"}>
      <InputLeftAddon w={175}>{title}</InputLeftAddon>
      <Input
        isReadOnly
        value={value}
      />
    </InputGroup>
  );
};

export default function InfoSection(vendor: Vendor) {
  return (
    <Stack
      direction={"column"}
      mt={10}
      spacing={8}
    >
      {/* About Us */}
      <Stack spacing={4}>
        <Heading size="md">About Us</Heading>
        <Text>{vendor.description}</Text>
      </Stack>

      {/* Store Tags */}
      <Stack spacing={4}>
        <Heading size="md">Store Tags</Heading>
        <Stack
          direction={"row"}
          spacing={4}
        >
          {vendor.shopTags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
            >
              {tag}
            </Badge>
          ))}
        </Stack>
      </Stack>

      {/* Store Info */}
      <Stack spacing={4}>
        <Heading size="md">Store Info</Heading>
        <Stack spacing={2}>
          {InfoComponent("Phone Number", vendor.phone)}
          {InfoComponent("Email Address", vendor.email)}
          {InfoComponent("Address", vendor.address || "N/A")}
        </Stack>
      </Stack>

      {/* Upcoming Market Events */}
      <Stack spacing={4}>
        <Heading size="md">Upcoming Market Events</Heading>
        <UpcomingEvents events={sampleMarkets} />
      </Stack>

      {/* Featured Products */}
      <Stack spacing={4}>
        <Heading size="md">Featured Products</Heading>
        <Box mt="30px">
          <SimpleGrid
            minChildWidth="300px"
            spacing={1}
          >
            {sampleProducts.map((product, index) => (
              <Box
                key={product.image}
                my={5}
                mr={10}
                minW={300}
              >
                <ProductCard
                  initialProductInfo={product}
                  setProductInfo={() => {}}
                />
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Stack>

      <Spacer />
    </Stack>
  );
}
