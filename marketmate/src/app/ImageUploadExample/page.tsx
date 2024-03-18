"use client";

import React, { useState } from "react";
import ImageUploader from "@components/ImageUpload";


export default function TestImage2() {
  const [imageUrl, setImageUrl] = useState<string>("");
  
  return (
    <div>
      <ImageUploader bucket="avatar" setImageUrl={setImageUrl}/>
      <h1>Image Preview: {imageUrl}</h1>
      
    </div>
  );
}
