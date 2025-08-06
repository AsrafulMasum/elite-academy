import { Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiImageOn } from "react-icons/ci";
import { ImSpinner9 } from "react-icons/im";

import { imageUrl } from "../../redux/api/baseApi";
import { useAddCoachMutation } from "../../redux/features/usersApi";

const AddCoachModal = ({ openAddModel, setOpenAddModel, refetch }) => {
  const [imgURL, setImgURL] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [addCoach, { isLoading }] = useAddCoachMutation();
  const [form] = useForm();

  const handleAddCoach = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values?.name);
      formData.append("email", values?.email);
      formData.append("password", values?.password);
      formData.append("role", "COUCH");

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await addCoach(formData);

      if (res?.data) {
        refetch();
        form.resetFields();
        setImgURL(null);
        setImageFile(null);
        toast.success(res?.data?.message || "Coach added successfully");
        setOpenAddModel(false);
      }

      if (res?.error) {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.error("Error adding coach:", error);
    }
  };

  return (
    <Modal
      centered
      open={openAddModel}
      onCancel={() => {
        setOpenAddModel(false);
        setImgURL(null);
        setImageFile(null);
        form.resetFields();
      }}
      width={500}
      footer={false}
    >
      <div className="p-6">
        <h1 className="font-semibold text-black text-xl mb-3">Add Coach</h1>

        <Form form={form} onFinish={handleAddCoach}>
          <div>
            <p className="text-[#6D6D6D] py-1">Image</p>
            <Form.Item name="image">
              <div className="flex justify-center items-center gap-10">
                <div className="h-32 w-full flex items-center justify-center bg-gray-300 rounded-lg relative">
                  <div className="p-4">
                    {imgURL ? (
                      <img
                        src={imgURL}
                        alt="preview"
                        className="h-32 w-44 object-cover rounded-md p-2"
                      />
                    ) : (
                      <CiImageOn className="text-5xl text-[#121212] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-50"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImgURL(URL.createObjectURL(file));
                        setImageFile(file);
                      }
                    }}
                  />
                </div>
              </div>
            </Form.Item>

            <p className="text-[#6D6D6D] py-1">Name</p>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input name" }]}
            >
              <Input
                className="w-full border px-3 py-[10px]"
                placeholder="Coach Name"
              />
            </Form.Item>

            <p className="text-[#6D6D6D] py-1">Email</p>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input email" },
                { type: "email", message: "Invalid email address" },
              ]}
            >
              <Input
                className="w-full border px-3 py-[10px]"
                placeholder="Email"
              />
            </Form.Item>

            <p className="text-[#6D6D6D] py-1">Password</p>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input password" }]}
            >
              <Input.Password
                className="w-full border px-3 py-[10px]"
                placeholder="Password"
              />
            </Form.Item>
          </div>

          <div className="text-center mt-6">
            <button className="bg-[#2E7A8A] px-6 py-3 w-full text-white rounded-md flex items-center justify-center gap-2">
              {isLoading && <ImSpinner9 size={20} className="animate-spin" />}
              Add Coach
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddCoachModal;
