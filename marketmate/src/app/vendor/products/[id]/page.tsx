"use client";
import { useState, useEffect } from "react";
import { Button, Box, useDisclosure, SimpleGrid } from "@chakra-ui/react";
import { CgAdd } from "react-icons/cg";
import { Vendor, Product } from "@prisma/client";
import ProductCard from "@components/vendor/ProductCard";
import ProductCreationModalContainer from "@components/vendor/ProductCreationModalContainer";
import TopBanner from "@components/vendor/TopBanner";
import { CustomButton } from "@/app/_components/CustomButton";

export default function VendorProductPage({ 
  params: { id },
}: {
  params: { id: string }
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProduct] = useState<Product[]>([]);
  const [vendor, setVendor] = useState<Vendor>();
  const [isLoading, setLoading] = useState(true);

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
        setProduct(products);
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
    return product.data;
  };

  const formClosed = () => {
    onClose();
    location.reload();
  }

  const initialProductInfo: Product = {
    id: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    vendorId: vendor.id,
    detailImage: ["https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1658&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
    featureImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1658&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isFeatured: false,
  };

  const productCards = products?.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      vendorId={vendor.id}
      onSave={formClosed}
    />
  ));

  return (
    <>
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
          onSave={formClosed}
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
    </>
  );
}
