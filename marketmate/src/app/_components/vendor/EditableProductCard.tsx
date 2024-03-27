"use client";
import { VStack, Image, Heading, Text, Box, useDisclosure } from "@chakra-ui/react";
import type { Product } from "@prisma/client";
import ProductEditModalContainer from "@components/vendor/ProductEditModalContainer";
import { useToast } from "@chakra-ui/react";

export default function EditableProductCard({
  product,
  vendorId,
  allProducts,
  setProducts,
}: {
  product: Product;
  vendorId: string;
  allProducts: Product[];
  setProducts: (products: Product[]) => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const updateProductInfo = async (info: Product) => {
    const res = await fetch(`/api/vendors/${vendorId}/products/${info.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    const product = await res.json();

    if (res.status === 200) {
      let updatedProducts = [...allProducts];
      const index = updatedProducts.findIndex((p) => p.id === product.data.id);

      // if the product is found in the array, update it, else add it
      if (index !== -1) {
        updatedProducts[index] = product.data;
        setProducts(updatedProducts);

        toast({
          title: "Product updated successfully",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Product added successfully",
          status: "success",
          duration: 1000,
          isClosable: true,
        });

        setProducts([...updatedProducts, product.data]);
      }
    }
    onClose();
    return product.data;
  };

  const deleteProduct = async (product: Product) => {
    const res = await fetch(`/api/vendors/${vendorId}/products/${product.id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      let updatedProducts = allProducts.filter((p) => p.id !== product.id);
      setProducts(updatedProducts);
      toast({
        title: "Product deleted successfully",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      onClose();
    }
    if (res.status === 404) {
      toast({
        title: "Product not found",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      console.log("Product not found");
    }
    if (res.status === 500) {
      toast({
        title: "Sorry, something went wrong. Please try again.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      console.log("Internal server error");
    }
    const deleted = await res.json();
    return deleted;
  };

  return (
    <Box>
      <VStack spacing={8}>
        <Image
          onClick={onOpen}
          cursor={"pointer"}
          src={product.featureImage}
          alt={product.name}
          borderRadius={10}
          w={320}
          h={350}
          objectFit={"cover"}
          fallback={
            <Box
              w={320}
              h={350}
              bg={"gray.500"}
              borderRadius={10}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              onClick={onOpen}
              cursor={"pointer"}
            >
              <Text color={"black"}>Unable To Load: {product.name} Image </Text>
            </Box>
          }
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
            color={"gray.200"}
          >
            {"$" + product.price.toFixed(2)}
          </Text>
        </VStack>
      </VStack>

      <ProductEditModalContainer
        isOpen={isOpen}
        onClose={onClose}
        initialProductInfo={product}
        alterProductInfo={updateProductInfo}
        deleteProductInfo={deleteProduct}
        vendorId={vendorId}
      />
    </Box>
  );
}
