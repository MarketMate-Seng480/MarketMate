import { useState } from "react";
import PublicTopBanner from "./PublicTopBanner";
import { Box, VStack, Badge, HStack, SimpleGrid, Text, Link, Spacer } from "@chakra-ui/react";
import { Vendor_Extended } from "@/app/lib/types";
import { CustomHeading } from "../CustomHeading";
import ProductCard from "../ProductCard";
import { CustomButton } from "../CustomButton";

export default function PublicStoreFrontPage(vendor: Vendor_Extended) {
  let products = vendor.products;
  let maxPerLoad = 6;
  let [currentProducts, setCurrentProducts] = useState(products.slice(0, maxPerLoad));

  const ProductSection = () => {
    if (products.length === 0) {
      return (
        <Text size={"md"}>This shop has not set up any products. Please check back later!</Text>
      );
    }

    return (
      <>
        <SimpleGrid
          columns={[1, 2, 3]}
          spacing={10}
          w={"full"}
          py={10}
        >
          {vendor.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </SimpleGrid>

        {currentProducts.length < products.length && (
          <CustomButton
            variant="secondary"
            onClick={() =>
              setCurrentProducts(products.slice(0, currentProducts.length + maxPerLoad))
            }
          >
            Load more products
          </CustomButton>
        )}
      </>
    );
  };

  return (
    <VStack
      w={"100%"}
      alignContent={"center"}
      spacing={10}
    >
      <PublicTopBanner
        shopName={vendor.name}
        logo={vendor.logo}
        banner={vendor.banner}
      />

      <VStack
        w={"full"}
        spacing={4}
      >
        <CustomHeading size="lg">{vendor.name}</CustomHeading>

        <HStack
          spacing={2}
          w={"full"}
          wrap={"wrap"}
          textAlign={"center"}
          justifyContent={"center"}
        >
          {vendor.shopTags.map((tag) => (
            <Badge
              variant="outline"
              key={tag.id}
              color={"gray.400"}
            >
              {tag.name}
            </Badge>
          ))}
        </HStack>
      </VStack>

      <VStack>
        <CustomHeading size="md">Contact</CustomHeading>
        <Box
          w={"full"}
          textAlign={"center"}
        >
          <Text size={"md"}>
            Email:{" "}
            <Link
              href={"mailto:" + vendor.email}
              isExternal
              color={"text.emphasis"}
              fontWeight={"bold"}
            >
              {vendor.email}
            </Link>
          </Text>
        </Box>
      </VStack>

      {vendor.description && (
        <VStack>
          <CustomHeading size="md">About Us</CustomHeading>
          <Box
            w={"full"}
            textAlign={"center"}
          >
            <Text size={"md"}>{vendor.description}</Text>
          </Box>
        </VStack>
      )}

      <VStack>
        <CustomHeading size="md">Products</CustomHeading>
        <ProductSection />
        <Spacer />
      </VStack>
    </VStack>
  );
}
