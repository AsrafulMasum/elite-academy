import { Form, Input, Modal, Select } from "antd";
import { useAddAdminMutation } from "../../redux/features/usersApi";
import toast from "react-hot-toast";
const { Option } = Select;

const AddAdminModal = ({ openAddModel, setOpenAddModel, refetch }) => {
  const [form] = Form.useForm();
  const [addAdmin] = useAddAdminMutation();

  const handleAddAdmin = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      const res = await addAdmin(values).unwrap();
      console.log(res);
      if (res?.success) {
        setOpenAddModel(false);
        toast.success(res?.message);
        refetch();
      }
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  return (
    <Modal
      centered
      open={openAddModel}
      onCancel={() => {
        setOpenAddModel(false);
      }}
      width={500}
      footer={false}
    >
      <div className="p-6">
        <h1
          className="font-semibold text-black text-xl"
          style={{ marginBottom: "12px" }}
        >
          {`Add new Admin`}
        </h1>

        <Form form={form}>
          <div>
            <p className="text-[#6D6D6D] py-1">Name</p>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input Name",
                },
              ]}
            >
              <Input
                className="w-[100%] border outline-none px-3 py-[10px]"
                type="text"
              />
            </Form.Item>
          </div>
          <div>
            <p className="text-[#6D6D6D] py-1">Email </p>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input email",
                },
              ]}
            >
              <Input
                className="w-[100%] border outline-none px-3 py-[10px]"
                type="text"
              />
            </Form.Item>
          </div>
          <div>
            <p className="text-[#6D6D6D] py-1">Contact No </p>
            <Form.Item
              name="contact"
              rules={[
                {
                  required: true,
                  message: "Please input Contact No.",
                },
              ]}
            >
              <Input
                className="w-[100%] border outline-none px-3 py-[10px]"
                type="number"
              />
            </Form.Item>
          </div>
          <div style={{ width: "100%" }}>
            <p className="text-[#6D6D6D] py-1">Designation </p>
            <Form.Item name="role">
              <Select
                placeholder="Select admin designation"
                style={{
                  width: "100%",
                  height: 40,
                }}
              >
                <Option value="SUPER_ADMIN">SUPER_ADMIN</Option>
                <Option value="ADMIN">ADMIN</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="mt-5">
            <p className="text-[#6D6D6D] py-1">Password </p>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input Package Name",
                },
              ]}
            >
              <Input.Password
                className="w-[100%] border outline-none px-3 py-[10px]"
                type="text"
              />
            </Form.Item>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={handleAddAdmin}
              className="bg-action px-6 py-3 w-full text-[#FEFEFE] rounded-md"
            >
              Create Admin
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddAdminModal;
