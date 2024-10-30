import { Icon } from "@iconify/react/dist/iconify.js";
import {
  deleteCategory,
  getAllCategories,
  getSubs,
  moveSubCategory,
} from "../../utils/categories";
import { useRef, useState } from "react";

const DeleteCategoryModal = ({
  categoryToDelete,
  setDeleteCategoryModal,
  categories,
  setCategories,
  setSubCategories,
  type
}) => {
  const cat = useRef();
  const [error, setError] = useState(false);
  const moveAndDeleteCategory = async () => {
    if (!cat.current.value) {
      setError(true);
      return;
    }

    let { data } = await getSubs(categoryToDelete);
    await Promise.all(
      data?.map(async (sub) => {
        return await moveSubCategory(sub?.id, {
          categoryId: cat.current.value,
        });
      })
    );

    let response = await deleteCategory(categoryToDelete);
    if (response?.isSuccess) {
      let cat = await getAllCategories(type);
      setCategories(cat?.data);
      setSubCategories([]);
      setDeleteCategoryModal(false);
    }
  };
  const justDeleteCategory = async () => {
    let response = await deleteCategory(categoryToDelete);
    if (response?.isSuccess) {
      let cat = await getAllCategories(type);
      setCategories(cat?.data);
      setSubCategories([]);
      setDeleteCategoryModal(false);
    }
  };

  return (
    <>
      <div
        className="fixed soft top-0 left-0 w-screen h-screen bg-black bg-opacity-40 z-40"
        onClick={() => setDeleteCategoryModal(false)}
      />
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white px-6 py-10 rounded-3xl w-[90%] md:w-[500px] lg:w-[600px] space-y-5 text-center">
          <Icon
            icon="fluent:delete-24-regular"
            className="bg-red-700 w-14 h-14 p-2 text-white rounded-lg cursor-pointer mx-auto"
          />
          <h1 className="text-2xl font-bold text-[#E2508D]">
            Delete This Category ?
          </h1>
          <p className="text-sm max-w-[500px] mx-auto text-[#434343]">
            Before deleting this category, you need to move the subcategories
            within it to another category. Please select a new category from the
            dropdown below to transfer the subcategories, then proceed with
            deleting the category.
          </p>
          <label htmlFor="cat" className="text-[#984D9F] block">
            Choose a Category
          </label>
          <select
            name="cat"
            id="cat"
            className={`input !w-[350px] p-2 border border-gray-300 rounded-md ${
              error && "!border-red-500"
            }`}
            onFocus={() => setError(false)}
            defaultValue=""
            ref={cat}
          >
            <option value="" disabled hidden>
              Category Name
            </option>
            {categories
              ?.filter((category) => category.id !== categoryToDelete)
              .map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
          </select>
          {error && (
            <p className="text-red-500 text-xs">Please select a category</p>
          )}
          <div className="center gap-3">
            <button
              onClick={() => moveAndDeleteCategory()}
              className="px-8 py-3 bg-primary text-white text-xs rounded-full focus:outline-none  border border-transparent"
            >
              Move and Delete Category
            </button>
            <button
              onClick={() => {
                justDeleteCategory();
                setDeleteCategoryModal(false);
              }}
              className="px-8 py-3 rounded-full text-xs border bg-[#FEF8FF] text-black"
            >
              Delete Category With Subcategories
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteCategoryModal;
