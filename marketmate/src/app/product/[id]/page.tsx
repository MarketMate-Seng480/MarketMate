"use client";
import { useState } from "react";
import { Box, VStack, Image, HStack, Text, Center, Flex, Badge, Link, Button } from "@chakra-ui/react";
import PageContainer from "@components/PageContainer";
import { usePathname } from "next/navigation";
import type { Product, Vendor } from "@prisma/client";


export default function ProductPage() {
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
        <Center>

          <HStack 
            padding={10}
            spacing={6}
            
          >
            <Box boxSize="600px">
              <Image boxSize="600px" src={product.featureImage} alt={product.name} />
            </Box>
            <Box maxW="600px">

              <VStack align="flex-start" spacing={4}>
                <Text fontSize={32} >{product.name}</Text> 
                <Link  fontSize={20} >{vendor?.name}</Link>
                <Badge borderRadius='sm' px='2' fontSize={20} color={'#577D90'} >
                ${product.price}
                </Badge>
                <Text fontSize={20} ></Text> 
                <Text fontSize={20} >{product.description}</Text> 
                <Button color={'#577D90'} size="md" >
                  Add to Cart
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Center>
      
      : <Box></Box>}
    </PageContainer>
  );
}
