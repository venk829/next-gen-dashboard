"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ImageUpload({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const fileName =
      Date.now() + "-" + file.name;

    const { error } = await supabase.storage
      .from("course-images")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("course-images")
      .getPublicUrl(fileName);

    onUpload(publicUrl);

    setUploading(false);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={uploadImage}
      />

      {uploading && (
        <p>Uploading...</p>
      )}
    </div>
  );
}