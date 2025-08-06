import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, Modal, Table } from "antd";
import { CiImageOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import {
  useAddTopicMutation,
  useDeleteTopicMutation,
  useGetTopicsQuery,
  useUpdateTopicMutation,
} from "../../redux/features/topicsApi";
import { imageUrl } from "../../redux/api/baseApi";
import { ImSpinner9 } from "react-icons/im";

const Topics = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [page, setPage] = useState(1);

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const { data, refetch, isLoading } = useGetTopicsQuery();
  const [addTopic, { isLoading: isAddLoading }] = useAddTopicMutation();
  const [updateTopic, { isLoading: isEditLoading }] = useUpdateTopicMutation();
  const [deleteTopic] = useDeleteTopicMutation();

  // State for preview image and file for Add
  const [addImgURL, setAddImgURL] = useState(null);
  const [addImageFile, setAddImageFile] = useState(null);

  // State for preview image and file for Edit
  const [editImgURL, setEditImgURL] = useState(null);
  const [editImageFile, setEditImageFile] = useState(null);

  useEffect(() => {
    if (selectedTopic) {
      editForm.setFieldsValue({
        name: selectedTopic?.title,
      });
      setEditImgURL(null);
      setEditImageFile(null);
    }
  }, [selectedTopic, editForm]);

  const handleDelete = async (id) => {
    try {
      const res = await deleteTopic({ id });
      if (res?.data?.success) {
        toast.success("Topic deleted successfully");
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

  const handleAddTopic = async (values) => {
    if (!addImageFile) {
      toast.error("Please upload an image");
      return;
    }
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("image", addImageFile);

    try {
      const res = await addTopic(formData);
      if (res?.data?.success) {
        toast.success("Topic added successfully");
        form.resetFields();
        setAddImgURL(null);
        setAddImageFile(null);
        setOpenAddModal(false);
        refetch();
      } else {
        toast.error(res?.error?.data?.message || "Failed to add");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleUpdateTopic = async (values) => {
    const formData = new FormData();
    formData.append("title", values.name);
    if (editImageFile) {
      formData.append("image", editImageFile);
    }

    try {
      const res = await updateTopic({
        id: selectedTopic?._id,
        body: formData,
      });
      if (res?.data?.success) {
        toast.success("Topic updated successfully");
        editForm.resetFields();
        setEditImgURL(null);
        setEditImageFile(null);
        setOpenEditModal(false);
        setSelectedTopic(null);
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
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <img
          src={
            record?.image && record?.image.startsWith("http")
              ? record?.image
              : record?.image
              ? `${imageUrl}${record?.image}`
              : "/default-avatar.jpg"
          }
          alt="topic"
          style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 4 }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="text-[#FDFDFD]">{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex items-center justify-center gap-2 pr-4">
          <button
            onClick={() => {
              setSelectedTopic(record);
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
            Topics
          </h3>
          <Button
            onClick={() => setOpenAddModal(true)}
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
            Add Topic
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
          <p className="pt-4 pb-12">Do you want to delete this topic?</p>
          <button
            onClick={() => handleDelete(deleteId)}
            className="bg-[#2E7A8A] py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>

      {/* Add Topic Modal */}
      <ConfigProvider theme={{ token: { colorPrimary: "#13333A" } }}>
        <Modal
          centered
          open={openAddModal}
          onCancel={() => {
            setOpenAddModal(false);
            form.resetFields();
            setAddImgURL(null);
            setAddImageFile(null);
          }}
          footer={false}
        >
          <div style={{ padding: "24px" }}>
            <h2 className="text-xl font-medium mb-4">Add Topic</h2>
            <Form layout="vertical" form={form} onFinish={handleAddTopic}>
              <Form.Item
                label="Topic Name"
                name="title"
                rules={[{ required: true, message: "Please enter topic name" }]}
              >
                <Input placeholder="Topic Name" className="h-[52px]" />
              </Form.Item>

              <p className="text-[#6D6D6D] py-1">Image</p>
              <Form.Item
                name="image"
                rules={[{ required: false, message: "Please upload an image" }]}
              >
                <div className="flex justify-center items-center gap-10 mb-10">
                  <div className="h-32 w-full flex items-center justify-center bg-gray-300 rounded-lg relative">
                    <div className="p-4">
                      {addImgURL ? (
                        <img
                          src={addImgURL}
                          alt="preview"
                          className="h-32 w-44 object-cover rounded-md p-2"
                        />
                      ) : (
                        <CiImageOn className="text-5xl text-[#121212] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </div>

                    <input
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setAddImgURL(URL.createObjectURL(file));
                          setAddImageFile(file);
                        }
                      }}
                      type="file"
                      id="img-add"
                      name="image"
                      accept="image/*"
                      className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-50"
                    />
                  </div>
                </div>
              </Form.Item>

              <button
                type="submit"
                className="bg-[#2E7A8A] px-6 py-3 w-full text-[#FEFEFE] rounded-lg flex items-center justify-center gap-2"
              >
                {isAddLoading && <ImSpinner9 size={20} className="animate-spin" />}
                {isAddLoading ? "Uploading" : "Upload"}
              </button>
            </Form>
          </div>
        </Modal>
      </ConfigProvider>

      {/* Edit Topic Modal */}
      <ConfigProvider theme={{ token: { colorPrimary: "#13333A" } }}>
        <Modal
          centered
          open={openEditModal}
          onCancel={() => {
            setOpenEditModal(false);
            editForm.resetFields();
            setSelectedTopic(null);
            setEditImgURL(null);
            setEditImageFile(null);
          }}
          footer={false}
        >
          <div style={{ padding: "24px" }}>
            <h2 className="text-xl font-medium mb-4">Edit Topic</h2>
            <Form
              layout="vertical"
              form={editForm}
              onFinish={handleUpdateTopic}
            >
              <Form.Item
                label="Topic Name"
                name="name"
                rules={[{ required: true, message: "Please enter topic name" }]}
              >
                <Input className="h-[52px]" />
              </Form.Item>

              <p className="text-[#6D6D6D] py-1">
                Image (upload only if you want to change)
              </p>
              <Form.Item name="image" rules={[{ required: false }]}>
                <div className="flex justify-center items-center gap-10 mb-10">
                  <div className="h-32 w-full flex items-center justify-center bg-gray-300 rounded-lg relative">
                    <div className="p-4">
                      {editImgURL || selectedTopic?.image ? (
                        <>
                          {editImgURL ? (
                            <img
                              src={editImgURL}
                              alt="preview"
                              className="h-32 w-44 object-cover rounded-md p-2"
                            />
                          ) : (
                            <img
                              src={
                                selectedTopic?.image?.startsWith("http")
                                  ? selectedTopic.image
                                  : selectedTopic.image
                                  ? `${imageUrl}${selectedTopic.image}`
                                  : "/default-avatar.jpg"
                              }
                              alt="preview"
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
                          setEditImgURL(URL.createObjectURL(file));
                          setEditImageFile(file);
                        }
                      }}
                      type="file"
                      id="img-edit"
                      name="image"
                      accept="image/*"
                      className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-50"
                    />
                  </div>
                </div>
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

export default Topics;
