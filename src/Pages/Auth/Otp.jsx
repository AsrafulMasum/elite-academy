import { Button } from "antd";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import {
  useOtpVerifyMutation,
  useResendOTPMutation,
} from "../../redux/features/authApi";
const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const email = new URLSearchParams(location.search).get("email");
  const [otpVerify] = useOtpVerifyMutation();
  const [resendOTP] = useResendOTPMutation();

  const onFinish = async () => {
    const data = {
      email: email,
      oneTimeCode: otp,
    };

    try {
      const res = await otpVerify(data).unwrap();
      if(res?.success) {
        navigate(`/update-password?token=${res?.data}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResendEmail = async () => {
    try {
      const res = await resendOTP({ email }).unwrap();
      if(res?.success) {
        toast.success(res?.message);
      }
    } catch (error) {
      console.log(error);
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
      <div className="login-form bg-green rounded-2xl px-[40px] py-[100px] w-[700px] shadow-soft">
        <div
          style={{
            width: "620px",

            borderRadius: "12px",
            padding: "90px 57px",
          }}
        >
          <p
            style={{
              color: "#FDFDFD",
              textAlign: "center",
              lineHeight: "24px",
            }}
          >
            Enter the 4-digit code sent to your email.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "47px",
              marginBottom: "47px",
            }}
          >
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              inputStyle={{
                height: "50px",
                width: "55px",
                borderRadius: "12px",
                marginRight: "20px",
                fontSize: "20px",
                border: "0.8px solid #818181",
                color: "#333333",
                outline: "none",
              }}
              renderInput={(props) => <input {...props} />}
            />
          </div>

          <div className="flex justify-center">
            <Button
              onClick={onFinish}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              style={{
                height: "44px",
                width: "93px",
                fontWeight: "500",
                fontSize: "14px",
                background: "#2E7A8A",
                borderRadius: "8px",
                marginBottom: "47px",
              }}
            >
              Verify
            </Button>
          </div>

          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              color: "#757575",
            }}
          >
            Didn’t receive code?
            <p
              onClick={handleResendEmail}
              style={{
                color: "#2E7A8A",
                cursor: "pointer",
              }}
            >
              Send Again.
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Otp;
