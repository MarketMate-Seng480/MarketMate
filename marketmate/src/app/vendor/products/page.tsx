"use client";

import { useState } from "react";
import { Button, Box, Heading, useDisclosure, SimpleGrid } from "@chakra-ui/react";
import { CgAdd } from "react-icons/cg";
import { Vendor, Product } from "@/app/types";
import TopBanner from "./TopBanner";
import ProductCard from "./ProductCard";
import ProductEditModalContainer from './ProductEditModalContainer';


export default function VendorProductPage() {
  const initialVendorInfo: Vendor = {
    name: "Nordie Craft",
    email: "hello@nordie.com",
    phone: "12504445555",
    address: "123 Main St, Victoria, BC 10030",
    logo: "https://images-platform.99static.com//PUbacMO1kj_Pce5m6UVdX4w0ZC4=/0x0:1979x1979/fit-in/500x500/99designs-contests-attachments/115/115048/attachment_115048238",
    description:
      "We are a small business that specializes in handmade crafts. Our store is located in the heart of Victoria, BC. We have a wide selection of products that are perfect for gifts or for yourself.",
    shopTags: ["handmade", "crafts", "gifts"],
  };
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
    {name: "Pink Chair", description: "A beautiful pink chair that is perfect for your living room.", price: 100, image: 'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80', vendor: initialVendorInfo, vendorId: 0},
    {name: "Pink Chair", description: "A beautiful pink chair that is perfect for your living room.", price: 100, image: 'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80', vendor: initialVendorInfo, vendorId: 0},
  ]);

  const addProduct = (product: Product) => {
    setProduct([...products, product]);
  }

  return (
    <>
      <TopBanner
        name={vendorInfo.name}
        logo={vendorInfo.logo || ""}
      />
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
          {products.map(product => (
             <Box
             key={product.id}
             mx={10}
             mt={10}
            >
              <ProductCard 
                initialProductInfo={product}
              />
            </Box>
          ))}

      </SimpleGrid>
    </>
  );
}