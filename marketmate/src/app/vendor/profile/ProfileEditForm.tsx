"use client";

import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
} from "@chakra-ui/react";
import { Vendor } from "@/app/types";

export default function ProfileEditModalContainer({
  isOpen,
  onClose,
  initialVendorInfo,
  setVendorInfo,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialVendorInfo: Vendor;
  setVendorInfo: (info: Vendor) => void;
}) {
  const [tempVendorInfo, setTempVendorInfo] = useState(initialVendorInfo);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"2xl"}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Profile Edit</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl id="userName">
            <FormLabel>Shop Name</FormLabel>
            <Input
              type="text"
              value={tempVendorInfo.name}
              onChange={(e) =>
                setTempVendorInfo({
                  ...tempVendorInfo,
                  name: e.target.value,
                })
              }
            />
          </FormControl>

          <FormControl id="logo">
            <Stack
              direction={["column", "row"]}
              spacing={10}
              mt={5}
            >
              <FormControl id="logo">
                <FormLabel>Shop Logo URL</FormLabel>
                <Input
                  type="text"
                  value={tempVendorInfo.logo}
                  onChange={(e) =>
                    setTempVendorInfo({
                      ...tempVendorInfo,
                      logo: e.target.value,
                    })
                  }
                />
              </FormControl>
              <Avatar
                size="xl"
                src={tempVendorInfo.logo}
              />
            </Stack>
          </FormControl>

          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={tempVendorInfo.email}
              onChange={(e) =>
                setTempVendorInfo({
                  ...tempVendorInfo,
                  email: e.target.value,
                })
              }
            />
          </FormControl>

          <FormControl id="phone">
            <FormLabel>Phone</FormLabel>
            <Input
              type="tel"
              value={tempVendorInfo.phone}
              onChange={(e) =>
                setTempVendorInfo({
                  ...tempVendorInfo,
                  phone: e.target.value,
                })
              }
            />
          </FormControl>

          <FormControl id="address">
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              value={tempVendorInfo.address}
              onChange={(e) =>
                setTempVendorInfo({
                  ...tempVendorInfo,
                  address: e.target.value,
                })
              }
            />
          </FormControl>

          <FormControl id="tags">
            <FormLabel>Store tags</FormLabel>
            <Input
              type="text"
              value={tempVendorInfo.shopTags.join(", ")}
              onChange={(e) =>
                setTempVendorInfo({
                  ...tempVendorInfo,
                  shopTags: e.target.value.split(",").map((tag) => tag.trim()),
                })
              }
            />
          </FormControl>

          <FormControl id="aboutUs">
            <FormLabel>About Us</FormLabel>
            <Textarea
              value={tempVendorInfo.description}
              onChange={(e) =>
                setTempVendorInfo({
                  ...tempVendorInfo,
                  description: e.target.value,
                })
              }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              setVendorInfo(tempVendorInfo);
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
