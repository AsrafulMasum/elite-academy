import { Modal } from "antd";
import { useEffect, useState } from "react";
import { CiImageOn } from "react-icons/ci";

const AddProductsModal = ({ openAddModel, setOpenAddModel }) => {
  const [imgURLs, setImgURLs] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const [form, setForm] = useState({
    productName: "",
    image: "",
    startDate: "",
    endDate: "",
    price: "",
    quantity: "",
  });

  const handleAdd = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files.length > 0) {
      const fileArray = Array.from(files);
      const urls = fileArray.map((file) => URL.createObjectURL(file));
      setImgURLs(urls);
      setImageFiles(fileArray);
      setForm((prev) => ({ ...prev, [name]: fileArray }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const formData = new FormData();
    //   formData.append("name", form.productName);
    //   formData.append("price", form.price);
    //   formData.append("startDate", form.startDate);
    //   formData.append("endDate", form.endDate);
    //   if (imageFile) {
    //     formData.append("image", imageFile);
    //   }
    //   const res = await createOffer(formData).unwrap();
    //   if (res?.success) {
    //     setOpenAddModel(false);
    //     setForm({
    //       productName: "",
    //       imageUrl: "",
    //       price: "",
    //       startDate: "",
    //       endDate: "",
    //     });
    //     setImgURL("");
    //     setImageFile(null);
    //     refetch();
    //     toast.success("Offer added successfully");
    //   }
    // } catch (err) {
    //   console.error("Add offer failed", err);
    //   toast.error("Add offer failed");
    // }
  };

  useEffect(() => {
    return () => {
      imgURLs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imgURLs]);

  return (
    <Modal
      centered
      open={openAddModel}
      onCancel={() => setOpenAddModel(false)}
      width={700}
      footer={false}
    >
      <div className="p-6 bg-action rounded-lg">
        <h1 className="text-[20px] font-medium mb-3 text-white">
          Add Products
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center gap-10 mb-10">
            <div className="h-32 w-full flex items-center justify-center bg-gray-300 rounded-lg relative">
              {imgURLs.length > 0 ? (
                <div className="w-full h-full flex gap-2 overflow-x-auto p-2">
                  {imgURLs.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`preview-${index}`}
                      className="h-full w-20 rounded-lg object-cover"
                    />
                  ))}
                </div>
              ) : (
                <CiImageOn className="text-5xl text-[#121212] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              )}

              <input
                onChange={handleAdd}
                type="file"
                id="img"
                name="image"
                multiple
                accept="image/*"
                className="display-none absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-50"
              />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{ display: "block", marginBottom: "5px", color: "white" }}
            >
              Product Name
            </label>
            <input
              value={form.productName}
              onChange={handleAdd}
              type="text"
              name="productName"
              placeholder="Enter Product Name"
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
          </div>

          <div className="w-full flex justify-center items-center gap-4 mb-4">
            <div className="w-1/2">
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "white",
                }}
              >
                Price
              </label>
              <input
                value={form.price}
                onChange={handleAdd}
                type="number"
                name="price"
                placeholder="Price"
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
            </div>

            <div className="w-1/2">
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "white",
                }}
              >
                Quantity
              </label>
              <input
                value={form.quantity}
                onChange={handleAdd}
                type="number"
                name="quantity"
                placeholder="Quantity"
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
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{ display: "block", marginBottom: "5px", color: "white" }}
            >
              Sub Category
            </label>
            <select
              name="subCategory"
              value={form.subCategory}
              onChange={handleAdd}
              style={{
                border: "1px solid #E0E4EC",
                padding: "10px",
                height: "52px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
              }}
            >
              <option value="">Select a Sub Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home_appliance">Home Appliance</option>
              <option value="beauty">Beauty</option>
              <option value="sports">Sports</option>
            </select>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{ display: "block", marginBottom: "5px", color: "white" }}
            >
              Product Size
            </label>
            <input
              value={form.productSize}
              onChange={handleAdd}
              type="text"
              name="productSize"
              placeholder="Enter Product Size"
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
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{ display: "block", marginBottom: "5px", color: "white" }}
            >
              Description
            </label>
            <textarea
              value={form.description}
              onChange={handleAdd}
              type="text"
              name="description"
              placeholder="Description"
              style={{
                border: "1px solid #E0E4EC",
                padding: "10px",
                height: "100px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
                width: "100%",
              }}
            />
          </div>

          <input
            className="cursor-pointer"
            style={{
              border: "none",
              width: "100%",
              height: "44px",
              marginTop: "10px",
              background: "#13333A",
              color: "white",
              borderRadius: "8px",
              outline: "none",
              padding: "10px 20px",
            }}
            value="Submit"
            type="submit"
          />
        </form>
      </div>
    </Modal>
  );
};

export default AddProductsModal;
