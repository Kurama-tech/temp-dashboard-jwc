import { mdiTrashCan, mdiPlus } from "@mdi/js";
import Image from "next/image";
import image from "next/image";
import React, { useState, useRef } from "react";
import BaseButton from "./BaseButton";

interface Props {
  onUpload: (files: File[]) => void;
}

const MultiImageSelect: React.FC<Props> = ({ onUpload }) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleUploadClick = () => {
    const fileInput = inputRef.current;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleUpload = () => {
    onUpload(selectedImages);
    setSelectedImages([]);
  };

  return (
    <div className="max-w-md mx-auto">
      <input
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleImageSelect}
      />
     
      <BaseButton
        color="info"
        
        icon={mdiPlus}
        onClick={handleUploadClick}
        small
        />
      {selectedImages.length > 0 && (
        <div className="mt-4 grid gap-4 grid-cols-2">
          {selectedImages.map((image, index) => (
            <div key={index} className="flex flex-col justify-between border rounded-lg overflow-hidden">
              <div className="relative h-48">
                <img
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full mr-2 mt-2"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </button>
              </div>
              <div className="bg-gray-200 py-2 px-4 flex justify-between items-center">
                <span>{image.name}</span>
              </div>
            </div>
          ))}
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 col-span-2"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      )}
    </div>
    
  );
};

export default MultiImageSelect;
