import { Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { useAddCoachMutation } from "../../redux/features/usersApi";

const AddCoachModal = ({ openAddModel, setOpenAddModel, refetch }) => {
  const [addCoach, { isLoading }] = useAddCoachMutation();
  const [form] = useForm();

  const handleAddCoach = async (values) => {
    try {
      const res = await addCoach(values);

      if (res?.data) {
        refetch();
        form.resetFields();
        toast.success(res?.data?.message);
        setOpenAddModel(false);
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
        form.resetFields();
      }}
      width={500}
      footer={false}
    >
      <div className="p-6">
        <h1 className="font-semibold text-black text-xl mb-3">Add Coach</h1>

        <Form form={form} onFinish={handleAddCoach}>
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
