"use client";
import { useState } from "react";
import { Box, VStack, Image, HStack, Text, useTheme} from "@chakra-ui/react";
import PageContainer from "@components/PageContainer";
import { usePathname } from "next/navigation";
import type { Product, Vendor } from "@prisma/client";
import { NavLink } from "@/app/_components/navigation/CustomLinks";
import { CustomButton } from "@/app/_components/CustomButton";


export default function ProductPage() {
  const colors = useTheme().colors;
  const path = usePathname();
  const slug = path.split("/").pop();
  const fetchURL = `/api/products/${slug}`;
  const [product, setProduct] = useState<Product | null>(null);
  const [vendor, setVendor] = useState<Vendor | null>(null);

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


  fetchProduct();
  fetchVendor();

  return (
    <PageContainer>
        {product ? 
          <HStack 
            paddingLeft={200}
            paddingTop={20}
            alignItems={'start'}
            justifyContent={'start'}
            gap={10}
            h={'full'}
          >
            <Box boxSize="600px">
              <Image boxSize="600px" src={product.featureImage} alt={product.name} rounded={'md'}/>
            </Box>
            <Box maxW="600px">

            <VStack align='start' paddingTop={10}>
                <Text fontSize="xx-large" fontWeight={700} color={colors.text.body}>{product.name}</Text>
                <NavLink variant="emphasis" fontSize="large">{vendor?.name}</NavLink>
                <Text fontSize="x-large" color={colors.text.caption}>${product.price}</Text>
                <Text fontSize="20" color={colors.text.body}>{product.description}</Text>
                <Box paddingTop={80}>
                  <CustomButton alignSelf={'end'}>Add to Cart</CustomButton>
                </Box>
            </VStack>
            </Box>
          </HStack>
      : <Box></Box>}
    </PageContainer>
  );
}
