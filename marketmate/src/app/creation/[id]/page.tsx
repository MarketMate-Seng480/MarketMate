'use client';
import React, { useState, useEffect } from "react";
import { Button, Box, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import TopBanner from "@components/vendor/TopBanner";
import InfoSection from "@components/vendor/InfoSection";
import ProfileCreationForm from "@components/vendor/ProfileCreationForm";
import { Vendor, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CustomButton } from "@/app/_components/CustomButton";


export default function VendorCreationPage({ 
  params: { id },
}: {
  params: { id: string }
}) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [vendor, setVendor] = useState<Vendor>();
  const [userData, setUserData] = useState<User>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const res = await fetch(`/api/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const user_data = (await res.json()).data;
        setUserData(user_data);
      };
      fetchData();
    }
  }, [id]);


  const newVendor = async (vendor_info: any) => {
    if (userData == null) return;
    try {
      const newVendor = await fetch(`/api/vendors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vendor_info),
      });

      if (!newVendor) return;

      const vendorData = (await newVendor.json()).data;

      const res = await fetch(`/api/users/${userData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "vendor", vendorId: vendorData.id }),
      });
      const updatedUserData = (await res.json()).data;
      setUserData(updatedUserData);

    } catch (error) {
      console.error("Error creating vendor:", error);
    }

  };

  const formClosed = async (vendor_info: any) => {
    await newVendor(vendor_info);
    onClose();
    router.push(`/`);
  }

  const formExited = () => {
    onClose();
    router.push(`/`);
  }

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
  if (!userData) {
    return <div>User not found</div>;
  }

  const initialVendorInfo = {
    name: "",
    description: "",
    email: "",
    phone: "",
    logo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    userId: userData.id,
};

  return (
    <>
      <Box
        mx={10}
        mt={10}
      >
        <ProfileCreationForm
          isOpen={true}
          onClose={onClose}
          onExit={formExited}
          onSave={formClosed}
          initialVendorInfo={initialVendorInfo}
        />
      </Box>
    </>

  )
}