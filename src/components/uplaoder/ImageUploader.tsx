import React, { useEffect, useState } from "react";

interface ImageUploadProps {
  imageUrl?: string;
  onImageChange: (url: string) => void; // Function to handle image change
}

function ImageUpload({ imageUrl, onImageChange }: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    // If imageUrl prop is passed, set it as the image
    if (imageUrl) {
      setImage(imageUrl);
    }
  }, [imageUrl]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newImageUrl = URL.createObjectURL(file); // Generate URL for the image preview
      setImage(newImageUrl);
      onImageChange(newImageUrl); // Send the URL back to the parent
    }
  };

  return (
    <div className="upload-container">
      {/* Square Upload Button with Image Preview */}
      {/* <label className="upload-box square">
        {image ? (
          <img src={image} alt="Uploaded" className="preview-image" />
        ) : (
          <>
            <span className="icon">+</span>
            <span className="text">Upload</span>
          </>
        )}
        <input
          type="file"
          className="file-input"
          onChange={handleImageUpload}
        />
      </label> */}

      {/* Circular Upload Button with Image Preview */}
      <label className="upload-box circle">
        {image ? (
          <img src={image} alt="Uploaded" className="preview-image" />
        ) : (
          <>
            <span className="icon">+</span>
            <span className="text">Upload</span>
          </>
        )}
        <input
          type="file"
          className="file-input"
          onChange={handleImageUpload}
        />
      </label>
    </div>
  );
}

export default ImageUpload;
