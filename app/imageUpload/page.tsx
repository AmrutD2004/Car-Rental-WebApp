"use client";

import React, { useState } from "react";

const UploadMultipleImages = () => {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleUpload = async () => {
    if (!files) return;

    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    const res = await fetch("/api/upload/car", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log(data.imageUrls);

    // Save in DB
    await fetch("/api/save-images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        images: data.imageUrls,
      }),
    });
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={(e) => setFiles(e.target.files)}
      />

      <button onClick={handleUpload}>
        Upload Images
      </button>
    </div>
  );
};

export default UploadMultipleImages;