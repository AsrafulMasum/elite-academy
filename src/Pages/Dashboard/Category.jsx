import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Modal, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { PiTrashLight } from "react-icons/pi";

import { RiDeleteBin6Line } from "react-icons/ri";
import AddCategoryModal from "../../Components/Dashboard/AddCategoryModal";
import AddSubCategoryModal from "../../Components/Dashboard/AddSubcategoryModal";
import UserDetailsModal from "../../Components/Dashboard/UserDetailsModal";
import { imageUrl } from "../../redux/api/baseApi";
import {
  useDeleteCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetCategoriesQuery
} from "../../redux/features/categoriesApi";

const data = [
  {
    _id: "1",
    serial: 1,
    category: "Dental care",
  },
  {
    _id: "2",
    serial: 2,
    category: "Dental care",
  },
  {
    _id: "3",
    serial: 3,
    category: "Dental care",
  },
  {
    _id: "4",
    serial: 4,
    category: "Dental care",
  },
  {
    _id: "5",
    serial: 5,
    category: "Dental care",
  },
  {
    _id: "6",
    serial: 6,
    category: "Dental care",
  },
  {
    _id: "7",
    serial: 7,
    category: "Dental care",
  },
  {
    _id: "8",
    serial: 8,
    category: "Dental care",
  },
  {
    _id: "9",
    serial: 9,
    category: "Dental care",
  },
  {
    _id: "10",
    serial: 10,
    category: "Dental care",
  },
  {
    _id: "11",
    serial: 11,
    category: "Dental care",
  },
  {
    _id: "12",
    serial: 12,
    category: "Dental care",
  },
  {
    _id: "13",
    serial: 13,
    category: "Dental care",
  },
  {
    _id: "14",
    serial: 14,
    category: "Dental care",
  },
  {
    _id: "15",
    serial: 1,
    category: "Dental care",
  },
];

const Category = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openAddModel, setOpenAddModel] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editData, setEditData] = useState(null);

  const [showSubModal, setShowSubModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);


  const [openSubCategory, setOpenSubCategory] = useState(false);  

  const dropdownRef = useRef();
  const [form] = Form.useForm();

  const {data:categoryData, isLoading, refetch} = useGetCategoriesQuery(page);
  const [deleteCategory] = useDeleteCategoryMutation();
  const [deleteSubCategory] = useDeleteSubCategoryMutation()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // -------------------- Action -----------------------

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      setOpenEditModal(false);
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteCategory(deleteId);
            
      if(res?.data) {
        toast.success(res?.data?.message);        
        refetch();
        setShowDelete(false);
      }
    } catch (error) {
      setShowDelete(false);
    }
  };

  const handleDeleteSubCategory = async (id) =>{
    try {
      const res = await deleteSubCategory(id)
      if(res?.data){
        refetch()
        toast.success("Delete Sub Category");
        setEditData(null);
        setShowSubModal(false)
      }
    } catch (error) {
      
    }
  }
  
  // ------------------------- Table Column  --------------------
  const columns = [
    {
      title: "Sl. No",
      dataIndex: "serial",
      key: "serial",
      align: "left",
      width: "100px",
      render: (text) => <span style={{ color: "#FDFDFD" }}>#{text}</span>,
    },
    {
      title: "Category Name",
      // dataIndex: "title",
      key: "title",
      align: "left",
      render: (record) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12">
            <img
              src={`${imageUrl}${record?.image}`}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <span style={{ color: "#FDFDFD" }}>{record?.title}</span>
        </div>
      ),
    },
    {
      title: "Sub-Category Name",
      key: "Sub category",
      align: "left",
      render: (_, record) => (
        <>          
          {record?.subcategories?.slice(0, 5).map((sCategory) => (
            <span style={{ color: "#FDFDFD" }}>{sCategory?.name}, </span>
          ))}

          {record?.subcategories?.length > 0  && <span
            onClick={() => {
              setSelectedCategory(record);
              setShowSubModal(true);
            }}
            className="ml-2 capitalize text-yellow-500 font-semibold cursor-pointer text-xs"
          >
            see more...
          </span>}
          {record?.subcategories?.length < 1 && <span className="text-white text-center ml-16">-</span>}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "right",
      className: "action-column",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
            paddingRight: "46px",
          }}
        >
          <button
            onClick={() => {
              setOpenSubCategory(true);
              setEditData(record);              
            }}
            className="bg-[#000000] w-10 h-8 flex justify-center items-center rounded-md"
          >
            <IoMdAdd size={20} className="text-secondary" />
          </button>

          <button
            onClick={() => {
              setOpenAddModel(true);              
              setEditData(record);
            }}
            className="bg-[#000000] w-10 h-8 flex justify-center items-center rounded-md"
          >
            <FiEdit size={20} className="text-secondary" />
          </button>

          <button
            onClick={() => {
              setShowDelete(true);
              setDeleteId(record?._id);
            }}
            className="bg-[#000000] w-10 h-8 flex justify-center items-center rounded-md"
          >
            <RiDeleteBin6Line size={20} className="text-secondary" />
          </button>
        </div>
      ),
    },
  ];
  

  return (
    <div className="h-full">
      <div
        style={{
          background: "#13333A",
          borderRadius: "12px",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 16px",
          }}
        >
          <h3
            style={{
              color: "#FDFDFD",
              fontSize: 18,
              fontWeight: "500",
              lineHeight: "24px",
            }}
          >
            Add Category
          </h3>

          <div>
            <Button
              onClick={() => setOpenAddModel(true)}
              style={{
                width: "151px",
                height: "40px",
                boxShadow: "0px 2px 4px 0px #0000001A",
                backgroundColor: "#2E7A8A",
                border: "none",
                transition: "none",
                color: "#FDFDFD",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <PlusOutlined />
              <span style={{ margin: 0 }}>Add Category</span>
            </Button>
          </div>
        </div>
        <div className="relative">
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
              columns={columns}
              dataSource={categoryData?.data}
              loading={isLoading}
              pagination={{
                total: categoryData?.pagination?.total,
                current: page,
                pageSize: categoryData?.pagination?.limit,
                onChange: (page) => setPage(page),
              }}
            />
          </ConfigProvider>
        </div>
      </div>
      <UserDetailsModal open={open} setOpen={setOpen} />

      <AddCategoryModal
        openAddModel={openAddModel}
        setOpenAddModel={setOpenAddModel}
        editData={editData}
        setEditData={setEditData}
        refetch={refetch}
      />

      <AddSubCategoryModal 
      openSubCategory={openSubCategory}
      setOpenSubCategory={setOpenSubCategory}
      category={editData?._id}
      setEditData={setEditData}
      refetch={refetch}
      />

      {/* <Modal
        centered
        open={openEditModal}
        onCancel={() => {
          setOpenEditModal(false);
        }}
        width={500}
        footer={false}
      >
        <div className="p-6 ">
          <h1
            className="font-semibold text-black text-xl"
            style={{ marginBottom: "12px" }}
          >
            {`Edit Category`}
          </h1>

          <Form form={form}>
            <div>
              <p className="text-[#6D6D6D] py-1">Category Name</p>
              <Form.Item
                name="categoryName"
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
              <button
                onClick={handleUpdate}
                className="bg-[#BB6D42] px-6 py-3 w-full text-[#FEFEFE] rounded-md"
              >
                Edit Category
              </button>
            </div>
          </Form>
        </div>
      </Modal> */}

      <Modal
        centered
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        width={400}
        footer={false}
      >
        <div className="p-6 text-center">
          <p className="text-[#D93D04] text-center font-semibold">
            Are you sure !
          </p>
          <p className="pt-4 pb-12 text-center">
            Do you want to delete this content ?
          </p>
          <button
            onClick={handleDelete}
            className="bg-[#BB6D42] py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>

      {/* ------------------------ Sub Category View Modal ------------- */}
      <Modal
        centered
        open={showSubModal}
        onCancel={() => setShowSubModal(false)}
        footer={null}
        width={500}
        className="subcategory-modal"
      >
        <div className="p-6 rounded-lg bg-white shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            {selectedCategory?.title}
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Subcategories under this category
          </p>

          <div className="max-h-60 overflow-y-auto px-4">
            <ul className="grid grid-cols-1 gap-3">
              {selectedCategory?.subcategories?.map((item, idx) => (
                <li
                  key={idx}
                  className="py-2 px-4 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition flex items-center justify-between"
                >
                  <span>{idx + 1}. {item?.name}</span> 
                  <PiTrashLight onClick={()=>handleDeleteSubCategory(item?._id)} size={20} className="hover:text-red-600 cursor-pointer" />
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => setShowSubModal(false)}
              className="bg-[#2E7A8A] hover:bg-[#225e6a] text-white px-6 py-2 rounded-md font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Category;
