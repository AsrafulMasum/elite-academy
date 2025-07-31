import { Modal } from "antd";
import { CiUser } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";
import card from "../../assets/card.svg";

const SellingsDetailsModal = ({ value, handleModalClose }) => {
  return (
    <Modal
      width={900}
      centered
      open={value}
      onCancel={handleModalClose}
      footer={false}
    >
      <div className="p-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4">
              <p className="text-xl font-semibold text-sub_title">
                Order ID : {value?.orderId}
              </p>
              {/* Status badge with dynamic background color */}
              {(() => {
                const statusColorMap = {
                  Placed: { color: "#1890FF", bg: "#E6F7FF" },
                  Confirmed: { color: "#722ED1", bg: "#F9F0FF" },
                  Packed: { color: "#F78F08", bg: "#FFF7E6" },
                  "On the way": { color: "#13C2C2", bg: "#E6FFFB" },
                  Delivered: { color: "#52C41A", bg: "#F6FFED" },
                  Cancelled: { color: "#FF4D4F", bg: "#FFF1F0" },
                };
                const { color, bg } = statusColorMap[value?.status] || {
                  color: "#333",
                  bg: "#f0f0f0",
                };
                return (
                  <p
                    className="py-1 px-5 rounded text-lg"
                    style={{ background: bg, color, fontWeight: 500 }}
                  >
                    {value?.status}
                  </p>
                );
              })()}
            </div>
            <div className="flex items-center gap-4 mt-4 text-[#5C5C5C]">
              <IoCalendarOutline className="text-2xl" />
              <p className="text-lg"> {value?.deliveryDate}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="p-2 bg-gray-100 rounded h-16">
              <CiUser className="text-5xl" />
            </div>
            <div>
              <h4 className="text-[#60A548] text-xl font-semibold">Customer</h4>
              <p className="text-[#5C5C5C] font-semibold">
                Full Name : {value?.user?.name || "Not Added Yet"}
              </p>
              <p className="text-[#5C5C5C] font-semibold">
                Email : {value?.email}
              </p>
              <p className="text-[#5C5C5C] font-semibold">
                Phone : {value?.user?.contact || "Not Added"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h4 className="text-[#60A548] text-xl font-semibold">Payment Info</h4>
          <div className="flex items-center gap-2 mt-4">
            <img className="py-1 px-1.5 border rounded" src={card} alt="" />
            <p className="text-[#5C5C5C] text-lg font-semibold">
              Master Card -- {value?.cardNumber || "4242 4242 4242 4242"}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-[#60A548] text-xl font-semibold mt-10">
            Product Images
          </h4>
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              {value?.items?.map((item) => (
                <img
                  key={item?._id}
                  src={
                    item?.product?.image &&
                    item?.product?.image.startsWith("http")
                      ? item?.product?.image
                      : item?.product?.image
                      ? `${imageUrl}${item?.product?.image}`
                      : "/default-avatar.jpg"
                  }
                  alt={`Product ${item?._id}`}
                  className="w-10 h-10 object-cover rounded border border-[#3F857B]"
                />
              ))}
            </div>
            {/* <p className="text-lg text-[#5C5C5C] font-semibold">
              {value?.quantity || "2"}
            </p> */}
            <p className="text-lg text-[#5C5C5C] font-semibold">
              $ {value?.price || "106"}
            </p>
          </div>
        </div>

        <hr />

        <div className="mt-8 flex items-center justify-between">
          <h4 className="text-primary text-2xl font-bold">Total</h4>
          <p className="text-xl text-primary font-semibold">
            $ {value?.price || "106"}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default SellingsDetailsModal;
