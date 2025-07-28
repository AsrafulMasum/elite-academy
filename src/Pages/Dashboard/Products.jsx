import { useEffect, useRef, useState } from "react";
import { Button, ConfigProvider, Table } from "antd";
import provider from "../../assets/serviceProvider.png";
import { GoArrowUpRight } from "react-icons/go";
import SellingsDetailsModal from "../../Components/Dashboard/SellingsDetailsModal";
import { PlusOutlined } from "@ant-design/icons";
import { FiEdit } from "react-icons/fi";
import AddProductsModal from "../../Components/Dashboard/AddProductsModal";
import EditProductsModal from "../../Components/Dashboard/EditProductsModal";
import { useGetProductsQuery } from "../../redux/features/productApi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { imageUrl } from "../../redux/api/baseApi";

const data = [
  {
    key: 1,
    productsName: "Nike Phantom GT",
    productImage: "https://i.imgur.com/xXZxW0M.jpg",
    productId: "PROD001",
    category: "Football Boots",
    stock: 25,
    status: "In Stock",
  },
  {
    key: 2,
    productsName: "Adidas Predator Accuracy",
    productImage: "https://i.imgur.com/GyFxfvw.jpg",
    productId: "PROD002",
    category: "Football Boots",
    stock: 0,
    status: "Stock Out",
  },
  {
    key: 3,
    productsName: "Puma Ultra Ultimate",
    productImage: "https://i.imgur.com/sZz8gPQ.jpg",
    productId: "PROD003",
    category: "Football Boots",
    stock: 6,
    status: "Short Stock",
  },
  {
    key: 4,
    productsName: "Nike Flight Ball",
    productImage: "https://i.imgur.com/Q6GeXtA.jpg",
    productId: "PROD004",
    category: "Football",
    stock: 12,
    status: "In Stock",
  },
  {
    key: 5,
    productsName: "Adidas Al Rihla Ball",
    productImage: "https://i.imgur.com/XSGcHee.jpg",
    productId: "PROD005",
    category: "Football",
    stock: 1,
    status: "Short Stock",
  },
  {
    key: 6,
    productsName: "Puma Orbita Ball",
    productImage: "https://i.imgur.com/hH0BTmk.jpg",
    productId: "PROD006",
    category: "Football",
    stock: 0,
    status: "Stock Out",
  },
  {
    key: 7,
    productsName: "Nike Guard Lock",
    productImage: "https://i.imgur.com/6oZH9OG.jpg",
    productId: "PROD007",
    category: "Shin Guards",
    stock: 18,
    status: "In Stock",
  },
  {
    key: 8,
    productsName: "Adidas Tiro Club Shin Guard",
    productImage: "https://i.imgur.com/Y6yKqvV.jpg",
    productId: "PROD008",
    category: "Shin Guards",
    stock: 4,
    status: "Short Stock",
  },
  {
    key: 9,
    productsName: "Puma Ultra Flex Shin Guard",
    productImage: "https://i.imgur.com/0Em5lAy.jpg",
    productId: "PROD009",
    category: "Shin Guards",
    stock: 9,
    status: "In Stock",
  },
  {
    key: 10,
    productsName: "Nike Strike Training Jersey",
    productImage: "https://i.imgur.com/lpJep4n.jpg",
    productId: "PROD010",
    category: "Jersey",
    stock: 16,
    status: "In Stock",
  },
  {
    key: 11,
    productsName: "Adidas Entrada Jersey",
    productImage: "https://i.imgur.com/Cqgl9LF.jpg",
    productId: "PROD011",
    category: "Jersey",
    stock: 2,
    status: "Short Stock",
  },
  {
    key: 12,
    productsName: "Puma Team Final Jersey",
    productImage: "https://i.imgur.com/ZZBbR4M.jpg",
    productId: "PROD012",
    category: "Jersey",
    stock: 0,
    status: "Stock Out",
  },
  {
    key: 13,
    productsName: "Nike Goalkeeper Gloves",
    productImage: "https://i.imgur.com/kzjpiZh.jpg",
    productId: "PROD013",
    category: "Gloves",
    stock: 22,
    status: "In Stock",
  },
  {
    key: 14,
    productsName: "Adidas Predator Gloves",
    productImage: "https://i.imgur.com/WqGpFyA.jpg",
    productId: "PROD014",
    category: "Gloves",
    stock: 8,
    status: "In Stock",
  },
  {
    key: 15,
    productsName: "Puma Future Grip Gloves",
    productImage: "https://i.imgur.com/N73OMv5.jpg",
    productId: "PROD015",
    category: "Gloves",
    stock: 0,
    status: "Stock Out",
  },
  {
    key: 16,
    productsName: "Nike Dri-FIT Shorts",
    productImage: "https://i.imgur.com/HmsvvO7.jpg",
    productId: "PROD016",
    category: "Shorts",
    stock: 13,
    status: "In Stock",
  },
  {
    key: 17,
    productsName: "Adidas Squadra Shorts",
    productImage: "https://i.imgur.com/yPymQhW.jpg",
    productId: "PROD017",
    category: "Shorts",
    stock: 3,
    status: "Short Stock",
  },
  {
    key: 18,
    productsName: "Puma Liga Shorts",
    productImage: "https://i.imgur.com/lRAAloS.jpg",
    productId: "PROD018",
    category: "Shorts",
    stock: 0,
    status: "Stock Out",
  },
  {
    key: 19,
    productsName: "Nike Academy Socks",
    productImage: "https://i.imgur.com/kPbHftR.jpg",
    productId: "PROD019",
    category: "Socks",
    stock: 7,
    status: "In Stock",
  },
  {
    key: 20,
    productsName: "Adidas Milano Socks",
    productImage: "https://i.imgur.com/lvqp2so.jpg",
    productId: "PROD020",
    category: "Socks",
    stock: 19,
    status: "In Stock",
  },
];

const itemsPerPage = 10;
const total = 10;

const Products = () => {
  const [page, setPage] = useState(() => {
    const urlPage = new URLSearchParams(window.location.search).get("page");
    return urlPage ? parseInt(urlPage, 10) : 1;
  });
  const [openAddModal, setOpenAddModel] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const { data: productData, isLoading, refetch } = useGetProductsQuery(null);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const [value, setValue] = useState(null);

  const pageSize = 10;
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  const handleModalClose = () => {
    setValue(null);
  };

  const columns = [
    {
      title: "Serial No.",
      key: "serial",
     render: (_, __, index) => <span className="text-[#FDFDFD]">{index + 1}</span>,
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
            // src={`http://10.10.7.6:5000/${record?.images[0]}`}
            src={
              record?.images &&
              record?.images[0]?.startsWith("http")
                ? record?.images[0]
                : record?.images[0]
                ? `${imageUrl}${record?.images[0]}`
                : "/default-avatar.png"
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
      render: (_,record) => <span className="text-[#FDFDFD]">{record?._id}</span>,
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

        if (record.stock === 0) {
          status = "Stock Out";
          statusClass = "bg-[#FC605726] text-[#FC6057]";
        } else if (record.stock < 10) {
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
          // height: "100%",
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
          <div>
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

        {isLoading ? (
          <p>Loading</p>
        ) : (
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
                dataSource={productData?.data}
                pagination={{
                  total: total,
                  current: page,
                  pageSize: itemsPerPage,
                  onChange: (page) => setPage(page),
                }}
              />
            </ConfigProvider>
          </div>
        )}
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
    </div>
  );
};

export default Products;
