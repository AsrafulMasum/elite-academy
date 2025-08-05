import { Modal } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ChunkedVideoUpload from "./ChunkedVideoUpload";
import {
  useAddTutorialMutation,
  useGetCoursesQuery,
  useGetTopicsQuery,
} from "../../redux/features/courseApi";
import { ImSpinner9 } from "react-icons/im";

const AddTutorialsModal = ({ openAddModal, setOpenAddModal, refetch }) => {
  const { data } = useGetCoursesQuery({});
  const courseOptions = data?.data?.map((course) => ({
    name: course.name,
    id: course._id,
  }));

  const { data: topicsData } = useGetTopicsQuery();
  const topicOptions = topicsData?.data?.map((topic) => ({
    name: topic?.title,
    id: topic?._id,
  }));
  const [addTutorial, { isLoading }] = useAddTutorialMutation();

  const [imgURLs, setImgURLs] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

  const [form, setForm] = useState({
    productName: "",
    image: "",
    startDate: "",
    endDate: "",
    price: "",
    quantity: "",
    course: "",
    topic: "",
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
        formData.append("course", form.course);
        formData.append("topic", form.topic);
        // if(imageFiles.length > 0) {
        //   formData.append("image", imageFiles[0]);
        // }

        const res = await addTutorial(formData).unwrap();

        if (res?.data) {
          toast.success("✅ Tutorial uploaded successfully!");
          refetch();
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
            course: "",
            topic: "",
          });
        }
      }
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
      <div className="p-6 rounded-lg">
        <h1 className="text-[20px] font-medium mb-3 text-black">
          Add Tutorials
        </h1>

        <form onSubmit={handleSubmit}>
          {/* <div className="flex justify-center items-center gap-10 mb-10">
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
          </div> */}

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{ display: "block", marginBottom: "5px", color: "gray" }}
            >
              Tutorial Video
            </label>
            <div className="flex justify-center items-center h-36">
              <ChunkedVideoUpload onFileSelect={setVideoFile} />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{ display: "block", marginBottom: "5px", color: "gray" }}
            >
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
            <label
              style={{ display: "block", marginBottom: "5px", color: "gray" }}
            >
              Course
            </label>

            <select
              name="course"
              value={form.course}
              onChange={handleAdd}
              style={{
                border: "1px solid #E0E4EC",
                padding: "10px",
                height: "52px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
              }}
            >
              <option value="">Select Course</option>
              {courseOptions?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{ display: "block", marginBottom: "5px", color: "gray" }}
            >
              Topic
            </label>

            <select
              name="topic"
              value={form.topic}
              onChange={handleAdd}
              style={{
                border: "1px solid #E0E4EC",
                padding: "10px",
                height: "52px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
              }}
            >
              <option value="">Select Topic</option>
              {topicOptions?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-[#2E7A8A] px-6 py-3 w-full text-[#FEFEFE] rounded-lg flex items-center justify-center gap-2"
          >
            {isLoading && <ImSpinner9 size={20} className="animate-spin" />}
            {isLoading ? "Uploading" : "Upload"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddTutorialsModal;
