import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import {
  useGetRulesQuery,
  useUpdateRulesMutation,
} from "../../redux/features/rulesApi";

const Support = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  // Fetching data from API
  const { data, isLoading, isError } = useGetRulesQuery({ type: "support" });

  // Mutation hook for updating data
  const [updateRules, { isLoading: isUpdating }] = useUpdateRulesMutation();

  // Set content when data is fetched
  useEffect(() => {
    if (data?.data?.content) {
      setContent(data.data.content);
    }
  }, [data]);

  // Editor config
  const config = {
    readonly: false,
    placeholder: "Start typings...",
    style: {
      height: 500,
    },
  };

  // Handle form submit
  const handleSubmit = async () => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = content;
    const plainText = tempElement.innerText.trim();

    if (!plainText) {
      toast.error("Content cannot be empty");
      return;
    }

    try {
      await updateRules({
        type: "support",
        content,
      }).unwrap();
      toast.success("Updated successfully!");
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update");
    }
  };

  return (
    <div className="px-4 bg-green h-full">
      <h3
        style={{
          color: "#FDFDFD",
          fontSize: 18,
          fontWeight: "500",
          paddingTop: "24px",
          paddingBottom: "36px",
          lineHeight: "24px",
        }}
      >
        Support
      </h3>

      {isLoading ? (
        <p className="text-white">Loading...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load content</p>
      ) : (
        <>
          <div>
            <JoditEditor
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
              onClick={handleSubmit}
              disabled={isUpdating}
              style={{
                height: 48,
                width: 173,
                backgroundColor: "#2E7A8A",
                color: "white",
                borderRadius: "8px",
                fontWeight: 500,
                fontSize: 14,
                opacity: isUpdating ? 0.6 : 1,
                cursor: isUpdating ? "not-allowed" : "pointer",
              }}
            >
              {isUpdating ? "Saving..." : "Save & Changes"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Support;
