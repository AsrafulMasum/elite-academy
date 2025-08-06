import { Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import ChipsInput from "./ChipsInput";
import { useAddProductMutation } from "../../redux/features/productApi";
import { useGetSubCategoriesQuery } from "../../redux/features/categoriesApi";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";

const AddProductsModal = ({ openAddModel, setOpenAddModel, refetch }) => {
  const [imgURLs, setImgURLs] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    quantity: "",
    description: "",
    subcategory: "",
    image: [],
  });

  const [addProduct, { isLoading, isError }] = useAddProductMutation();
  const { data: subCategoryData, isLoading: categoryLoading } =
    useGetSubCategoriesQuery();

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
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("price", form.price);
      formData.append("quantity", form.quantity);
      formData.append("subcategory", form.subcategory);
      formData.append("description", form.description);

      if (imageFiles && imageFiles.length > 0) {
        imageFiles.forEach((file) => {
          formData.append("image", file);
        });
      }

      formData.append("sizes", JSON.stringify(tags));
      const res = await addProduct(formData).unwrap();
      if (res?.success) {
        setOpenAddModel(false);
        setForm({
          title: "",
          price: "",
          quantity: "",
          subcategory: "",
          description: "",
          image: [],
        });
        setImgURLs([]);
        setImageFiles([]);
        setTags([]);
        refetch();
        toast.success(res?.message);
      }
    } catch (err) {
      console.error("Add offer failed", err);
      toast.error("Add offer failed");
    }
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
      <div className="p-6 rounded-lg">
        <h1 className="text-[20px] font-medium mb-3 text-black">
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
              style={{ display: "block", marginBottom: "5px", color: "gray" }}
            >
              Product Name
            </label>
            <input
              value={form.title}
              onChange={handleAdd}
              type="text"
              name="title"
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
                  color: "gray",
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
                  color: "gray",
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
              style={{ display: "block", marginBottom: "5px", color: "gray" }}
            >
              Sub Category
            </label>
            {categoryLoading ? (
              <Spin />
            ) : (
              <select
                name="subcategory"
                value={form.subcategory}
                onChange={handleAdd}
                placeholder="Select Sub Category"
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
                <option value="" disabled>
                  Select a subcategory
                </option>
                {subCategoryData?.data &&
                  subCategoryData?.data.map((sCategory) => (
                    <option key={sCategory?._id} value={sCategory?._id}>
                      {sCategory?.name}
                    </option>
                  ))}
              </select>
            )}
          </div>

          <ChipsInput tags={tags} setTags={setTags} />

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{ display: "block", marginBottom: "5px", color: "gray" }}
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

          <button
            type="submit"
            className="bg-[#2E7A8A] px-6 py-3 w-full text-[#FEFEFE] rounded-lg flex items-center justify-center gap-2"
          >
            {isLoading && <ImSpinner9 size={20} className="animate-spin" />}
            {isLoading ? "Uploading" : "Upload"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddProductsModal;
