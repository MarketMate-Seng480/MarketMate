"use client";
import React, { useRef, useState } from "react";
import { supabase } from '../lib/supabase';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import useUser from "../lib/hooks";
import { useRouter } from "next/navigation";


export default function ImageUploader({
  bucket,
  setImageUrl
}: {
  bucket: string,
  setImageUrl: (url: string) => void
}) {

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
          allowedFileTypes: ['image/*'],
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
        bucketName: bucket,
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

      setImageUrl(
        process.env.NEXT_PUBLIC_SUPABASE_URL +
          "/storage/v1/object/public/" +
          bucket +
          "/" +
          user?.id +
          "/" +
          randomUUID +
          "/" +
          fileName
      );
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        uppy.addFile({
          source: "file-added",
          name: e.target.files[0].name,
          type: e.target.files[0].type,
          data: e.target.files[0],
        });
        
        handleUpload();
      }
    };

    return (
      <>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleChange}
        />
      </>
    )
}