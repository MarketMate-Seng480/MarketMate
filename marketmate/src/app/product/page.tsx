"use client";
import React, { useState, useEffect } from "react";
import { Center, Spacer, VStack, Flex, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import PageContainer from "@components/PageContainer";
import Footer from "@components/Footer";
import ProductCard from "@components/ProductCard"; // Your product card component
import { Product } from "@prisma/client"; // Using Product type directly from Prisma
import { CustomButton } from "../_components/CustomButton";

async function fetchProducts(skip: number, take: number) {
  const response = await fetch(`/api/products?take=${take}&skip=${skip}`);
  const data = await response.json();
  return data.data;
}

export default function AllProductsPage() {
  const maxPerLoad = 3;
  const [totalNumberOfProducts, setTotalNumberOfProducts] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]); // Using Prisma's Product type
  const [productCards, setProductCards] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        const response = await fetchProducts(0, maxPerLoad);
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    async function fetchTotalProducts() {
      try {
        const response = await fetch("/api/products?total=true");
        const data = await response.json();
        setTotalNumberOfProducts(data.data);
      } catch (error) {
        console.error("Error fetching total products:", error);
      }
    }

    fetchInitialProducts();
    fetchTotalProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const cards = products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ));
      setProductCards(cards);
    }
  }, [products]);

  async function loadMoreProducts() {
    try {
      const newProducts = await fetchProducts(products.length, maxPerLoad);
      setProducts([...products, ...newProducts]);
    } catch (error) {
      console.error("Error fetching more products:", error);
    }
  }

  return (
    <PageContainer>
      <Center flexDirection={"column"}>
        <VStack spacing={{ base: 8, md: 16 }} w="full">
          <Flex w="full" alignContent={"center"} justifyContent={"center"} direction={"column"}>
            <VStack spacing={8} my={{ base: 4, md: 15 }} alignItems={"center"}>
              <VStack spacing={2}>
                <Heading as="h3" fontSize={{ base: "2xl", md: "4xl" }} color={"text.heading"}>
                  All Products
                </Heading>
                <Text fontSize={{ base: "sm", md: "lg" }} color={"text.caption"} fontWeight={600}>
                  Explore our wide range of products
                </Text>
              </VStack>
            </VStack>

            <Center flexDirection={"column"}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} p={{ base: 4, md: 10 }} maxW={"1400px"}>
                {productCards}
              </SimpleGrid>

              {/* {products.length < totalNumberOfProducts && (
                <CustomButton onClick={loadMoreProducts} variant="secondary" size="lg" mt={10}>
                  Load more products
                </CustomButton>
              )} */}
              {true && (
  <CustomButton onClick={loadMoreProducts}>Load more products</CustomButton>
)}
            </Center>
          </Flex>
          
          <Spacer />
          <Footer />
        </VStack>
      </Center>
    </PageContainer>
  );
}
