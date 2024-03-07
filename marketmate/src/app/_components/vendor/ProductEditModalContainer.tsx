import { useState } from "react";
import {
  Button,
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
} from "@chakra-ui/react";
import { Product } from "@prisma/client";

export default function ProductEditModalContainer({
  isOpen,
  onClose,
  onSave,
  initialProductInfo,
  alterProductInfo,
  vendorId,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  initialProductInfo: Product;
  alterProductInfo: (info: Product) => void;
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
        <ModalHeader>Add New Product</ModalHeader>
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
          <Button
            bg={"#D1C7BD"}
            _hover={{ bg: "#C4BEB5" }}
            mr={3}
            onClick={() => {
              alterProductInfo(productInfo);
              onSave();
            }}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
