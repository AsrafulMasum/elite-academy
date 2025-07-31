import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import EditInputForm from "../../Components/Dashboard/EditInputForm";
import AddInputForm from "../../Components/Dashboard/AddInputForm";
import {
  useDeleteSubscriptionMutation,
  useGetSubscriptionsQuery,
} from "../../redux/features/subscriptionApi";
import toast from "react-hot-toast";

const Subscription = () => {
  const [openAddModel, setOpenAddModel] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [packages, setPackages] = useState([]);
  const [editPackage, setEditPackage] = useState(null);
  const { data: packageData, refetch } = useGetSubscriptionsQuery();
  const [deleteSubscription] = useDeleteSubscriptionMutation();

  // Open edit modal for a specific package
  const handleEditClick = (pkg) => {
    setEditPackage(pkg);
    setOpenEditModal(true);
  };

  // Close edit modal
  const handleEditModalClose = () => {
    setOpenEditModal(false);
    setEditPackage(null);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteSubscription(deleteId);
      if (res?.data) {
        toast.success("Subscription deleted successfully");
        setShowDelete(false);
        setDeleteId("");
        refetch();
      } else {
        console.error("Failed to delete subscription:", res.error);
      }
    } catch (error) {
      console.error("Error deleting subscription:", error);
      setShowDelete(false);
    }
  };

  useEffect(() => {
    if (Array.isArray(packageData)) {
      setPackages(packageData);
    } else {
      setPackages([]);
    }
  }, [packageData]);

  return (
    <div className="bg-green h-full">
      {/* header */}
      <div className="flex items-center justify-between p-10">
        <h2 className="text-2xl font-semibold text-white">Subscription</h2>
        <div>
          <Button
            onClick={() => {
              setOpenAddModel(true);
            }}
            style={{
              width: "200px",
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
            <span style={{ margin: 0 }}>Create Subscription</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-10 mt-10">
        {Array.isArray(packages) &&
          packages?.map((singleData) => (
            <div
              key={singleData?._id}
              className="max-w-[320px] bg-[#F4F4F4] py-4 px-6 border border-[#2E7A8A] rounded-lg"
            >
              <div className="flex justify-end items-center py-2">
                <div
                  onClick={() => {
                    setDeleteId(singleData?._id);
                    setShowDelete(true);
                  }}
                  className="cursor-pointer bg-[#2E7A8A] rounded-full p-2"
                >
                  <MdDeleteOutline className="text-xl text-white" />
                </div>
              </div>
              <h4 className="text-text text-xl font-medium text-center pb-2.5">
                Get {singleData?.name}
              </h4>
              <h4 className="text-text text-center pb-3">
                <span className="text-4xl font-semibold">
                  $ {singleData?.price}
                </span>{" "}
                / per {singleData?.duration}
              </h4>
              <div className="space-y-4">
                {singleData?.features?.map((details, idx) => (
                  <div className="flex gap-2" key={idx}>
                    <IoCheckmarkCircle className="min-w-[24px] text-[#00BA00]" />
                    <p className="text-xs text-sub_title leading-[148%]">
                      {details}
                    </p>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => handleEditClick(singleData)}
                style={{
                  width: "100%",
                  height: 40,
                  marginTop: "24px",
                  backgroundColor: "#2E7A8A",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "500",
                  borderRadius: "8px",
                }}
              >
                Edit Package
              </Button>
            </div>
          ))}
      </div>

      {/* edit modal */}
      <Modal
        centered
        open={openEditModal}
        onCancel={handleEditModalClose}
        width={600}
        footer={false}
      >
        <div className="p-6">
          <h1
            className="text-[20px] font-medium"
            style={{ marginBottom: "12px" }}
          >
            Edit Package
          </h1>
          <EditInputForm
            packageData={editPackage}
            refetch={refetch}
            setOpenEditModal={setOpenEditModal}
          />
        </div>
      </Modal>

      {/* add modal */}
      <Modal
        centered
        open={openAddModel}
        onCancel={() => setOpenAddModel(false)}
        width={600}
        footer={false}
      >
        <div className="p-6">
          <h1
            className="text-[20px] font-medium"
            style={{ marginBottom: "12px" }}
          >
            Add Package
          </h1>
          <AddInputForm refetch={refetch} setOpenAddModel={setOpenAddModel} />
        </div>
      </Modal>

      {/* delete modal */}
      <Modal
        centered
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        width={400}
        footer={false}
      >
        <div className="p-6 text-center">
          <p className="text-[#D93D04] text-center font-semibold">
            Are you sure!
          </p>
          <p className="pt-4 pb-12 text-center">
            Do you want to delete this package?
          </p>
          <button
            onClick={handleDelete}
            className="bg-[#2E7A8A] py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Subscription;
