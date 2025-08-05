import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Modal, Table } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddProductsModal from "../../Components/Dashboard/AddProductsModal";
import EditProductsModal from "../../Components/Dashboard/EditProductsModal";
import { imageUrl } from "../../redux/api/baseApi";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../redux/features/productApi";
import { useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Products = () => {
  const limit = 10;
  // ----------------- Hooks ------------------------
  const [page, setPage] = useState(1);
  const [openAddModal, setOpenAddModel] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const [value, setValue] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";

  const {
    data: productData,
    isLoading,
    refetch,
  } = useGetProductsQuery({ searchTerm, page, limit });
  const [deleteProduct] = useDeleteProductMutation();
  // ----------------------- Action ------------------------
  // Handle search input change
  const handleSearchChange = (e) => {
    const newValue = e.target.value;

    const newParams = new URLSearchParams(searchParams);
    if (newValue) {
      newParams.set("searchTerm", newValue);
    } else {
      newParams.delete("searchTerm");
    }
    setSearchParams(newParams);
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteProduct(id);
      if (res?.data?.success) {
        toast.success("Deleted Product Successfully");
        refetch();
        setShowDelete(!showDelete);
        setDeleteId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ---------------- Table Column -------------------
  const columns = [
    {
      title: "Serial No.",
      key: "serial",
      render: (_, __, index) => (
        <span className="text-[#FDFDFD]">{index + 1}</span>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
      render: (title) => <span className="text-[#FDFDFD]">{title}</span>,
    },
    {
      title: "Product Images",
      dataIndex: "productImage",
      key: "productImage",
      render: (_, record) => {
        return (
          <img
            key={record?._id}
            src={
              record?.images && record?.images[0]?.startsWith("http")
                ? record?.images[0]
                : record?.images[0]
                ? `${imageUrl}${record?.images[0]}`
                : "/default-avatar.jpg"
            }
            alt={`Product ${record?._id}`}
            className="w-11 h-11 object-cover rounded border border-[#3F857B]"
          />
        );
      },
    },
    {
      title: "Product Id",
      dataIndex: "productId",
      key: "productId",
      render: (_, record) => (
        <span className="text-[#FDFDFD]">{record?._id}</span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <span style={{ color: "#FDFDFD" }}>{category?.title}</span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Stock",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <span style={{ color: "#FDFDFD" }}>{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record) => {
        let status = "";
        let statusClass = "";

        if (record.quantity === 0) {
          status = "Stock Out";
          statusClass = "bg-[#FC605726] text-[#FC6057]";
        } else if (record.quantity < 10) {
          status = "Short Stock";
          statusClass = "bg-yellow-100 text-yellow-700";
        } else {
          status = "In Stock";
          statusClass = "bg-[#2E7A8A] text-[#EBEBEB]";
        }

        return (
          <div className="pr-4">
            <p
              className={`w-24 rounded-md text-sm py-[2px] capitalize ${statusClass}`}
            >
              {status}
            </p>
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",

            paddingRight: 10,
          }}
        >
          <button
            className="flex justify-center items-center rounded-md"
            onClick={() => {
              setValue(record);
              setOpenEditModel(true);
            }}
            style={{
              cursor: "pointer",
              border: "none",
              outline: "none",
              backgroundColor: "#121212",
              width: "40px",
              height: "32px",
            }}
          >
            <FiEdit size={16} className="text-secondary" />
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
    <div className="w-full h-full bg-[#13333A]">
      <div
        style={{
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "0px 16px",
            padding: "16px 0px",
          }}
        >
          <div>
            <h3
              style={{
                color: "#FDFDFD",
                fontSize: 18,
                fontWeight: "500",
                lineHeight: "24px",
              }}
            >
              Products
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "350px",
                  height: "40px",
                  borderRadius: "8px",
                }}
              >
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#13333A",
                    },
                  }}
                >
                  <Input
                    placeholder="Search..."
                    onChange={handleSearchChange}
                    prefix={<FiSearch size={14} color="#868FA0" />}
                    style={{
                      width: "100%",
                      height: "100%",
                      fontSize: "14px",
                      backgroundColor: "#FAFAFA",
                    }}
                    size="middle"
                  />
                </ConfigProvider>
              </div>
            </div>
            <Button
              onClick={() => {
                setOpenAddModel(true);
              }}
              style={{
                width: "177px",
                height: "40px",
                boxShadow: "0px 2px 4px 0px #0000001A",
                backgroundColor: "#2E7A8A",
                border: "none",
                transition: "none",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <PlusOutlined />
              <span style={{ margin: 0 }}>Add Product</span>
            </Button>
          </div>
        </div>

        <div className="relative h-full">
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
              rowKey="_id"
              dataSource={productData?.data}
              loading={isLoading}
              pagination={{
                total: productData?.pagination?.total,
                current: page,
                pageSize: productData?.pagination?.limit,
                onChange: (page) => setPage(page),
              }}
            />
          </ConfigProvider>
        </div>
      </div>
      <AddProductsModal
        openAddModel={openAddModal}
        setOpenAddModel={setOpenAddModel}
        refetch={refetch}
      />

      <EditProductsModal
        openEditModel={openEditModel}
        setOpenEditModel={setOpenEditModel}
        product={value}
        refetch={refetch}
      />

      <Modal
        centered
        open={showDelete}
        onCancel={() => setShowDelete(!showDelete)}
        width={400}
        footer={false}
      >
        <div className="p-6 text-center">
          <p className="text-[#D93D04] text-center font-semibold">
            Are you sure!
          </p>
          <p className="pt-4 pb-12 text-center">
            Do you want to delete this product?
          </p>
          <button
            onClick={() => handleDelete(deleteId)}
            className="bg-[#2E7A8A] py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Products;
