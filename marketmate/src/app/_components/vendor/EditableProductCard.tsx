"use client";
import { VStack, Image, Heading, Text, Box, useDisclosure } from "@chakra-ui/react";
import type { Product } from "@prisma/client";
import ProductEditModalContainer from "@components/vendor/ProductEditModalContainer";

export default function EditableProductCard({
  product,
  vendorId,
  onSave,
}: {
  product: Product;
  vendorId: string;
  onSave: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateProductInfo = async (info: Product) => {
    const res = await fetch(`/api/vendors/${vendorId}/products/${info.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    const product = await res.json();
    return product.data;
  };

  const deleteProduct = async (product: Product) => {
    const res = await fetch(`/api/vendors/${vendorId}/products/${product.id}`, {
      method: "DELETE",
    });
    if (res.status === 204) {
      console.log("Product deleted successfully");
    }
    if (res.status === 404) {
      console.log("Product not found");
    }
    if (res.status === 500) {
      console.log("Internal server error");
    }
    const deleted = await res.json();
    return deleted;
  };

  return (
    <Box>
      <VStack spacing={8}>
        <Image
          src={product.featureImage}
          alt={product.name}
          borderRadius={10}
          w={320}
          h={350}
          onClick={onOpen}
          cursor={"pointer"}
        />
        <VStack spacing={2}>
          <Heading
            size={"md"}
            onClick={onOpen}
            cursor={"pointer"}
          >
            {product.name}
          </Heading>
          <Text
            size={"sm"}
            as={"b"}
            color={"gray.500"}
          >
            {"$" + product.price.toFixed(2)}
          </Text>
        </VStack>
      </VStack>

      <ProductEditModalContainer
        isOpen={isOpen}
        onClose={onClose}
        onSave={onSave}
        initialProductInfo={product}
        alterProductInfo={updateProductInfo}
        deleteProductInfo={deleteProduct}
        vendorId={vendorId}
      />
    </Box>
  );
}
