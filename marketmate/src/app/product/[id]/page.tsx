"use client";
import { useEffect, useState } from "react";
import { Box, VStack, Image, HStack, Text, useTheme, SimpleGrid } from "@chakra-ui/react";
import PageContainer from "@components/PageContainer";
import { usePathname } from "next/navigation";
import type { Product, Vendor } from "@prisma/client";
import { NavLink } from "@components/navigation/CustomLinks";
import { CustomButton } from "@components/CustomButton";
import LoadingPage from "@components/Loading";

export default function ProductPage() {
  const colors = useTheme().colors;
  const path = usePathname();
  const slug = path.split("/").pop();
  const fetchURL = `/api/products/${slug}`;
  const [product, setProduct] = useState<Product | null>(null);
  const [vendor, setVendor] = useState<Vendor | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(fetchURL);
        const data = await response.json();
        console.log("data", data);
        setProduct(data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [fetchURL]);

  useEffect(() => {
    const fetchVendor = async () => {
      const fetchURL = `/api/vendors/${product?.vendorId}`;
      try {
        const response = await fetch(fetchURL);
        const data = await response.json();
        console.log("data", data);
        setVendor(data.data);
      } catch (error) {
        console.error("Error fetching vendor:", error);
      }
    };

    if (product) {
      fetchVendor();
    }
  }, [product]);

  return (
    <PageContainer>
      {product ? (
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={10}
          p={{ base: 5, md: 10, lg: 20 }}
          pb={{ base: 20, lg: 40 }}
        >
          <Image
            src={product.featureImage}
            alt={product.name}
            rounded={"md"}
          />
          <VStack
            align="start"
            spacing={5}
          >
            <Text
              fontSize="xx-large"
              fontWeight={700}
              color={colors.text.body}
            >
              {product.name}
            </Text>
            <NavLink
              variant="emphasis"
              fontSize="large"
              href={`/shop/${vendor?.id}`}
            >
              {vendor?.name}
            </NavLink>
            <Text
              fontSize="x-large"
              color={colors.text.caption}
            >
              ${product.price}
            </Text>
            <Text
              fontSize="20"
              color={colors.text.body}
            >
              {product.description}
            </Text>
            <CustomButton alignSelf={"start"}>Add to Cart</CustomButton>
          </VStack>
        </SimpleGrid>
      ) : (
        <LoadingPage />
      )}
    </PageContainer>
  );
}
