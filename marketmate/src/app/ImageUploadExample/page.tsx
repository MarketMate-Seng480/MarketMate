"use client";

import React, { useEffect, useState } from "react";
import { ImageUploader } from "../_components/ImageUpload";
import { Vendor } from "@prisma/client";

export default function TestImage2() {
  const [imageUrl, setImageUrl] = useState<string>("");

  // Test data to be deleted
  const [vendor, setVendor] = useState<Vendor>();
  const id = '99195369-7053-4b29-bfff-228c3bed66c3';
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
      } catch (error) {
        console.error("Error fetching vendor:", error);
      }
    };
    fetchVendor();
  }, [id]);
  
  return (
    <div>
      <ImageUploader bucket="avatar" setImageUrl={setImageUrl} savedImage={vendor?.logo}/>
      <h1>Image URL: {imageUrl}</h1>
      
    </div>
  );
}
