import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./style.css";
const UpdatePassword = () => {
  const navigate = useNavigate();
  const [newPassError, setNewPassError] = useState("");
  const [conPassError, setConPassError] = useState("");
  const [err, setErr] = useState("");
  const onFinish = (values) => {
    const { password, confirmPassword } = values;
    Swal.fire({
      title: "Successfully",
      text: "Your password has been updated, please change your password regularly to avoid this happening",
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: "Confirm",
      confirmButtonColor: "#BB6D42",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <Form
          name="normal_login"
          className="login-form bg-[#FEFEFECC] border rounded-2xl px-[100px] py-[170px] w-[710px] shadow-soft"
          initialValues={{
            remember: true,
          }}
          style={{
            borderRadius: "12px",
          }}
          onFinish={onFinish}
        >
          <h1
            style={{
              fontSize: "24px",
              color: "#333333",
              textAlign: "center",
              lineHeight: "32px",
              marginBottom: "24px",
              fontWeight: 600,
            }}
          >
            Create New Password
          </h1>
          <p
            style={{
              color: "#5C5C5C",
              fontSize: "16px",
              fontWeight: 400,
              textAlign: "center",
              lineHeight: "32px",
            }}
          >
            Your new password must be different from previous passwords.
          </p>

          <div style={{ margin: "24px 0 24px 0" }}>
            <label
              style={{ display: "block", marginBottom: "6px" }}
              htmlFor="password"
              className="text-base font-medium leading-6 text-[#636363]"
            >
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
                placeholder="********"
                style={{
                  border: "1px solid #E0E0E0",
                  height: "50px",
                  background: "#FEFEFE",
                  borderRadius: "4px",
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

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
              }}
              htmlFor="email"
              className="text-base font-medium leading-6 text-[#636363]"
            >
              Confirm Password
            </label>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="confirm_password"
              rules={[
                {
                  required: true,
                  message: "Please input your Confirm Password!",
                },
              ]}
            >
              <Input.Password
                type="password"
                placeholder="********"
                style={{
                  border: "1px solid #E0E0E0",
                  height: "50px",
                  background: "#FEFEFE",
                  borderRadius: "4px",
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

          <div className="flex justify-center">
            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                onClick={() => navigate("/")}
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                style={{
                  height: "44px",
                  width: "166px",
                  fontWeight: "500",
                  fontSize: "14px",
                  background: "#BB6D42",
                  borderRadius: "8px",
                }}
              >
                Update Password
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePassword;
