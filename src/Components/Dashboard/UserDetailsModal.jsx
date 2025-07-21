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

const UserDetailsModal = ({ open, setOpen }) => {
  const interest = ["friend ", "family", "career", "animal"];
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      centered
      footer={false}
      width={335}
    >
      <div className="p-4 bg-[#F7F7F7] rounded-3xl">
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

        <div className="flex justify-between items-end -mt-2 mb-1.5">
          <div className="flex justify-center items-center gap-2">
            <Rate
              disabled
              allowHalf
              defaultValue={4.5}
              style={{
                fontSize: "14px",
                color: "#FEA500",
              }}
            />
            <p>4.5/5</p>
          </div>
          <Link
            className="w-10 h-10 rounded-full bg-[#FDFDFD] flex justify-center items-center border border-[#C1EEBD]"
            style={{
              boxShadow: "0px 2px 2px 0px #0000001A",
            }}
          >
            <img src={map} alt="" />
          </Link>
        </div>

        <h4 className="text-xl leading-6 font-medium text-[#767676]">
          Nadir Ibne Nannu
        </h4>

        <div className="flex justify-between items-center mt-1.5 pb-2 border-b-2 border-[#D9D9D9]">
          <h6 className="text-[#C98A68] text-xs leading-6">
            Dental hygienist/Assistant
          </h6>
          <Link>
            <img className="w-4 h-4" src={arrow} alt="Arrow button" />
          </Link>
        </div>
        <div className="pt-4 space-y-5">
          <div className="flex items-center gap-[15px]">
            <img src={location} alt="" />
            <p className="text-[#A1A1A1] text-xs leading-[17px] tracking-[-0.5px]">
              1901 Thornridge Cir. Shiloh, Haw...
            </p>
          </div>
          <div className="flex items-center gap-[15px]">
            <img src={calender} alt="" />
            <p className="text-[#A1A1A1] text-xs leading-[17px] tracking-[-0.5px]">
              Jan 1, 2024 (9:00am-3:00pm)
            </p>
          </div>
          <div className="flex items-center gap-[15px]">
            <img src={place} alt="" />
            <p className="text-[#A1A1A1] text-xs leading-[17px] tracking-[-0.5px]">
              Niloofar Dental Care
            </p>
          </div>
          <div className="flex items-center gap-[15px]">
            <img src={charge} alt="" />
            <p className="text-[#A1A1A1] text-xs leading-[17px] tracking-[-0.5px]">
              80/hour
            </p>
          </div>
        </div>
        <p className="text-[#68817F] text-center text-xs leading-[17px] tracking-[-0.5px] pt-4 pb-2">
          Booking was completed. The service provider is scheduled to arrive on
          Jan 1, 2024
        </p>
        <p className="text-[#A1A1A1] text-center text-xs leading-6 tracking-[-0.5px]">
          Do you want to cancel this booking?
        </p>
        <div className="text-center mb-9">
          <Link className="text-[#FE9B98] text-xs font-medium leading-6 tracking-[-0.5px] hover:text-[#FE9B98]">Cancel booking</Link>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailsModal;
