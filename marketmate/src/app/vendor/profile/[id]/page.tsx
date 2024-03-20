"use client";
import React, { useState, useEffect } from "react";
import { Button, Box, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import TopBanner from "@/app/_components/publicStoreFront/TopBanner";
import InfoSection from "@components/vendor/InfoSection";
import ProfileEditModalContainer from "@components/vendor/ProfileEditForm";
import { Vendor } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CustomButton } from "@/app/_components/CustomButton";

export default function VendorProfilePage({ params: { id } }: { params: { id: string } }) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [vendor, setVendor] = useState<Vendor>();
  const [isLoading, setLoading] = useState(true);

  const formClosed = () => {
    onClose();
    location.reload();
  };

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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!vendor) {
    return <div>Vendor not found</div>;
  }

  return (
    <>
      <TopBanner
        shopName={vendor.name}
        logo={vendor.logo}
        banner={vendor.banner}
      />

      <Box
        mx={10}
        mt={10}
      >
        <CustomButton
          leftIcon={<FiEdit />}
          variant="secondary"
          onClick={onOpen}
        >
          Edit Profile
        </CustomButton>
        <InfoSection {...vendor} />
        <ProfileEditModalContainer
          isOpen={isOpen}
          onClose={onClose}
          onSave={formClosed}
          initialVendorInfo={vendor}
        />
      </Box>
    </>
  );
}
