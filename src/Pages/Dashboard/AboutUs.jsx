import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";

const AboutUs = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false,
    placeholder: "Start typings...",
    style: {
      height: 500,
    },
  };

  const handleSubmit = () => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = content;
    const plainText = tempElement.innerText.trim();

    console.log(plainText);

    setContent("");
  };
  return (
    <div className="px-4">
      <h3
        style={{
          color: "#333333",
          fontSize: 18,
          fontWeight: "500",
          paddingTop: "24px",
          paddingBottom: "36px",
          lineHeight: "24px",
        }}
      >
        About Us
      </h3>

      <div>
        <JoditEditor
          key={content}
          config={config}
          ref={editor}
          value={content}
          onBlur={(newContent) => setContent(newContent)}
        />
      </div>
      <div
        style={{
          marginTop: 36,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => handleSubmit()}
          style={{
            height: 48,
            width: 173,
            backgroundColor: "#BB6D42",
            color: "white",
            borderRadius: "8px",
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          Save & Changes
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
