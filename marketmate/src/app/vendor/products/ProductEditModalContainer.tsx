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
        setTempProductInfo((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
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
                                onChange={(e) => handleInputChange("price", parseFloat(e.target.value))}
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
                    <Button onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        onClick={() => {
                            setProductInfo(tempProductInfo);
                            onClose();
                        }}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
    
  }