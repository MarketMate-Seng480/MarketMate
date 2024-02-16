"use client";
import { useState } from "react";
import { Button, Box, useDisclosure, SimpleGrid } from "@chakra-ui/react";
import { CgAdd } from "react-icons/cg";
import { Vendor, Product } from "@/app/types";
import ProductCard from "./ProductCard";
import ProductEditModalContainer from "./ProductEditModalContainer";
import TopBanner from "../profile/TopBanner";
import { sampleVendors } from "@/app/sampleData/sampleVendors";
import { sampleProducts } from "@/app/sampleData/sampleProducts";

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
  const [products, setProduct] = useState<Product[]>(sampleProducts);

  const addProduct = (product: Product) => {
    setProduct([...products, product]);
  };

  const updateProduct = (index: number, product: Product) => {
    const newProds = [...products];
    newProds[index] = product;
    setProduct(newProds);
  };

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
        <Box mt="50px">
          <SimpleGrid
            minChildWidth="300px"
            spacing={1}
          >
            {products.map((product, index) => (
              <Box
                key={product.image}
                my={5}
                mr={10}
                minW={300}
              >
                <ProductCard
                  initialProductInfo={product}
                  setProductInfo={updateProduct}
                />
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
