import { Modal } from "antd";
import { useEffect, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { imageUrl } from "../../redux/api/baseApi";
import { useGetSubCategoriesQuery } from "../../redux/features/categoriesApi";
import ChipsInput from "./ChipsInput";
import { useUpdateProductMutation } from "../../redux/features/productApi";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";

const EditProductsModal = ({
  openEditModel,
  setOpenEditModel,
  product,
  refetch,
}) => {
  const [imgURLs, setImgURLs] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const { data: subCategoryData, isLoading: categoryLoading } =
    useGetSubCategoriesQuery();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const [tags, setTags] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    quantity: "",
    subcategory: "",
    description: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        title: product?.title || "",
        price: product?.price || "",
        quantity: product?.quantity || "",
        subcategory: product?.subcategory || "",
        productSize: [],
        description: product?.description || "",
      });

      if (product?.sizes && Array.isArray(product?.sizes)) {
        setTags(product?.sizes);
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
    const res = await updateProduct({ id: product?._id, formData });

    if (res?.data?.success) {
      setForm({
        title: "",
        image: [],
        price: "",
        quantity: "",
        subcategory: "",
        description: "",
      });
      toast.success(res?.data?.message);
      setTags([]);
      refetch();
      setImgURLs([]);
      setImageFiles([]);
    }
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
      onCancel={() => {
        setOpenEditModel(false);
      }}
      width={700}
      footer={false}
    >
      <div className="p-6 rounded-lg">
        <h1 className="text-[20px] font-medium mb-3 text-black">
          Edit Product
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center gap-10 mb-10">
            <div className="h-32 w-full flex items-center justify-center bg-gray-300 rounded-lg relative">
              {imgURLs.length || product?.images?.length > 0 ? (
                <div className="w-full max-h-32 overflow-x-auto overflow-y-hidden p-2">
                  <div className="w-full h-full flex gap-2 overflow-x-auto p-2">
                    {imgURLs?.length > 0
                      ? imgURLs?.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`preview-${index}`}
                            className="h-full w-20 rounded-lg object-cover"
                          />
                        ))
                      : product?.images?.map((url, index) => (
                          <img
                            key={index}
                            src={
                              url?.startsWith("http")
                                ? url
                                : url
                                ? `${imageUrl}${url}`
                                : "/default-avatar.jpg"
                            }
                            alt={`preview-${index}`}
                            className="h-full w-20 rounded-lg object-cover z-[99]"
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
            { label: "Product Name", name: "title", type: "text" },
            { label: "Price", name: "price", type: "number" },
            { label: "Quantity", name: "quantity", type: "number" },
          ].map((input) => (
            <div style={{ marginBottom: "16px" }} key={input.name}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  color: "gray",
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
              style={{ display: "block", marginBottom: "5px", color: "gray" }}
            >
              Sub Category
            </label>
            <select
              name="subcategory"
              value={form.subcategory}
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
              {subCategoryData &&
                subCategoryData?.data.map((sCategory) => (
                  <option key={sCategory?._id} value={sCategory?._id}>
                    {sCategory?.name}
                  </option>
                ))}
            </select>
          </div>

          <ChipsInput tags={tags} setTags={setTags} />

          {/* Description */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{ display: "block", marginBottom: "5px", color: "gray" }}
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

export default EditProductsModal;
