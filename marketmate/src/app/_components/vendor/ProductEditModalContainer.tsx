import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { Product } from "@prisma/client";
import { CustomButton } from "../CustomButton";

export default function ProductEditModalContainer({
  isOpen,
  onClose,
  initialProductInfo,
  alterProductInfo,
  deleteProductInfo,
  vendorId,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialProductInfo: Product;
  alterProductInfo: (info: Product) => void;
  deleteProductInfo: (info: Product) => void;
  vendorId: string;
}) {
  const [productInfo, setProductInfo] = useState(initialProductInfo);

  const handleInputChange = (field: keyof Product, value: string | number) => {
    if (value === "price") {
      value = parseFloat(value) || 0;
    }
    setProductInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"2xl"}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Stack spacing={5}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                value={productInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Textarea
                value={productInfo.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </FormControl>
            <FormControl id="price">
              <FormLabel>Price</FormLabel>
              <Input
                value={productInfo.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
              />
            </FormControl>
            <FormControl id="stock">
              <FormLabel>Stock</FormLabel>
              <Input
                value={productInfo.stock}
                onChange={(e) => handleInputChange("stock", e.target.value)}
              />
            </FormControl>
            <FormControl id="image">
              <FormLabel>Image URL</FormLabel>
              <Input
                value={productInfo.featureImage}
                onChange={(e) => handleInputChange("featureImage", e.target.value)}
              />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <HStack w={"100%"}>
            <CustomButton
              mr={3}
              onClick={() => {
                deleteProductInfo(productInfo);
                // onSave();
              }}
            >
              Delete
            </CustomButton>
            <Spacer />
            <CustomButton
              mr={3}
              onClick={() => {
                alterProductInfo(productInfo);
                // onSave();
              }}
            >
              Save
            </CustomButton>
            <CustomButton
              variant={"secondary"}
              onClick={onClose}
            >
              Cancel
            </CustomButton>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
