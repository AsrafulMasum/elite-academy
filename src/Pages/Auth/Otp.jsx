import { Button } from "antd";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./style.css";
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
      confirmButtonColor: "#F27405",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/update-password");
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
      <div className="login-form bg-[#FEFEFECC] border rounded-2xl px-[40px] py-[100px] w-[686px] shadow-soft">
        <div
          className=" backdrop-blur-lg bg-white/70"
          style={{
            width: "630px",

            borderRadius: "12px",
            padding: "90px 57px",
          }}
        >
          <p
            style={{
              color: "#818181",
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
                background: "#BB6D42",
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
              color: "#818181",
            }}
          >
            Didn’t receive code?
            <p
              onClick={handleResendEmail}
              style={{
                color: "#BB6D42",
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
