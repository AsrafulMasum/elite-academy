import { Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiImageOn } from "react-icons/ci";
import {
  useAddCategoryMutation,
  useAddSubCategoryMutation,
  useUpdateCategoryMutation,
} from "../../redux/features/categoriesApi";
import { ImSpinner9 } from "react-icons/im";
import { imageUrl } from "../../redux/api/baseApi";

const AddSubCategoryModal = ({
  openSubCategory,
  setOpenSubCategory,
  category,
  refetch,
}) => {
  const [addSubCategory, { isLoading }] = useAddSubCategoryMutation();

  const [form] = useForm();

  const handleAddSubCategory = async (values) => {
    try {

      const res = await addSubCategory({ ...values, category });
      if(res?.data) {
        refetch();
        form.resetFields();

        toast.success(res?.data?.message);
        setOpenSubCategory(false);
      }
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  return (
    <Modal
      centered
      open={openSubCategory}
      onCancel={() => {
        setOpenSubCategory(!openSubCategory);
        setEditData(null);
        setImgURL(null);
        form.resetFields();
      }}
      width={500}
      footer={false}
    >
      <div className="p-6 ">
        <h1
          className="font-semibold text-black text-xl"
          style={{ marginBottom: "12px" }}
        >
          Add Sub-Category
        </h1>

        <Form form={form} onFinish={handleAddSubCategory}>
          <p className="text-[#6D6D6D] py-1">Sub Category Name</p>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input Sub Category Name",
              },
            ]}
          >
            <Input
              className="w-[100%] border outline-none px-3 py-[10px]"
              type="text" placeholder="Enter Sub-Category Name"
            />
          </Form.Item>
          <div className="text-center mt-6">
            <button className="bg-[#2E7A8A] px-6 py-3 w-full text-[#FEFEFE] rounded-md flex items-center justify-center gap-2">
              {isLoading && <ImSpinner9 size={20} className="animate-spin" />}{" "}
              Add Sub-Category
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddSubCategoryModal;
