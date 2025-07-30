import React, { useState } from "react";
// import BackButton from "../../Pages/Dashboard/BackButton";
import { Button, Form, Input } from "antd";

const ChangePassword = () => {
  const [newPassError, setNewPassError] = useState("");
  const [conPassError, setConPassError] = useState("");
  const [curPassError, setCurPassError] = useState("");

  const handleChangePassword = (values) => {
    console.log(values);
    if(values?.current_password === values.new_password) {
      setNewPassError("The New password is semilar with old Password");
    } else {
      setNewPassError("");
    }

    if(values?.new_password !== values.confirm_password) {
      setConPassError("New Password and Confirm Password Doesn't Matched");
    } else {
      setConPassError("");
    }
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div>
      <div style={{ margin: "30px 0" }}>
        <BackButton link="/" />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          style={{ width: "543px", height: "fit-content" }}
          onFinish={handleChangePassword}
        >
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Current Password
            </label>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="current_password"
              rules={[
                {
                  required: true,
                  message: "Please input your current password!",
                },
              ]}
            >
              <Input
                placeholder="Enter Password"
                type="text"
                style={{
                  border: "1px solid #E0E4EC",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                }}
              />
            </Form.Item>
            {curPassError && (
              <label style={{ display: "block", color: "red" }} htmlFor="error">
                {curPassError}
              </label>
            )}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }} htmlFor="">
              New Password
            </label>
            <Form.Item
              name="new_password"
              rules={[
                {
                  required: true,
                  message: "Please input your new Password!",
                },
              ]}
              style={{ marginBottom: 0 }}
            >
              <Input.Password
                type="password"
                placeholder="Enter password"
                style={{
                  border: "1px solid #E0E4EC",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                }}
              />
            </Form.Item>
            {newPassError && (
              <label style={{ display: "block", color: "red" }} htmlFor="error">
                {newPassError}
              </label>
            )}
          </div>

          <div style={{ marginBottom: "40px" }}>
            <label
              style={{ display: "block", marginBottom: "5px" }}
              htmlFor="email"
            >
              Re-Type Password
            </label>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="confirm_password"
              rules={[
                {
                  required: true,
                  message: "Please input your Re-type Password!",
                },
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Enter password"
                style={{
                  border: "1px solid #E0E4EC",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                }}
              />
            </Form.Item>
            {conPassError && (
              <label style={{ display: "block", color: "red" }} htmlFor="error">
                {conPassError}
              </label>
            )}
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "16px",
              alignItems: "center",
            }}
          >
            <div style={{ width: "100%" }}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{
                    border: "none",
                    height: "51px",
                    background: "#2FD5C7",
                    color: "white",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                >
                  UPDATE
                </Button>
              </Form.Item>
            </div>
            <div style={{ width: "100%" }}>
              <Form.Item>
                <Button
                  onClick={handleReset}
                  block
                  style={{
                    border: "none",
                    height: "51px",
                    background: "#BFF2EE",
                    color: "#2FD5C7",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                >
                  RESET
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
