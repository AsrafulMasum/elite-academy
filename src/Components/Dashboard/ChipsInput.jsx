import { Tag } from "antd";
import { useState } from "react";

const ChipsInput = ({ separator = ",", tags, setTags }) => {
  // const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTag = (value) => {
    const trimmed = value.trim();
    if(trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if(e.key === "Enter" || e.key === separator) {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const removeTag = (removedTag) => {
    setTags(tags.filter((tag) => tag !== removedTag));
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <label
        style={{ display: "block", marginBottom: "5px", color: "gray" }}
      >
        Product Size
      </label>

      <div
        style={{
          border: "1px solid #E0E4EC",
          borderRadius: "8px",
          padding: "6px 8px",
          background: "white",
          minHeight: "52px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {tags.map((tag) => (
          <Tag
            key={tag}
            closable
            onClose={() => removeTag(tag)}
            style={{ marginBottom: "4px" }}
          >
            {tag}
          </Tag>
        ))}

        <input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter or ','"
          style={{
            border: "none",
            outline: "none",
            flexGrow: 1,
            minWidth: "120px",
            padding: "6px",
          }}
        />
      </div>
    </div>
  );
};

export default ChipsInput;
