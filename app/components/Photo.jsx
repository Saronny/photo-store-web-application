"use client";

import Image from "next/image";
import { useState } from "react";
import PhotoModal from "./PhotoModal";
import { Delete } from "@mui/icons-material";
import { deletePhoto } from "../actions/deletePhoto";

function Photo({key, src, alt, width, height, photoName, isFavorited = false}) {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <>
      <div
        className="relative bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out"
        style={{ width, height }}
      >
        <form 
          action={deletePhoto}
          className="absolute bottom-2.5 right-2.5 z-10"
        >
          <input type="hidden" name="photoPath" value={src} />
          <button
            type="submit"
            className="text-red-500 bg-white border border-red-500 px-2 py-1 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out"
          >
            <Delete />
          </button>
        </form>
        <Image
          key={key}
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{ objectFit: "cover", objectPosition: "center", width: "100%", height: "100%" }}
          onClick={toggleModal}
        />
      </div>
      {showModal && <PhotoModal src={src} alt={alt} onClose={toggleModal} />}
    </>
  );
}

export default Photo;
