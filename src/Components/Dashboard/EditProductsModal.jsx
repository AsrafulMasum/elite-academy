import { Modal } from "antd";
import { useEffect, useState } from "react";
import { CiImageOn } from "react-icons/ci";

const EditProductsModal = ({ openEditModel, setOpenEditModel, product }) => {
  const [imgURLs, setImgURLs] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const [form, setForm] = useState({
    productName: "",
    image: [],
    price: "",
    quantity: "",
    subCategory: "",
    productSize: "",
    description: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        productName: product.productsName || "",
        price: product.price || "",
        quantity: product.stock || "",
        subCategory: product.category || "",
        productSize: product.productSize || "",
        description: product.description || "",
        image: [],
      });

      if (product.imageUrls && Array.isArray(product.imageUrls)) {
        setImgURLs(product.imageUrls);
      }
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files?.length > 0) {
      const fileArray = Array.from(files);
      const urls = fileArray.map((file) => URL.createObjectURL(file));
      setImgURLs(urls);
      setImageFiles(fileArray);
      setForm((prev) => ({ ...prev, image: fileArray }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Submit logic here
    console.log("Editing product:", form, imageFiles);

    // Reset and close
    setOpenEditModel(false);
  };

  useEffect(() => {
    return () => {
      imgURLs.forEach((url) => URL.revokeObjectURL?.(url));
    };
  }, [imgURLs]);

  return (
    <Modal
      centered
      open={openEditModel}
      onCancel={() => setOpenEditModel(false)}
      width={700}
      footer={false}
    >
      <div className="p-6 bg-action rounded-lg">
        <h1 className="text-[20px] font-medium mb-3 text-white">
          Edit Product
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center gap-10 mb-10">
            <div className="h-32 w-full flex items-center justify-center bg-gray-300 rounded-lg relative">
              {imgURLs.length > 0 ? (
                <div className="w-full max-h-32 overflow-x-auto overflow-y-hidden p-2">
                  <div className="flex gap-2 w-max">
                    {imgURLs.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`preview-${index}`}
                        className="h-28 w-28 object-cover rounded-md flex-shrink-0"
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <CiImageOn className="text-5xl text-[#121212] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              )}
              <input
                onChange={handleChange}
                type="file"
                name="image"
                multiple
                accept="image/*"
                className="display-none absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-50"
              />
            </div>
          </div>

          {[
            { label: "Product Name", name: "productName", type: "text" },
            { label: "Price", name: "price", type: "number" },
            { label: "Quantity", name: "quantity", type: "number" },
            {
              label: "Product Size",
              name: "productSize",
              type: "text",
              placeholder: "Enter sizes separated by commas",
            },
          ].map((input) => (
            <div style={{ marginBottom: "16px" }} key={input.name}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "white",
                }}
              >
                {input.label}
              </label>
              <input
                value={form[input.name]}
                onChange={handleChange}
                type={input.type}
                name={input.name}
                placeholder={input.placeholder || input.label}
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
          ))}

          {/* Subcategory */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{ display: "block", marginBottom: "5px", color: "white" }}
            >
              Sub Category
            </label>
            <select
              name="subCategory"
              value={form.subCategory}
              onChange={handleChange}
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

          {/* Description */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{ display: "block", marginBottom: "5px", color: "white" }}
            >
              Description
            </label>
            <textarea
              value={form.description}
              onChange={handleChange}
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
            value="Update"
            type="submit"
          />
        </form>
      </div>
    </Modal>
  );
};

export default EditProductsModal;
