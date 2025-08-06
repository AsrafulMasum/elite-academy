import { DatePicker, Modal, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { imageUrl } from "../../redux/api/baseApi";
import {
  useAddCourseMutation,
  useUpdateCourseMutation,
} from "../../redux/features/courseApi";
import { useGetCoachQuery } from "../../redux/features/usersApi";

import dayjs from "dayjs";
import { ImSpinner9 } from "react-icons/im";

const AddCourseModal = ({
  open,
  setOpenAddModel,
  editData,
  setEditData,
  refetch,
}) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    couch: "",
    startDate: "",
    endDate: "",
  });

  const [addCourse, { isLoading }] = useAddCourseMutation();
  const [updateCourse, { isLoading: updating }] = useUpdateCourseMutation();
  const { data: coachData, isLoading: coachLoading } = useGetCoachQuery({});

  useEffect(() => {
    if (editData) {
      setForm({
        name: editData?.name,
        description: editData?.description,
        couch: editData?.couch?._id,
        startDate: editData?.endDate,
        endDate: editData?.endDate,
      });
    }
  }, [editData]);

  const handleAdd = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setForm((prev) => ({ ...prev, [name]: date?.toISOString() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editData) {
        const res = await updateCourse({ ...form, id: editData?._id }).unwrap();
        if (res?.success) {
          toast.success("Course Update successfully");
          setForm({
            name: "",
            description: "",
            couch: "",
            startDate: "",
            endDate: "",
          });
          setOpenAddModel(false);
          setEditData(null);
          refetch();
        }
      } else {
        const res = await addCourse(form).unwrap();
        if (res?.success) {
          toast.success("Course added successfully");
          setForm({
            name: "",
            description: "",
            couch: "",
            startDate: "",
            endDate: "",
          });
          setOpenAddModel(false);
          refetch();
        }
      }
    } catch (error) {
      console.error("Add course failed", error);
      toast.error("Failed to add course");
    }
  };

  const handleClose = () => {
    setOpenAddModel(false);
    setEditData(null);
    setForm({
      name: "",
      description: "",
      couch: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <Modal
      centered
      open={open}
      onCancel={handleClose}
      width={700}
      footer={false}
    >
      <div className="p-6 rounded-lg">
        <h1 className="text-[20px] font-medium mb-3 text-black">
          {editData ? "Edit" : "Add"} Course
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="text-gray-500 mb-1 block">Course Title</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleAdd}
              placeholder="Enter course title"
              className="w-full border border-[#E0E4EC] bg-white rounded-lg px-4 py-2 h-[52px] outline-none"
            />
          </div>

          {/* Coach */}
          <div className="mb-4">
            <label className="text-gray-500 mb-1 block">Coach</label>
            {coachLoading ? (
              <Spin />
            ) : (
              <Select
                showSearch
                //
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, couch: value }))
                }
                value={form?.couch}
                placeholder="Select a coach"
                className="w-full h-[52px]"
              >
                {coachData?.data?.map((coach) => (
                  <Select.Option
                    key={coach._id}
                    value={coach._id}
                    label={coach.name}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          coach?.image?.startsWith("http")
                            ? coach.image
                            : `${imageUrl}${coach.image}`
                        }
                        alt={coach.name}
                        className="w-6 h-6 object-cover rounded-full"
                      />
                      <span>{coach.name}</span>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            )}
          </div>

          {/* Dates */}
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="text-gray-500 mb-1 block">Start Date</label>
              <DatePicker
                className="w-full h-[52px]"
                style={{ borderRadius: 8 }}
                onChange={(date) => handleDateChange("startDate", date)}
                format="YYYY-MM-DD"
                value={form.startDate ? dayjs(form.startDate) : null}
              />
            </div>
            <div className="w-1/2">
              <label className="text-gray-500 mb-1 block">End Date</label>
              <DatePicker
                className="w-full h-[52px]"
                style={{ borderRadius: 8 }}
                onChange={(date) => handleDateChange("endDate", date)}
                format="YYYY-MM-DD"
                value={form.endDate ? dayjs(form.endDate) : null}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="text-gray-500 mb-1 block">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleAdd}
              placeholder="Course description"
              className="w-full border border-[#E0E4EC] bg-white rounded-lg px-4 py-2 h-[100px] outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#2E7A8A] px-6 py-3 w-full text-[#FEFEFE] rounded-lg flex items-center justify-center gap-2"
          >
            {isLoading ||
              (updating && <ImSpinner9 size={20} className="animate-spin" />)}
            {isLoading || updating ? "Uploading" : "Upload"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddCourseModal;
