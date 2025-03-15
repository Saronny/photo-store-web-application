"use client";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

function PhotoUploader() {
  const [uploading, setUploading] = useState(false);

  async function handleFileUpload(event) {
    try {
        setUploading(true);

        const file = event.target.files[0];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data: {user} } = await supabase.auth.getUser()

        if(!user) {
            throw new Error("You must be logged in to upload photos");
        }

        const filePath = `user_uploads/${user.id}/${fileName}`;
        const { error } = await supabase.storage
            .from("photos")
            .upload(filePath, file);

        if(error) {
            throw error;
        }

        //TODO: Update UI to show the uploaded photo
    } catch (error) {
        alert(error.message);
    } finally {
        setUploading(false);
    }
  }

return (
    <label 
        htmlFor="photo-upload" 
        className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 font-medium" 
    >
        {uploading ? "Uploading..." : "Upload Photo"}
        <input
            type="file"
            id="photo-upload"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
        />
    </label>
);
}

export default PhotoUploader;
