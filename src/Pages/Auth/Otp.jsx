import { Button } from "antd";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("284");
  const [err, setErr] = useState("");

  const handleResendEmail = () => {
    const email = JSON.parse(localStorage.getItem("email"));
  };
  const handleVerifyOtp = () => {
    Swal.fire({
      title: "Password Reset",
      text: "Your password has been successfully reset. click confirm to set a new password",
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: "Confirm",
      confirmButtonColor: "#2E7A8A",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/update-password");
      }
    });
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
            Enter the 6-digit code sent to your email.
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
              numInputs={6}
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
              onClick={handleVerifyOtp}
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
