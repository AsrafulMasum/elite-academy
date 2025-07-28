import { Modal } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiImageOn } from "react-icons/ci";
import ChunkedVideoUpload from "./ChunkedVideoUpload";

const AddTutorialsModal = ({ openAddModal, setOpenAddModal }) => {
  const [imgURLs, setImgURLs] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null); // State for video file

  const [form, setForm] = useState({
    productName: "",
    image: "",
    startDate: "",
    endDate: "",
    price: "",
    quantity: "",
  });

  const handleAdd = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setImgURLs([url]);
      setImageFiles([file]);
      setForm((prev) => ({ ...prev, [name]: file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      toast.error("Please select a video.");
      return;
    }

    try {
      const chunkSize = 2 * 1024 * 1024; // 2MB
      const totalChunks = Math.ceil(videoFile.size / chunkSize);
      const fileId = Date.now();
      const fileName = videoFile.name;

      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(videoFile.size, start + chunkSize);
        const chunk = videoFile.slice(start, end);

        const formData = new FormData();
        formData.append("chunk", chunk);
        formData.append("chunkIndex", i);
        formData.append("totalChunks", totalChunks);
        formData.append("fileId", fileId);
        formData.append("fileName", fileName);
        formData.append("title", form.productName);
        formData.append("description", "Some tutorial description");
        formData.append("course", "687b6848fab635d5eecdf47a"); // Replace with real course ID

        const res = await fetch("http://10.10.7.6:5000/api/v1/tutorial/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          toast.error(`Upload failed at chunk ${i}`);
          return;
        }
      }

      toast.success("✅ Tutorial uploaded successfully!");
      setOpenAddModal(false);
      setVideoFile(null);
      setImgURLs([]);
      setImageFiles([]);
      setForm({
        productName: "",
        image: "",
        startDate: "",
        endDate: "",
        price: "",
        quantity: "",
      });
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Upload failed");
    }
  };

  useEffect(() => {
    return () => {
      imgURLs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imgURLs]);

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={() => setOpenAddModal(false)}
      width={400}
      footer={false}
    >
      <div className="p-6 bg-action rounded-lg">
        <h1 className="text-[20px] font-medium mb-3 text-white">Add Tutorials</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center gap-10 mb-10">
            <div className="h-32 w-full flex items-center justify-center bg-gray-300 rounded-lg relative">
              {imgURLs.length > 0 ? (
                <img
                  src={imgURLs[0]}
                  alt="preview"
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <CiImageOn className="text-5xl text-[#121212] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              )}

              <input
                onChange={handleAdd}
                type="file"
                id="img"
                name="image"
                accept="image/*"
                className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-50"
              />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "white" }}>
              Tutorial Video
            </label>
            <div className="flex justify-center items-center h-36">
              <ChunkedVideoUpload onFileSelect={setVideoFile} />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "white" }}>
              Tutorial Name
            </label>
            <input
              value={form.productName}
              onChange={handleAdd}
              type="text"
              name="productName"
              placeholder="Enter Tutorial Name"
              style={{
                border: "1px solid #E0E4EC",
                padding: "10px",
                height: "52px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "white" }}>
              Course Name
            </label>
            <input
              value={form.courseName}
              onChange={handleAdd}
              type="text"
              name="courseName"
              placeholder="Enter Course Name"
              style={{
                border: "1px solid #E0E4EC",
                padding: "10px",
                height: "52px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
              }}
            />
          </div>

          <input
            className="cursor-pointer"
            style={{
              border: "none",
              width: "100%",
              height: "44px",
              marginTop: "10px",
              background: "#13333A",
              color: "white",
              borderRadius: "8px",
              outline: "none",
              padding: "10px 20px",
            }}
            value="Submit"
            type="submit"
          />
        </form>
      </div>
    </Modal>
  );
};

export default AddTutorialsModal;
