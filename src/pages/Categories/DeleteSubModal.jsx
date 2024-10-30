import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef, useState } from "react";
import { deleteSubCategory, getSubs } from "../../utils/categories";

const DeleteSubModal = ({
  subCategories,
  subCategoryToDelete,
  setDeleteSubCategoryModal,
  setSubCategories,
  selectedCategory,
}) => {
  const sub = useRef();
  const [error, setError] = useState(false);
  const moveAndDeleteSubCategory = async () => {
    if (!sub.current.value) {
      setError(true);
      return;
    }
    console.log(sub.current.value);
    
  };
  const justDeleteSubCategory = async () => {
    let response = await deleteSubCategory(subCategoryToDelete);
    if (response?.isSuccess) {
      let subs = await getSubs(selectedCategory?.id);
      setSubCategories(subs?.data || []);
      setDeleteSubCategoryModal(false);
    }
  };
  return (
    <>
      <div
        className="fixed soft top-0 left-0 w-screen h-screen bg-black bg-opacity-40 z-40"
        onClick={() => setDeleteSubCategoryModal(false)}
      />
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white px-6 py-10 rounded-3xl w-[90%] md:w-[500px] lg:w-[600px] space-y-5 text-center">
          <Icon
            icon="fluent:delete-24-regular"
            className="bg-red-700 w-14 h-14 p-2 text-white rounded-lg cursor-pointer mx-auto"
          />
          <h1 className="text-2xl font-bold text-[#E2508D]">
            Delete This Subcategory ?
          </h1>
          <p className="text-sm max-w-[500px] mx-auto text-[#434343]">
            Before deleting this subcategory, you need to move its content to
            another subcategory. Please select a new subcategory from the
            dropdown below to transfer the content, then proceed with deleting
            the subcategory.
          </p>
          <label htmlFor="cat" className="text-[#984D9F] block">
            Choose a Subcategory
          </label>
          <select
            name="cat"
            id="cat"
            className={`input !w-[350px] p-2 border border-gray-300 rounded-md ${
              error && "!border-red-500"
            }`}
            onFocus={() => setError(false)}
            defaultValue=""
            ref={sub}
          >
            <option value="" disabled hidden>
              Subcategory Name
            </option>
            {subCategories
              ?.filter((sub) => sub.id !== subCategories.id)
              .map((sub) => {
                return (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                );
              })}
          </select>
          {error && (
            <p className="text-red-500 text-xs">Please select a Sub Category</p>
          )}
          <div className="center gap-3">
            <button
              onClick={() => moveAndDeleteSubCategory()}
              className="px-8 py-3 bg-primary text-white text-xs rounded-full focus:outline-none  border border-transparent"
            >
              Move and Delete SubCategory
            </button>
            <button
              onClick={() => {
                justDeleteSubCategory();
                setDeleteSubCategoryModal(false);
              }}
              className="px-8 py-3 rounded-full text-xs border bg-[#FEF8FF] text-black"
            >
              Delete Category With Data
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteSubModal;
