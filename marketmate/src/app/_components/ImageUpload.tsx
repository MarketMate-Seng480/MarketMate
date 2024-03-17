"use client";
import React, { useRef, useState } from "react";
import { supabase } from '../lib/supabase';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import { Dashboard } from '@uppy/react';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import { Button, Toast } from "@chakra-ui/react";
import { buffer } from "stream/consumers";
import useUser from "../lib/hooks";
import { useRouter } from "next/navigation";

export default function ImageUploader() {

    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const {data:user} = useUser()
    const router = useRouter();

    const onBeforeRequest = async (req: any) => {
      const { data } = await supabase.auth.getSession();
		  req.setHeader("Authorization", `Bearer ${data.session?.access_token}`);
    };

    const [uppy] = useState(() => 
      new Uppy({
        restrictions:{
          maxNumberOfFiles: 1,
          allowedFileTypes: ['image/png', 'image/jpeg', 'image/jpg'],
          maxFileSize: 5 * 1000 * 1000, // 5MB
        },
      }).use(Tus, { 
        endpoint: process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/upload/resumable",

        onBeforeRequest,

        allowedMetaFields: [
          "bucketName",
          "objectName",
          "contentType",
          "cacheControl",
        ],
      })
    );

    uppy.on('file-added', (file) => {
      file.meta = {
        ...file.meta,
        bucketName: "productImage",
        contentType: file.type,
      }

    });

    uppy.on("upload-success", () => {
      uppy.cancelAll();
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      document.getElementById("trigger-close")?.click();
      router.refresh();
    });


    const handleUpload = () => {
      if (uppy.getFiles().length === 0) console.error("No file to upload");

      const randomUUID = crypto.randomUUID();

      uppy.setFileMeta(uppy.getFiles()[0].id, {
        objectName: user?.id + "/" + randomUUID + "/" + uppy.getFiles()[0].name,
      });

      const fileName = uppy.getFiles()[0].name;

      uppy.upload();

    };


    // .uppy-Dashboard-inner needs to be overridden to fix the width of the modal

    return (
      <>
        <div className="space-y-5">
          <Dashboard 
            uppy={uppy} 
            hideUploadButton
          />

          <Button 
            className="w-full"
            onClick={handleUpload}
            > 
            Upload 
            </Button>


        </div>
      </>
    )
}