import { DatePicker, Modal } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { TimePicker } from "antd/es";
import { useGetCoursesQuery } from "../../redux/features/courseApi";

const AddSessionModal = ({ openAddModal, setOpenAddModal }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    couch: "",
    startDate: "",
    endDate: "",
  });
  const { data } = useGetCoursesQuery();
  const courseOptions = data?.data?.map((course) => ({
    name: course.name,
    id: course._id,
  }));

  //   useEffect(() => {
  //     if (editData) {
  //       setForm({
  //         name: editData?.name,
  //         description: editData?.description,
  //         couch: editData?.couch?._id,
  //         startDate: editData?.endDate,
  //         endDate: editData?.endDate,
  //       });
  //     }
  //   }, [editData]);

  const onChange = (time, timeString) => {
    console.log(time, timeString);
  };

  const handleAdd = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setForm((prev) => ({ ...prev, [name]: date?.toISOString() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   if (editData) {
    //     const res = await updateCourse({ ...form, id: editData?._id }).unwrap();
    //     if (res?.success) {
    //       toast.success("Course Update successfully");
    //       setForm({
    //         name: "",
    //         description: "",
    //         couch: "",
    //         startDate: "",
    //         endDate: "",
    //       });
    //       setOpenAddModel(false);
    //       setEditData(null);
    //       refetch();
    //     }
    //   } else {
    //     const res = await addCourse(form).unwrap();
    //     if (res?.success) {
    //       toast.success("Course added successfully");
    //       setForm({
    //         name: "",
    //         description: "",
    //         couch: "",
    //         startDate: "",
    //         endDate: "",
    //       });
    //       setOpenAddModel(false);
    //       refetch();
    //     }
    //   }
    // } catch (error) {
    //   console.error("Add course failed", error);
    //   toast.error("Failed to add course");
    // }
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={() => setOpenAddModal(false)}
      width={400}
      footer={false}
    >
      <div className="p-6 bg-action rounded-lg">
        <h1 className="text-[20px] font-medium mb-3 text-white">Add Session</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{ display: "block", marginBottom: "5px", color: "white" }}
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
            <label className="text-white mb-1 block">Course Title</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleAdd}
              placeholder="Enter course title"
              className="w-full border border-[#E0E4EC] bg-white rounded-lg px-4 py-2 h-[52px] outline-none"
            />
          </div>

          {/* Dates */}
          <div className="flex gap-4 mb-4 w-full">
            <div>
              <label className="text-white mb-1 block">Date</label>
              <DatePicker
                className="w-full h-[52px]"
                style={{ borderRadius: 8 }}
                onChange={(date) => handleDateChange("startDate", date)}
                format="YYYY-MM-DD"
                value={form.startDate ? dayjs(form.startDate) : null}
              />
            </div>
          </div>

          <div className="w-full flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="text-white mb-1 block">Start Time</label>
              <TimePicker
                className="h-[52px]"
                onChange={onChange}
                needConfirm
              />
            </div>
            <div className="w-1/2">
              <label className="text-white mb-1 block">End Time</label>
              <TimePicker
                className="h-[52px]"
                onChange={onChange}
                needConfirm
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#13333A] text-white rounded-lg py-2 h-[44px] mt-2"
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddSessionModal;
