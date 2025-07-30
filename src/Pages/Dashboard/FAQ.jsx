import { Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { GoQuestion } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";

const data = [
  {
    _id: "1",
    question: "What is an affiliate e-commerce website?",
    ans: "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at ",
  },
  {
    _id: "2",
    question: "What is an affiliate e-commerce website?2",
    ans: "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at ",
  },
  {
    _id: "3",
    question: "What is an affiliate e-commerce website?",
    ans: "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at ",
  },
  {
    _id: "4",
    question: "What is an affiliate e-commerce website?",
    ans: "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at ",
  },
  {
    _id: "5",
    question: "What is an affiliate e-commerce website?",
    ans: "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at ",
  },
  {
    _id: "6",
    question: "What is an affiliate e-commerce website?",
    ans: "convallis. Praesent felis, placerat Ut ac quis dui volutpat vitae elementum quis adipiscing malesuada tempor non ipsum non, nec vitae amet, Donec tincidunt efficitur. in In ipsum Cras turpis viverra laoreet ullamcorper placerat diam sed leo. faucibus vitae eget vitae vehicula, luctus id Lorem fringilla tempor faucibus ipsum Vestibulum tincidunt ullamcorper elit diam turpis placerat vitae Nunc vehicula, ex faucibus venenatis at, maximus commodo urna. Nam ex quis sit non vehicula, massa urna at ",
  },
];

const FAQ = () => {
  const [openAddModel, setOpenAddModel] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editID, seteditID] = useState("");
  const [question, setQuestion] = useState("");
  const [ans, setans] = useState("");

  const handelsubmit = (e) => {
    e.preventDefault();
    const question = e.target.question.value;
    const ans = e.target.ans.value;
    if(!question || !ans) {
      return false;
    }
    console.log(question, ans);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const question = e.target.question.value;
    const ans = e.target.ans.value;
    if(!question || !ans) {
      return false;
    }
    console.log(question, ans, editID);
  };

  const handleDelete = () => {
    console.log(deleteId);
    setShowDelete(false);
  };

  return (
    <div className="bg-green  px-3 py-2 rounded-lg">
      <div style={{ margin: "24px 16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
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
            FAQ
          </h3>
          <div>
            <Button
              onClick={() => setOpenAddModel(true)}
              style={{
                width: "177px",
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
              <span style={{ margin: 0 }}>Add FAQ</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-green pb-6 px-4 rounded-md">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between items-start gap-4 ">
            <div className="mt-3">
              <GoQuestion color="#FFC107" size={25} />
            </div>
            <div className="w-full ">
              <p className="text-base font-medium border-b rounded-lg py-2 px-4 flex items-center gap-8 bg-action">
                <span className=" flex-1 text-[#FDFDFD]">
                  {" "}
                  {item?.question}
                </span>
              </p>
              <div className="flex justify-start items-start gap-2 border-b  py-2 px-4  rounded-lg my-4 bg-action shadow-none">
                <p className="text-[#FDFDFD] leading-[24px] mb-6 ">
                  NIFI is a comprehensive nail salon platform app designed to
                  connect clients with top-rated nail salons and professionals,
                  offering features like appointment booking, style exploration,
                  and business management tools.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-start items-center gap-2">
              <CiEdit
                onClick={() => {
                  setOpenEditModal(true);
                  const filterdData = FAQData.filter(
                    (filterId) => filterId?._id === item?._id
                  );
                  setQuestion(filterdData[0]?.question);
                  setans(filterdData[0]?.answer);
                  seteditID(item?._id);
                }}
                className="text-3xl font-semibold cursor-pointer text-[#FFC107]"
              />
              <RiDeleteBin6Line
                onClick={() => {
                  setDeleteId(item?._id);
                  setShowDelete(true);
                }}
                className="text-2xl cursor-pointer text-[#D93D04]"
              />
            </div>
          </div>
        ))}
      </div>

      <Modal
        centered
        open={openAddModel}
        onCancel={() => setOpenAddModel(false)}
        width={500}
        footer={false}
      >
        <div className="p-6">
          <h1
            className=" text-[20px] font-medium"
            style={{ marginBottom: "12px" }}
          >
            Add FAQ
          </h1>
          <form onSubmit={handelsubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Question
              </label>
              <input
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
                type="Text"
                placeholder="Enter Question"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
                name="question"
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Answer
              </label>
              <textarea
                onChange={(e) => {
                  setans(e.target.value);
                }}
                type="Text"
                placeholder="Enter answer"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "152px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                  resize: "none",
                }}
                name="ans"
              />
            </div>
            <input
              className="cursor-pointer"
              htmlType="submit"
              block
              style={{
                border: "none",
                height: "44px",
                background: "#BB6D42",
                color: "white",
                borderRadius: "8px",
                outline: "none",
                padding: "10px 20px",
              }}
              value={`Save & change`}
              type="submit"
            />
          </form>
        </div>
      </Modal>

      <Modal
        centered
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        width={500}
        footer={false}
      >
        <div className="p-6">
          <h1
            style={{ marginBottom: "12px" }}
            className=" text-[20px] font-medium"
          >
            Update FAQ
          </h1>
          <form onSubmit={handleUpdate}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Question
              </label>
              <input
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
                type="Text"
                placeholder="Enter Question"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
                value={question}
                name="question"
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Answer
              </label>
              <textarea
                onChange={(e) => {
                  setans(e.target.value);
                }}
                type="Text"
                placeholder="Enter answer"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "152px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                  resize: "none",
                }}
                value={
                  "NIFI is a comprehensive nail salon platform app designed to connect clients with top-rated nail salons and professionals, offering features like appointment booking, style exploration, and business management tools."
                }
                name="ans"
              />
            </div>
            <input
              className="cursor-pointer"
              htmlType="submit"
              block
              style={{
                border: "none",
                height: "44px",
                background: "#BB6D42",
                color: "white",
                borderRadius: "8px",
                outline: "none",
                padding: "10px 20px",
              }}
              value={`Save & change`}
              type="submit"
            />
          </form>
        </div>
      </Modal>

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
    </div>
  );
};

export default FAQ;
