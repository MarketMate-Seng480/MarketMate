"use client";
import { useState, useEffect } from "react";
import { Button, Box, useDisclosure, SimpleGrid, Spacer, Flex } from "@chakra-ui/react";
import { CgAdd } from "react-icons/cg";
import { Product } from "@prisma/client";
import { Vendor_Extended } from "@/app/lib/types";
import EditableProductCard from "@components/vendor/EditableProductCard";
import ProductCreationModalContainer from "@components/vendor/ProductCreationModalContainer";
import TopBanner from "@components/vendor/TopBanner";
import { CustomButton } from "@components/CustomButton";
import { useToast } from "@chakra-ui/react";

export default function VendorProductPage({ params: { id } }: { params: { id: string } }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState<Product[]>([]);
  const [vendor, setVendor] = useState<Vendor_Extended>();
  const [isLoading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await fetch(`/api/vendors/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const vendor_data = await data.data;
        setVendor(vendor_data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching vendor:", error);
      }
    };
    fetchVendor();
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/vendors/${id}/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const products = await data.data;
        setProducts(products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!vendor) {
    return <div>Vendor not found</div>;
  }

  const addProductInfo = async (info: Product) => {
    const res = await fetch(`/api/vendors/${vendor.id}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: info.name,
        description: info.description,
        price: info.price,
        stock: info.stock,
        featureImage: info.featureImage,
        detailImage: info.detailImage,
      }),
    });
    const product = await res.json();

    if (res.status === 200) {
      setProducts([...products, product.data]);
      toast({
        title: "Product added successfully",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      onClose();
    }

    return product.data;
  };

  const initialProductInfo: Product = {
    id: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    vendorId: vendor.id,
    detailImage: [
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1658&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    featureImage:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1658&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isFeatured: false,
  };

  const productCards = products?.map((product) => (
    <EditableProductCard
      key={product.id}
      product={product}
      vendorId={vendor.id}
      allProducts={products}
      setProducts={setProducts}
    />
  ));

  return (
    <Box>
      <TopBanner
        name={vendor.name}
        logo={vendor.logo || ""}
        banner={vendor.banner || ""}
      />
      <Box
        mx={10}
        mt={10}
      >
        <CustomButton
          leftIcon={<CgAdd />}
          variant="secondary"
          onClick={onOpen}
        >
          Add Product
        </CustomButton>

        <ProductCreationModalContainer
          isOpen={isOpen}
          onClose={onClose}
          initialProductInfo={initialProductInfo}
          alterProductInfo={addProductInfo}
          vendorId={vendor.id}
        />

        <Box mt="50px">
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            p={10}
          >
            {productCards}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}
