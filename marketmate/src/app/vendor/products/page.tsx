"use client";
import { useState } from "react";
import { Button, Box, useDisclosure, SimpleGrid } from "@chakra-ui/react";
import { CgAdd } from "react-icons/cg";
import { Vendor, Product } from "@/app/types";
import ProductCard from "./ProductCard";
import ProductEditModalContainer from './ProductEditModalContainer';
import TopBanner from "../profile/TopBanner";
import { sampleVendors } from "@/app/sampleData/sampleVendors";


export default function VendorProductPage() {
  const initialVendorInfo = sampleVendors[0];
  const initialProductInfo = {
    name: "Product Name",
    description: "Product Description",
    price: 999.99,
    image: "Produce Image URL",
    vendor: initialVendorInfo,
    vendorId: initialVendorInfo.id || 0,
  };
  const [vendorInfo, setVendorInfo] = useState(initialVendorInfo);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [products, setProduct] = useState<Product[]>([
    {name: "Handmade Envelope", description: "A perfect envelope for a special someone!", price: 5, image: "https://images.unsplash.com/photo-1566125882500-87e10f726cdc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", vendor: initialVendorInfo, vendorId: 0},
    {name: "Crochet Coasters", description: "Make your home cozy with these hand crafted crochet coasters.", price: 12, image: 'https://images.unsplash.com/photo-1627667539472-75fbc7f4654d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', vendor: initialVendorInfo, vendorId: 0},
    {name: "Handmade Soap", description: "We use fresh herbs and all-natural ingredients to make these bars of soap.", price: 16, image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', vendor: initialVendorInfo, vendorId: 0},
  ]);

  const addProduct = (product: Product) => {
    setProduct([...products, product]);
  }

  const updateProduct = (index: number, product: Product) => {
    const newProds = [...products];
    newProds[index] = product; 
    setProduct(newProds);
  }

  return (
    <>
    <TopBanner
      name={vendorInfo.name}
      logo={vendorInfo.logo || ""}
    />
      <Box
        mx={10}
        mt={10}
      >
        <Button
            leftIcon={<CgAdd />}
            color={"black"}
            variant="solid"
            onClick={onOpen}
          >
            Add Product
          </Button>
          <ProductEditModalContainer
            isOpen={isOpen}
            onClose={onClose}
            initialProductInfo={initialProductInfo}
            setProductInfo={addProduct}
          />
        
        <SimpleGrid spacing={1} templateColumns="repeat(auto-fill, minmax(330px, 1fr))">
            {products.map((product, index) => (
              <Box
              key={index}
              mx={10}
              mt={10}
              >
                <ProductCard 
                  initialProductInfo={product}
                  setProductInfo={updateProduct}
                />
              </Box>
            ))}

        </SimpleGrid>
      </Box>
    </>
  );
}
