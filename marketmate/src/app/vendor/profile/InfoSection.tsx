import {
  Stack,
  Heading,
  Text,
  InputGroup,
  Input,
  InputLeftAddon,
  Badge,
  Spacer,
} from "@chakra-ui/react";
import { Vendor } from "@/app/types";

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
        <Text>Insert the Upcoming Event components here</Text>
      </Stack>

      {/* Featured Products */}
      <Stack spacing={4}>
        <Heading size="md">Featured Products</Heading>
        <Text>Coming soon...</Text>
      </Stack>

      <Spacer />
    </Stack>
  );
}
