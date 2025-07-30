// ChunkedVideoUpload.jsx
import React, { useRef, useState } from "react";
import { FaVideo } from "react-icons/fa";
import { IoIosCheckmark, IoMdClose } from "react-icons/io";

const ChunkedVideoUpload = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if(file) {
      setPreviewUrl(URL.createObjectURL(file));
      onFileSelect(file);
    } else {
      setPreviewUrl(null);
      onFileSelect(null);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex justify-center items-center gap-4">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="video/*"
        onChange={handleFileChange}
      />
      {!previewUrl ? (
        <div
          onClick={handleIconClick}
          style={{
            fontSize: "40px",
            cursor: "pointer",
            color: "#FFC107",
            marginBottom: "20px",
          }}
        >
          <FaVideo />
        </div>
      ) : (
        <div className="flex justify-center items-center gap-2">
          <div onClick={handleIconClick} style={{ cursor: "pointer" }}>
            <video className="h-36" width="100%" controls src={previewUrl} />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPreviewUrl(null);
              fileInputRef.current.value = "";
              onFileSelect(null);
            }}
            className="bg-red-500 text-white rounded-full p-2.5 hover:bg-red-600 z-10"
            title="Remove selected video"
          >
            <IoMdClose className="text-sm" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChunkedVideoUpload;
