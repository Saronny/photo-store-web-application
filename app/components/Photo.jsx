"use client";

import Image from "next/image";
import { useState } from "react";
import PhotoModal from "./PhotoModal";
import { Delete } from "@mui/icons-material";
import { deletePhoto } from "../actions/deletePhoto";
import { addOrRemoveFavorite } from "../actions/addOrRemoveFromFavorites";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

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
                className="absolute bottom-2.5 right-10 z-10"
                >
                    <input type="hidden" name="photoPath" value={src} />
                    <button 
                    type="submit"
                    className="bg-transparent border-none text-white cursor-pointer hover:text-red-500 hover:scale-110 transition duration-300"
                    >
                        <Delete />
                    </button>
                </form>

                <form 
                action={addOrRemoveFavorite}
                className="absolute bottom-2.5 right-2.5 z-10"
                >
                    <input type="hidden" name="photoName" value={photoName} />
                    <input type="hidden" name="isFavorited" value={isFavorited} />
                    <button 
                    type="submit"
                    className="bg-transparent border-none text-white cursor-pointer hover:text-green-500 hover:scale-110 transition duration-300"
                    >
                        {isFavorited ? <Favorite /> : <FavoriteBorder />}
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
