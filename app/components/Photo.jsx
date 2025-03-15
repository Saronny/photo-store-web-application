"use client";

import Image from "next/image";

function Photo({key, src, alt, width, height, photoName, isFavorited = false}) {
  return (
    <div
      className="relative bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out"
      style={{ width, height }}
    >
      <Image
        key={key}
        src={src}
        alt={alt}
        layout="fill"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
    </div>
  );
}

export default Photo;
