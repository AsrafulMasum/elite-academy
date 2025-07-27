import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/features/authApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();

  const onFinish = async (values) => {
    try {
      const res = await forgotPassword({
        email: values?.email,
      }).unwrap();
      if (res?.success) {
        navigate(`/otp?email=${values?.email}`);
      } else {
        console.error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div
      className="bg-[#000000]"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div>
        <Form
          name="normal_login"
          className="login-form bg-green rounded-2xl px-[259px] py-[100px] w-[686px] shadow-soft"
          initialValues={{
            remember: true,
          }}
          style={{
            width: "630px",
            borderRadius: "12px",
            padding: "90px 57px",
            position: "relative",
            zIndex: 100,
          }}
          onFinish={onFinish}
        >
          <h1
            style={{
              fontSize: "24px",
              color: "#FDFDFD",
              textAlign: "center",
              fontWeight: 600,
              lineHeight: "32px",
            }}
          >
            Forgot password ?
          </h1>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "21px",
              color: "#757575",
              textAlign: "center",
              marginTop: "24px",
              marginBottom: "40px",
            }}
          >
            Enter your email below to reset your password
          </p>

          <div style={{ marginBottom: "24px" }}>
            <label
              htmlFor="email"
              className="text-base font-medium leading-6 text-[#636363]"
              style={{ display: "block", marginBottom: "6px" }}
            >
              {" "}
              Email{" "}
            </label>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="email"
              id="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                placeholder="Asadujjaman@gmail.com"
                type="email"
                style={{
                  border: "1px solid #E0E0E0",
                  height: "50px",
                  background: "#FEFEFE",
                  borderRadius: "4px",
                  outline: "none",
                }}
              />
            </Form.Item>
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
                  width: "124px",
                  fontWeight: "500",
                  fontSize: "14px",
                  background: "#2E7A8A",
                  marginTop: "24px",
                  borderRadius: "4px",
                }}
              >
                Send Code
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
