import { Button, Form, Input, Modal } from "antd";
import React from "react";

const AddModal = ({ openAddModel, setOpenAddModel }) => {
  const onFinish = (values) => {
    console.log(values);
    // add faq
  };

  return (
    <div>
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
            Add Sic guidelines
          </h1>
          <Form name="basic" onFinish={onFinish}>
            <Form.Item name="details" style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Guidelines details
              </label>
              <Input.TextArea
                placeholder="Enter Guidelines details"
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
              />
            </Form.Item>

            <Form.Item name="link" style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Tutorial link
              </label>
              <Input
                placeholder="Enter Tutorial link"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  border: "none",
                  height: "44px",
                  background: "#DBB162",
                  color: "white",
                  borderRadius: "8px",
                  outline: "none",
                  padding: "10px 20px",
                }}
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default AddModal;
