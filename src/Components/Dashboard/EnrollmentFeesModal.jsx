import { Modal } from "antd";
import React from "react";

const EnrollmentFeesModal = ({ value, handleModalClose }) => {
  return (
    <Modal centered open={value} onCancel={handleModalClose} footer={false}>
      <div>
        <h4 className="text-lg font-medium mt-[35px]">Transaction Details</h4>
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="pb-[5px]">Transaction ID</p>
            <p className="pb-[5px]">Email</p>
            <p className="pb-[5px]">Date</p>
            <p>Transaction amount</p>
          </div>
          <div>
            <p className="pb-[5px] text-right">
              {value?.trxId || "Not Added Yet"}
            </p>
            <p className="pb-[5px] text-right">
              {value?.user?.email || "Not Added Yet"}
            </p>
            <p className="pb-[5px] text-right">
              {value?.createdAt ? moment(value.createdAt).format("L") : ""}
            </p>
            <p className="text-right">${value?.price || "Not Added Yet"}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EnrollmentFeesModal;
