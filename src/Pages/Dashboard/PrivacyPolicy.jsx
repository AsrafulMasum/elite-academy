import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isLoading, seLoading] = useState(false);

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
    <div className=" bg-white px-4 py-2 rounded-lg pb-10 ">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "16px 0",
        }}
      >
        <div>
          <h3
            className="font-semibold"
            style={{
              color: "#333333",
              fontSize: 18,
              fontWeight: "500",
              lineHeight: "24px",
              paddingBottom: "20px",
            }}
          >
            Privacy Policy
          </h3>
        </div>
        <div></div>
      </div>
      <div>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
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
          onClick={handleSubmit}
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

export default PrivacyPolicy;
