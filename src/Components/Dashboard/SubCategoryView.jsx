import { Modal } from "antd";
import { useDeleteSubCategoryMutation } from "../../redux/features/categoriesApi";
import { PiTrashLight } from "react-icons/pi";


const SubCategoryView = ({selectedCategory,  showSubModal, setShowSubModal }) => {

  const handleDeleteSubCategory = async (id) => {
    try {
      const res = await useDeleteSubCategoryMutation(id);
      if (res?.data) {
        refetch();
        toast.success("Delete Sub Category");
        setEditData(null);
        setShowSubModal(false);
      }
    } catch (error) {}
  };

  
  return (
    <Modal
      centered
      open={showSubModal}
      onCancel={() => setShowSubModal(false)}
      footer={null}
      width={500}
      className="subcategory-modal"
    >
      <div className="p-6 rounded-lg bg-white shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          {selectedCategory?.title}
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Subcategories under this category
        </p>

        <div className="max-h-60 overflow-y-auto px-4">
          <ul className="grid grid-cols-1 gap-3">
            {selectedCategory?.subcategories?.map((item, idx) => (
              <li
                key={idx}
                className="py-2 px-4 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition flex items-center justify-between"
              >
                <span>
                  {idx + 1}. {item?.name}
                </span>
                <PiTrashLight
                  onClick={() => handleDeleteSubCategory(item?._id)}
                  size={20}
                  className="hover:text-red-600 cursor-pointer"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => setShowSubModal(false)}
            className="bg-[#2E7A8A] hover:bg-[#225e6a] text-white px-6 py-2 rounded-md font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
      
    </Modal>
  );
};

export default SubCategoryView;
