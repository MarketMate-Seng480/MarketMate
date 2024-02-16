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
import { Product } from "@/app/types";

export default function ProductEditModalContainer({
  isOpen,
  onClose,
  initialProductInfo,
  setProductInfo,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialProductInfo: Product;
  setProductInfo: (product: Product) => void;
}) {
  const [tempProductInfo, setTempProductInfo] = useState(initialProductInfo);

  const handleInputChange = (field: keyof Product, value: string | number) => {
    if (value === "price") {
      value = parseFloat(value) || 0;
    }

    setTempProductInfo((prevState) => ({
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
                value={tempProductInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Textarea
                value={tempProductInfo.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </FormControl>
            <FormControl id="price">
              <FormLabel>Price</FormLabel>
              <Input
                value={tempProductInfo.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
              />
            </FormControl>
            <FormControl id="image">
              <FormLabel>Image URL</FormLabel>
              <Input
                value={tempProductInfo.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
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
              setProductInfo(tempProductInfo);
              onClose();
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
