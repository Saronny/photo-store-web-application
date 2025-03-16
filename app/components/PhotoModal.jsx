"use client";
import Image from "next/image";

export default function PhotoModal({ src, alt, onClose }) {
  if (!src) return null;
  return (
    <div className="fixed inset-0 bg-gray-100  bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg relative border border-gray-700">
        <button
          onClick={onClose}
          className="text-black hover:text-gray-700 mb-4"
        >
          Close
        </button>
        <div className="relative w-[80vw] h-[80vh]">
          <Image
            src={src}
            alt={alt}
            fill={true}
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
