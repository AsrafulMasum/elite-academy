import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Table,
  DatePicker,
} from "antd";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import moment from "moment";
import {
  useAddCouponMutation,
  useDeleteCouponMutation,
  useGetCouponsQuery,
  useUpdateCouponMutation,
} from "../../redux/features/couponsApi";
import { ImSpinner9 } from "react-icons/im";

const Coupon = () => {
  const [openAddModal, setOpenAddModel] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [page, setPage] = useState(1);

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const { data, refetch, isLoading } = useGetCouponsQuery();
  const [addCoupon, { isLoading: isAddLoading }] = useAddCouponMutation();
  const [updateCoupon, { isLoading: isEditLoading }] =
    useUpdateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  useEffect(() => {
    if (selectedCoupon) {
      editForm.setFieldsValue({
        name: selectedCoupon?.name,
        discount: selectedCoupon?.discount,
        expiry: moment(selectedCoupon?.expiry),
      });
    }
  }, [selectedCoupon, editForm]);

  const handleDelete = async (id) => {
    try {
      const res = await deleteCoupon({ id });
      if (res?.data?.success) {
        toast.success("Coupon deleted successfully");
        refetch();
      } else {
        toast.error(res?.error?.data?.message || "Failed to delete");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setShowDelete(false);
      setDeleteId("");
    }
  };

  const handleAddCoupon = async (values) => {
    const payload = {
      ...values,
      expiry: values.expiry.toISOString(),
    };

    try {
      const res = await addCoupon({ payload });
      if (res?.data?.success) {
        toast.success("Coupon added successfully");
        form.resetFields();
        setOpenAddModel(false);
        refetch();
      } else {
        toast.error(res?.error?.data?.message || "Failed to add");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleUpdateCoupon = async (values) => {
    const payload = {
      body: {
        ...values,
        expiry: values.expiry.toISOString(),
      },
      id: selectedCoupon?._id,
    };
    try {
      const res = await updateCoupon(payload);
      if (res?.data?.success) {
        toast.success("Coupon updated successfully");
        editForm.resetFields();
        setOpenEditModal(false);
        setSelectedCoupon(null);
        refetch();
      } else {
        toast.error(res?.error?.data?.message || "Failed to update");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const columns = [
    {
      title: "Serial No.",
      key: "serial",
      render: (_, __, index) => (
        <span className="text-[#FDFDFD]">{index + 1}</span>
      ),
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Expires Date",
      dataIndex: "expiry",
      key: "expiry",
      render: (text) => (
        <span className="text-[#FDFDFD]">
          {moment(text).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex items-center justify-center gap-2 pr-4">
          <button
            onClick={() => {
              setSelectedCoupon(record);
              setOpenEditModal(true);
            }}
            className="w-10 h-8 flex justify-center items-center rounded-md bg-[#121212]"
          >
            <FiEdit size={16} className="text-secondary" />
          </button>
          <button
            onClick={() => {
              setDeleteId(record._id);
              setShowDelete(true);
            }}
            className="w-10 h-8 flex justify-center items-center rounded-md bg-[#121212]"
          >
            <RiDeleteBin6Line size={20} className="text-secondary" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-full bg-[#13333A]">
      <div style={{ borderRadius: "8px" }}>
        {/* Header */}
        <div className="flex justify-between items-center mx-4 py-4">
          <h3 className="text-[#FDFDFD] text-[18px] font-medium leading-[24px]">
            Coupons
          </h3>
          <Button
            onClick={() => setOpenAddModel(true)}
            style={{
              width: "177px",
              height: "40px",
              boxShadow: "0px 2px 4px 0px #0000001A",
              backgroundColor: "#2E7A8A",
              border: "none",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <PlusOutlined />
            Add Coupon
          </Button>
        </div>

        {/* Table */}
        <ConfigProvider
          theme={{
            components: {
              Pagination: {
                itemActiveBg: "#FFC107",
                borderRadius: "100%",
                colorText: "white",
                colorTextDisabled: "#6C6C6C",
              },
              Table: {
                rowHoverBg: "#13333A",
              },
            },
            token: {
              colorPrimary: "#13333A",
            },
          }}
        >
          <Table
            size="small"
            rowKey="_id"
            dataSource={data?.data}
            columns={columns}
            loading={isLoading}
            pagination={{
              current: page,
              pageSize: 12,
              total: data?.data?.length,
              onChange: (page) => setPage(page),
            }}
          />
        </ConfigProvider>
      </div>

      {/* Delete Modal */}
      <Modal
        centered
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        width={400}
        footer={false}
      >
        <div className="p-6 text-center">
          <p className="text-[#D93D04] font-semibold">Are you sure!</p>
          <p className="pt-4 pb-12">Do you want to delete this coupon?</p>
          <button
            onClick={() => handleDelete(deleteId)}
            className="bg-[#2E7A8A] py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>

      {/* Add Coupon Modal */}
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
          onCancel={() => setOpenAddModel(false)}
          footer={false}
        >
          <div style={{ padding: "24px" }}>
            <h2 className="text-xl font-medium mb-4">Add Coupon</h2>
            <Form layout="vertical" form={form} onFinish={handleAddCoupon}>
              <Form.Item
                label="Coupon Title"
                name="name"
                rules={[
                  { required: true, message: "Please enter a coupon code" },
                ]}
              >
                <Input className="h-[52px]" />
              </Form.Item>
              <Form.Item
                label="Discount"
                name="discount"
                rules={[
                  { required: true, message: "Enter discount (e.g. 10%)" },
                ]}
              >
                <Input className="h-[52px]" />
              </Form.Item>
              <Form.Item
                label="Expiry Date"
                name="expiry"
                rules={[{ required: true, message: "Select expiry date" }]}
              >
                <DatePicker style={{ width: "100%" }} className="h-[52px]" />
              </Form.Item>
              <button
                type="submit"
                className="bg-[#2E7A8A] px-6 py-3 w-full text-[#FEFEFE] rounded-lg flex items-center justify-center gap-2"
              >
                {isAddLoading && (
                  <ImSpinner9 size={20} className="animate-spin" />
                )}
                {isAddLoading ? "Uploading" : "Upload"}
              </button>
            </Form>
          </div>
        </Modal>
      </ConfigProvider>

      {/* Edit Coupon Modal */}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#13333A",
          },
        }}
      >
        <Modal
          centered
          open={openEditModal}
          onCancel={() => setOpenEditModal(false)}
          footer={false}
        >
          <div style={{ padding: "24px" }}>
            <h2 className="text-xl font-medium mb-4">Edit Coupon</h2>
            <Form
              layout="vertical"
              form={editForm}
              onFinish={handleUpdateCoupon}
            >
              <Form.Item
                label="Coupon Title"
                name="name"
                rules={[
                  { required: true, message: "Please enter a coupon code" },
                ]}
              >
                <Input className="h-[52px]" />
              </Form.Item>
              <Form.Item
                label="Discount"
                name="discount"
                rules={[{ required: true, message: "Enter discount" }]}
              >
                <Input className="h-[52px]" />
              </Form.Item>
              <Form.Item
                label="Expiry Date"
                name="expiry"
                rules={[{ required: true, message: "Select expiry date" }]}
              >
                <DatePicker style={{ width: "100%" }} className="h-[52px]" />
              </Form.Item>
              <button
                type="submit"
                className="bg-[#2E7A8A] px-6 py-3 w-full text-[#FEFEFE] rounded-lg flex items-center justify-center gap-2"
              >
                {isEditLoading && (
                  <ImSpinner9 size={20} className="animate-spin" />
                )}
                {isEditLoading ? "Uploading" : "Upload"}
              </button>
            </Form>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default Coupon;
