import { useState } from "react";
import { Button, Form, Input } from "antd";
import Swal from "sweetalert2";
import { CiEdit } from "react-icons/ci";
import adminImg from "../../assets/admin.jpg"
const AdminProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const [newPassError, setNewPassError] = useState("");
  const [conPassError, setConPassError] = useState("");
  const [curPassError, setCurPassError] = useState("");

  const [imgPick, setImagePick] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImagePick(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleChangePassword = (values) => {
    console.log(values);
    if (values?.current_password === values.new_password) {
      setNewPassError("The New password is semilar with old Password");
    } else {
      setNewPassError("");
    }

    if (values?.new_password !== values.confirm_password) {
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
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <div
          className=""
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "16px 0",
          }}
        >
          <div>
            <h3
              style={{
                color: "black",
                fontSize: 18,
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              Admin Profile
            </h3>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          ></div>
        </div>

        <div>
          <div className="flex justify-center items-center">
            <div
              className=" w-[75%] bg-[#F9F9F9] rounded-lg py-5"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  position: "relative",
                }}
              >
                <img
                  src={imgPick ? imgPick : adminImg}
                  alt=""
                  style={{
                    height: 114,
                    width: 119,
                    borderRadius: "50%",
                    objectFit: "cover",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.35)",
                  }}
                />
                <label
                  htmlFor="imageUpload"
                  style={{
                    position: "absolute",
                    bottom: 20,
                    right: -10,
                    backgroundColor: "white",
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <CiEdit size={25} color="#929394" />
                </label>
              </div>
              <p
                style={{
                  fontSize: 32,
                  fontWeight: 500,
                  color: "#333333",
                }}
              >
                Admin Niloofar
              </p>
            </div>
          </div>

          <input
            id="imageUpload"
            type="file"
            src=""
            onChange={onImageChange}
            style={{ display: "none" }}
            alt=""
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 35,
              marginBottom: 35,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 33,
              }}
            >
              <p
                onClick={() => setIsEdit(true)}
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: isEdit ? "#BB6D42" : "#818181",
                  cursor: "pointer",
                  borderBottom: isEdit ? "3px solid #BB6D42" : "none",
                  padding: "6px 0px",
                }}
              >
                Edit Profile
              </p>
              <p
                onClick={() => setIsEdit(false)}
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: isEdit ? "#818181" : "#BB6D42",
                  cursor: "pointer",
                  borderBottom: isEdit ? "none" : "3px solid #BB6D42",
                  padding: "6px 0px",
                }}
              >
                Change Password
              </p>
            </div>
          </div>
          {isEdit ? (
            <div className="flex justify-center items-center">
              <div
                className=" bg-[#F9F9F9] w-[75%]"
                style={{
                  padding: "40px",
                  borderRadius: "10px",
                }}
              >
                <p
                  style={{
                    fontSize: 24,
                    fontWeight: 500,
                    color: "#333333",
                    textAlign: "center",
                  }}
                >
                  Edit Your Profile
                </p>
                <div className=" flex justify-center items-center">
                  <div
                    style={{
                      marginTop: 25,
                      width: "65%",
                    }}
                  >
                    <div className=" mb-3">
                      <label
                        style={{
                          color: "#636363",
                          fontSize: 14,
                          fontWeight: 500,
                        }}
                      >
                        User Name
                      </label>
                      <Input
                        placeholder="Admin Marie"
                        style={{
                          padding: "10px",
                          color: "#818181",
                          fontSize: 14,
                          fontWeight: 400,
                          margin: "8px 0px",
                        }}
                      />
                    </div>
                    <div className=" mb-3">
                      <label
                        style={{
                          color: "#636363",
                          fontSize: 14,
                          fontWeight: 500,
                        }}
                      >
                        Email
                      </label>
                      <Input
                        placeholder="Camille@gmail.com"
                        style={{
                          padding: "10px",
                          color: "#818181",
                          fontSize: 14,
                          fontWeight: 400,
                          margin: "8px 0px",
                        }}
                      />
                    </div>
                    <div className=" mb-3">
                      <label
                        style={{
                          color: "#636363",
                          fontSize: 14,
                          fontWeight: 500,
                        }}
                      >
                        Contact no
                      </label>
                      <Input
                        placeholder="+99007007007"
                        style={{
                          padding: "10px",
                          color: "#818181",
                          fontSize: 14,
                          fontWeight: 400,
                          margin: "8px 0px",
                        }}
                      />
                    </div>
                    <div className=" mb-3">
                      <label
                        style={{
                          color: "#636363",
                          fontSize: 14,
                          fontWeight: 500,
                        }}
                      >
                        Address
                      </label>
                      <Input
                        placeholder="79/A Joker Vila, Gotham City"
                        style={{
                          padding: "10px",
                          color: "#818181",
                          fontSize: 14,
                          fontWeight: 400,
                          margin: "8px 0px",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 24,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    style={{
                      height: 44,
                      width: 150,
                      backgroundColor: "#BB6D42",
                      color: "white",
                      borderRadius: "8px",
                      fontWeight: 500,
                      fontSize: 14,
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className=" flex justify-center items-center">
              <div
                className=" bg-[#F9F9F9] w-[75%] p-[40px] rounded-lg"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    remember: true,
                  }}
                  style={{ width: "65%", height: "fit-content" }}
                  onFinish={handleChangePassword}
                >
                  <p
                    style={{
                      fontSize: 24,
                      fontWeight: 500,
                      color: "#333333",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                    Change Password
                  </p>
                  <div style={{ marginBottom: "30px" }}>
                    <label
                      style={{
                        margin: "0px 0px",
                        color: "#636363",
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    >
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
                      <Input.Password
                        placeholder="Enter Password"
                        type="password"
                        style={{
                          border: "1px solid #E0E4EC",
                          height: "52px",
                          background: "white",
                          borderRadius: "8px",
                          outline: "none",
                          margin: "8px 0px 0px 0px",
                        }}
                      />
                    </Form.Item>
                    {curPassError && (
                      <label
                        style={{ display: "block", color: "red" }}
                        htmlFor="error"
                      >
                        {curPassError}
                      </label>
                    )}
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        margin: "0px 0px",
                        color: "#636363",
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                      htmlFor=""
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
                        placeholder="Enter Password"
                        type="password"
                        style={{
                          border: "1px solid #E0E4EC",
                          height: "52px",
                          background: "white",
                          borderRadius: "8px",
                          outline: "none",
                          margin: "8px 0px 0px 0px",
                        }}
                      />
                    </Form.Item>
                    {newPassError && (
                      <label
                        style={{ display: "block", color: "red" }}
                        htmlFor="error"
                      >
                        {newPassError}
                      </label>
                    )}
                  </div>

                  <div style={{ marginBottom: "40px" }}>
                    <label
                      style={{
                        margin: "0px 0px",
                        color: "#636363",
                        fontSize: 14,
                        fontWeight: 500,
                      }}
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
                        placeholder="Enter Password"
                        type="password"
                        style={{
                          border: "1px solid #E0E4EC",
                          height: "52px",
                          background: "white",
                          borderRadius: "8px",
                          outline: "none",
                          margin: "8px 0px 0px 0px",
                        }}
                      />
                    </Form.Item>
                    {conPassError && (
                      <label
                        style={{ display: "block", color: "red" }}
                        htmlFor="error"
                      >
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
                      <div
                        style={{
                          marginTop: 24,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          style={{
                            height: 44,
                            width: 150,
                            backgroundColor: "#BB6D42",
                            color: "white",
                            borderRadius: "8px",
                            fontWeight: 500,
                            fontSize: 14,
                          }}
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
