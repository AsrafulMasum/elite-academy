import { Modal } from "antd";
import user from "../../assets/modalUser.jpg";
import { CgPerformance } from "react-icons/cg";
import { BsCalendar3 } from "react-icons/bs";
import { TbPlayFootball } from "react-icons/tb";
import { imageUrl } from "../../redux/api/baseApi";

const UserDetailsModal = ({ value, setValue }) => {
  return (
    <Modal
      open={value}
      onCancel={() => setValue(null)}
      centered
      footer={false}
      width={335}
    >
      <div className="p-8 bg-[#F7F7F7] rounded-3xl">
        <div
          className="w-[115px] h-[115px] rounded-full border-[3px] border-[#FDFDFD] overflow-hidden"
          style={{
            boxShadow: " 0px 5px 8px 0px #0000000F",
          }}
        >
          <img
            className="w-[115px] h-[115px] rounded-full object-cover"
            src={
              value?.image && value?.image.startsWith("http")
                ? value?.image
                : value?.image
                ? `${imageUrl}${value?.image}`
                : "/default-avatar.jpg"
            }
            alt="Image of User"
          />
        </div>

        <div className="mt-1">
          <p className="text-[#A1A1A1]">ID: {value?.studentId}</p>
        </div>

        <h4 className="text-xl leading-6 font-medium text-[#767676]">
          {value?.name}
        </h4>

        <div className="flex justify-between items-center mt-1.5 pb-2 border-b-2 border-[#D9D9D9]">
          <p className="text-action text-sm font-medium leading-6">
            {value?.position || "N/A"}
          </p>
        </div>
        <div className="pt-4 space-y-5">
          <div className="flex items-center gap-[15px]">
            <CgPerformance className="text-lg text-[#6C6C6C]" />
            <p className="text-[#A1A1A1] text-xs leading-[17px] tracking-[-0.5px]">
              Performance : {value?.overview?.activity || "N/A"}
            </p>
          </div>
          <div className="flex items-center gap-[15px]">
            <BsCalendar3 className="text-lg text-[#6C6C6C]" />
            <p className="text-[#A1A1A1] text-xs leading-[17px] tracking-[-0.5px]">
              Attendance : {value?.overview?.attandance || "N/A"}
            </p>
          </div>
          <div className="flex items-center gap-[15px]">
            <TbPlayFootball className="text-lg text-[#6C6C6C]" />
            <p className="text-[#A1A1A1] text-xs leading-[17px] tracking-[-0.5px]">
              Activity : {value?.overview?.homework || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailsModal;
