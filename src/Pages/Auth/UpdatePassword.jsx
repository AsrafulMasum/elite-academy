import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/features/authApi";
import toast from "react-hot-toast";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [newPassError, setNewPassError] = useState("");
  const [conPassError, setConPassError] = useState("");
  const [resetPassword] = useResetPasswordMutation();

  const onFinish = async (values) => {
    if (values) {
      const token = new URLSearchParams(window.location.search).get("token");
      if (!token) {
        console.error("Reset token is missing!");
        return;
      }

      const data = {
        newPassword: values?.newPassword,
        confirmPassword: values?.confirmPassword,
      };
      console.log(data)

      try {
        const res = await resetPassword({
          payload: data,
          token,
        }).unwrap();

        if (res?.success) {
          navigate("/login");
          toast.success(res?.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <div
      className="bg-[#000000]"
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
          className="login-form bg-green rounded-2xl px-[100px] py-[170px] w-[710px] shadow-soft"
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
              color: "#FDFDFD",
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
              color: "#757575",
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
              name="newPassword"
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
              name="confirmPassword"
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
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                style={{
                  height: "44px",
                  width: "166px",
                  fontWeight: "500",
                  fontSize: "14px",
                  background: "#2E7A8A",
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
