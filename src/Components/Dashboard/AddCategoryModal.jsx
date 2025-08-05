import { ConfigProvider, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiImageOn } from "react-icons/ci";

import { ImSpinner9 } from "react-icons/im";
import { imageUrl } from "../../redux/api/baseApi";
import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from "../../redux/features/categoriesApi";

const AddCategoryModal = ({
  openAddModel,
  setOpenAddModel,
  editData,
  setEditData,
  refetch,
}) => {
  const [imgURL, setImgURL] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();

  const [form] = useForm();

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({ title: editData?.title });
    }
  }, [editData]);

  const handleAddCategory = async (values) => {
    try {
      const formData = new FormData();

      formData.append("title", values?.title);
      if (imageFile && imageFile.length > 0) {
        imageFile.forEach((file) => {
          formData.append("image", file);
        });
      }
      formData.append("image", imageFile);

      if (editData) {
        const res = await updateCategory({ id: editData?._id, formData });
        if (res?.data) {
          refetch();
          form.resetFields();
          setImgURL(null);
          setImageFile(null);

          toast.success(res?.data?.message);
          setOpenAddModel(false);
        }
      } else {
        const res = await addCategory(formData);
        if (res?.data) {
          refetch();
          form.resetFields();
          setImgURL(null);
          setImageFile(null);

          toast.success(res?.data?.message);
          setOpenAddModel(false);
        }
      }
    } catch (error) {
      console.log("Validation Failed:", error);
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
        open={openAddModel}
        onCancel={() => {
          setOpenAddModel(!openAddModel);
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
            {`${editData ? "Edit" : "Add"} Category`}
          </h1>

          <Form form={form} onFinish={handleAddCategory}>
            <div>
              <p className="text-[#6D6D6D] py-1">Image</p>
              <Form.Item
                name="image"
                rules={[
                  {
                    required: false,
                    message: "Please upload an image",
                  },
                ]}
              >
                <div className="flex justify-center items-center gap-10 mb-10">
                  <div className="h-32 w-full flex items-center justify-center bg-gray-300 rounded-lg relative">
                    <div className="p-4">
                      {imgURL || editData?.image ? (
                        <>
                          {imgURL ? (
                            <img
                              src={imgURL}
                              alt="preview"
                              className="h-32 w-44 object-cover rounded-md p-2"
                            />
                          ) : (
                            <img
                              src={
                                editData?.image?.startsWith("http")
                                  ? editData?.image
                                  : editData?.image
                                  ? `${imageUrl}${editData?.image}`
                                  : "/default-avatar.jpg"
                              }
                              alt={`preview-`}
                              className="h-32 w-44 rounded-lg object-cover z-[99] p-2"
                            />
                          )}
                        </>
                      ) : (
                        <CiImageOn className="text-5xl text-[#121212] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </div>

                    <input
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setImgURL(URL.createObjectURL(file));
                          setImageFile(file);
                        }
                      }}
                      type="file"
                      id="img"
                      name="image"
                      accept="image/*"
                      className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-50"
                    />
                  </div>
                </div>
              </Form.Item>

              <p className="text-[#6D6D6D] py-1">Category Name</p>
              <Form.Item
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input Package Name",
                  },
                ]}
              >
                <Input
                  className="w-[100%] border outline-none px-3 py-[10px]"
                  type="text"
                />
              </Form.Item>
            </div>

            <div className="text-center mt-6">
              <button className="bg-[#2E7A8A] px-6 py-3 w-full text-[#FEFEFE] rounded-md flex items-center justify-center gap-2">
                {(isLoading || updating) && (
                  <ImSpinner9 size={20} className="animate-spin" />
                )}
                {editData ? "Edit" : "Add"} Category
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default AddCategoryModal;
