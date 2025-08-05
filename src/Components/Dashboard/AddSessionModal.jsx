import { DatePicker, Modal } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { ConfigProvider, TimePicker } from "antd/es";
import toast from "react-hot-toast";
import {
  useCreateSessionMutation,
  useGetCoursesQuery,
} from "../../redux/features/courseApi";
import { ImSpinner9 } from "react-icons/im";

const AddSessionModal = ({ openAddModal, setOpenAddModal, refetch }) => {
  const [form, setForm] = useState({
    title: "",
    course: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const { data } = useGetCoursesQuery({});
  const courseOptions = data?.data?.map((course) => ({
    name: course.name,
    id: course._id,
  }));

  const [createSession, {isLoading}] = useCreateSessionMutation();

  const handleAdd = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setForm((prev) => ({
      ...prev,
      date: date ? dayjs(date).format("YYYY-MM-DD") : "",
    }));
  };

  const handleTimeChange = (key, time) => {
    setForm((prev) => ({
      ...prev,
      [key]: time ? time.toISOString() : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      course: form.course,
      date: form.date,
      startTime: dayjs(form.startTime).format("h:mm A"),
      endTime: dayjs(form.endTime).format("h:mm A"),
    };

    try {
      const res = await createSession(payload).unwrap();

      if(res?.success) {
        toast.success("Session added successfully!");
        setForm({
          title: "",
          course: "",
          date: "",
          startTime: "",
          endTime: "",
        });
        setOpenAddModal(false);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while adding the session.");
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#13333A",
        },
      }}
    >
      <Modal
        centered
        open={openAddModal}
        onCancel={() => setOpenAddModal(false)}
        width={400}
        footer={false}
      >
        <div className="p-6 rounded-lg">
          <h1 className="text-[20px] font-medium mb-3 text-black">
            Add Session
          </h1>
          <form onSubmit={handleSubmit}>
            {/* Course */}
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "gray",
                }}
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

            {/* Title */}
            <div className="mb-4">
              <label className="text-gray-400 mb-1 block">Session Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleAdd}
                placeholder="Enter session title"
                className="w-full border border-[#E0E4EC] bg-white rounded-lg px-4 py-2 h-[52px] outline-none"
              />
            </div>

            {/* Date */}
            <div className="flex gap-4 mb-4 w-full">
              <div>
                <label className="text-gray-400 mb-1 block">Date</label>
                <DatePicker
                  className="w-full h-[52px]"
                  style={{ borderRadius: 8 }}
                  onChange={handleDateChange}
                  format="YYYY-MM-DD"
                  value={form.date ? dayjs(form.date) : null}
                />
              </div>
            </div>

            {/* Time Pickers */}
            <div className="w-full flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="text-gray-400 mb-1 block">Start Time</label>
                <TimePicker
                  className="h-[52px] w-full"
                  onChange={(time) => handleTimeChange("startTime", time)}
                  value={form.startTime ? dayjs(form.startTime) : null}
                  format="HH:mm"
                />
              </div>
              <div className="w-1/2">
                <label className="text-gray-400 mb-1 block">End Time</label>
                <TimePicker
                  className="h-[52px] w-full"
                  onChange={(time) => handleTimeChange("endTime", time)}
                  value={form.endTime ? dayjs(form.endTime) : null}
                  format="HH:mm"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-[#2E7A8A] px-6 py-3 w-full text-[#FEFEFE] rounded-lg flex items-center justify-center gap-2"
            >
              {isLoading && <ImSpinner9 size={20} className="animate-spin" />}
              {isLoading ? "Submitting" : "Submit"}
            </button>
          </form>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default AddSessionModal;
