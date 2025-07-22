import { Modal, Rate } from "antd";
import React from "react";
import user from "../../assets/modalUser.jpg";
import map from "../../assets/mapIcon.png";
import arrow from "../../assets/modalArrow.png";
import place from "../../assets/place.png";
import charge from "../../assets/charge.png";
import calender from "../../assets/calender.png";
import location from "../../assets/location.png";
import { Link } from "react-router-dom";
import { CgPerformance } from "react-icons/cg";
import { BsCalendar3 } from "react-icons/bs";
import { TbPlayFootball } from "react-icons/tb";

const UserDetailsModal = ({ open, setOpen }) => {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
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
            src={user}
            alt="Image of User"
          />
        </div>

        <div className="mt-1">
          <p className="text-[#A1A1A1]">ID: #00567</p>
        </div>

        <h4 className="text-xl leading-6 font-medium text-[#767676]">
          Nadir Ibne Nannu
        </h4>

        <div className="flex justify-between items-center mt-1.5 pb-2 border-b-2 border-[#D9D9D9]">
          <p className="text-action text-sm font-medium leading-6">Striker</p>
        </div>
        <div className="pt-4 space-y-5">
          <div className="flex items-center gap-[15px]">
            <CgPerformance className="text-lg text-[#6C6C6C]" />
            <p className="text-[#A1A1A1] text-xs leading-[17px] tracking-[-0.5px]">
              Performance : 90%
            </p>
          </div>
          <div className="flex items-center gap-[15px]">
            <BsCalendar3 className="text-lg text-[#6C6C6C]" />
            <p className="text-[#A1A1A1] text-xs leading-[17px] tracking-[-0.5px]">
              Attendance : 93%
            </p>
          </div>
          <div className="flex items-center gap-[15px]">
            <TbPlayFootball className="text-lg text-[#6C6C6C]" />
            <p className="text-[#A1A1A1] text-xs leading-[17px] tracking-[-0.5px]">
              Activity : 95%
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailsModal;
