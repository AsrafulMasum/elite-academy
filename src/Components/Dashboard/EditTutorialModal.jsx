import { Modal } from "antd";
import { useEffect, useState } from "react";
import ChunkedVideoUpload from "./ChunkedVideoUpload";
import {
  useGetCoursesQuery,
  useGetTopicsQuery,
} from "../../redux/features/courseApi";
import { imageUrl } from "../../redux/api/baseApi";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";

const EditTutorialModal = ({
  openEditModal,
  setOpenEditModal,
  tutorialData,
  refetch,
}) => {
  const { data: coursesData } = useGetCoursesQuery({});
  const { data: topicsData } = useGetTopicsQuery();
  const [showDefaultVideo, setShowDefaultVideo] = useState(true);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [form, setForm] = useState({
    productName: "",
    course: "",
    topic: "",
  });

  useEffect(() => {
    if (tutorialData) {
      setForm({
        productName: tutorialData?.title || "",
        course: tutorialData?.course?._id || "",
        topic: tutorialData?.topic?._id || "",
      });
    }
  }, [tutorialData]);

  const courseOptions = coursesData?.data?.map((course) => ({
    name: course.name,
    id: course._id,
  }));

  const topicOptions = topicsData?.data?.map((topic) => ({
    name: topic?.title,
    id: topic?._id,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoSelect = (file) => {
    setVideoFile(file);
    setShowDefaultVideo(false);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Update text fields first
  //     const updateRes = await fetch(
  //       `http://31.97.114.108:5000/api/v1/tutorial/${tutorialData?._id}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           title: form.productName,
  //           course: form.course,
  //           topic: form.topic,
  //         }),
  //       }
  //     );

  //     const updateData = await updateRes.json();

  //     if(!updateRes.ok || !updateData.success) {
  //       throw new Error(updateData.message || "Failed to update tutorial data");
  //     }

  //     // Upload video in chunks if a new video is selected
  //     if(videoFile) {
  //       const chunkSize = 5 * 1024 * 1024; // 5MB
  //       const totalChunks = Math.ceil(videoFile.size / chunkSize);

  //       for (let i = 0; i < totalChunks; i++) {
  //         const start = i * chunkSize;
  //         const end = Math.min(videoFile.size, start + chunkSize);
  //         const chunk = videoFile.slice(start, end);

  //         const formData = new FormData();
  //         formData.append("chunk", chunk);
  //         formData.append("chunkIndex", i);
  //         formData.append("totalChunks", totalChunks);
  //         formData.append("fileName", videoFile.name);

  //         const chunkRes = await fetch(
  //           `http://31.97.114.108:5000/api/v1/tutorial/${tutorialData?._id}`,
  //           {
  //             method: "PATCH",
  //             body: formData,
  //           }
  //         );

  //         const chunkData = await chunkRes.json();
  //         if(!chunkRes.ok || !chunkData.success) {
  //           throw new Error(chunkData?.message || "Chunk upload failed");
  //         }
  //       }
  //     }

  //     message.success("Tutorial updated successfully!");
  //     setOpenEditModal(false);
  //     refetch();
  //   } catch (error) {
  //     console.error(error);
  //     message.error(error.message || "An error occurred");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);

    try {
      // 1. Update metadata
      const updateRes = await fetch(
        `http://31.97.114.108:5000/api/v1/tutorial/${tutorialData?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: form.productName,
            course: form.course,
            topic: form.topic,
          }),
        }
      );

      const updateData = await updateRes.json();
      if (!updateRes.ok || !updateData.success) {
        throw new Error(updateData.message || "Failed to update tutorial data");
      }

      // 2. Upload video chunks (if video selected)
      if (videoFile) {
        const chunkSize = 5 * 1024 * 1024; // 5MB
        const totalChunks = Math.ceil(videoFile.size / chunkSize);
        const fileId = Date.now();
        for (let i = 0; i < totalChunks; i++) {
          const start = i * chunkSize;
          const end = Math.min(videoFile.size, start + chunkSize);
          const chunk = videoFile.slice(start, end);

          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("chunkIndex", i);
          formData.append("totalChunks", totalChunks);
          formData.append("fileName", videoFile.name);
          formData.append("fileId", fileId);

          const chunkRes = await fetch(
            `http://31.97.114.108:5000/api/v1/tutorial/${tutorialData?._id}`,
            {
              method: "PATCH",
              body: formData,
            }
          );

          const chunkData = await chunkRes.json();
          if (!chunkRes.ok || !chunkData.success) {
            throw new Error(chunkData?.message || "Chunk upload failed");
          }

          // Optional: update upload progress
          setProgress(Math.round(((i + 1) / totalChunks) * 100));
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An error occurred");
    } finally {
      refetch();
      setLoading(false);
      setProgress(0);
      toast.success("Tutorial updated successfully!");
      setOpenEditModal(false);
    }
  };

  return (
    <Modal
      centered
      open={openEditModal}
      onCancel={() => setOpenEditModal(false)}
      width={400}
      footer={false}
    >
      <div className="p-6 rounded-lg">
        <h1 className="text-[20px] font-medium mb-3 text-white">
          Edit Tutorial
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Video Upload */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-400">Tutorial Video</label>
            <div className="relative w-full h-40 flex justify-center items-center">
              {videoFile ? (
                <video
                  controls
                  className="w-full h-full object-contain rounded"
                  src={URL.createObjectURL(videoFile)}
                />
              ) : tutorialData?.video && showDefaultVideo ? (
                <div className="relative w-full h-full">
                  <video
                    controls
                    className="w-full h-full object-contain rounded"
                    src={`${imageUrl}/video/${tutorialData.video}`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setVideoFile(null);
                      setShowDefaultVideo(false);
                    }}
                    className="absolute top-1 right-1 bg-white text-black rounded-full p-1 hover:bg-red-500 hover:text-white transition"
                  >
                    <AiOutlineClose size={16} />
                  </button>
                </div>
              ) : (
                <ChunkedVideoUpload onFileSelect={handleVideoSelect} />
              )}
            </div>
          </div>

          {/* Tutorial Name */}
          <div className="mb-4 mt-10">
            <label className="block mb-1 text-gray-400">Tutorial Name</label>
            <input
              value={form.productName}
              type="text"
              name="productName"
              onChange={handleChange}
              placeholder="Enter Tutorial Name"
              className="w-full p-3 rounded border border-gray-300"
            />
          </div>

          {/* Course */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-400">Course</label>
            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              className="w-full p-3 rounded border border-gray-300"
            >
              <option value="">Select Course</option>
              {courseOptions?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {/* Topic */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-400">Topic</label>
            <select
              name="topic"
              value={form.topic}
              onChange={handleChange}
              className="w-full p-3 rounded border border-gray-300"
            >
              <option value="">Select Topic</option>
              {topicOptions?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#2E7A8A] px-6 py-3 w-full text-[#FEFEFE] rounded-lg flex items-center justify-center gap-2"
          >
            {loading && <ImSpinner9 size={20} className="animate-spin" />}
            {loading ? "Uploading" : "Upload"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditTutorialModal;
