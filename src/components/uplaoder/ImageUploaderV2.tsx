import { useState } from "react";

export default function ImageUpload() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file)); // Generate a URL for the image
    }
  };

  return (
    <div className="flex space-x-4">
      <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center w-32 h-32 cursor-pointer hover:border-gray-400">
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <span className="text-gray-500 text-2xl">+</span>
            <span className="text-gray-500">Upload</span>
          </>
        )}
        <input type="file" className="hidden" onChange={handleImageUpload} />
      </label>

      <label className="border-2 border-dashed border-blue-400 rounded-full flex flex-col items-center justify-center w-32 h-32 cursor-pointer hover:border-blue-600">
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <>
            <span className="text-blue-500 text-2xl">+</span>
            <span className="text-blue-500">Upload</span>
          </>
        )}
        <input type="file" className="hidden" onChange={handleImageUpload} />
      </label>
    </div>
  );
}
