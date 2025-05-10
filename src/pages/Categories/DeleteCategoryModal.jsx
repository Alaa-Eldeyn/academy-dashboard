import { Icon } from "@iconify/react/dist/iconify.js";
import {
  deleteCategory,
  getAllCategories,
  getSubs,
  moveSubCategory,
} from "../../utils/categories";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const DeleteCategoryModal = ({
  categoryToDelete,
  setDeleteCategoryModal,
  categories,
  setCategories,
  setSubCategories,
  type,
}) => {
  const cat = useRef();
  const [error, setError] = useState(false);
  const [loadingMoveDelete, setLoadingMoveDelete] = useState(false);
  const [loadingJustDelete, setLoadingJustDelete] = useState(false);

  const moveAndDeleteCategory = async () => {
    if (!cat.current.value) {
      setError(true);
      return;
    }

    setLoadingMoveDelete(true);

    try {
      let res = await getSubs(categoryToDelete);

      if (res?.isSuccess) {
        await Promise.all(
          res?.data?.map(async (sub) => {
            return await moveSubCategory(sub?.id, {
              categoryId: cat.current.value,
            });
          })
        );
        let response = await deleteCategory(categoryToDelete);
        if (response?.isSuccess) {
          let catData = await getAllCategories(type);
          setCategories(catData?.data);
          setSubCategories([]);
          setDeleteCategoryModal(false);
        } else {
          toast.error(
            response?.message ||
              "Something went wrong while deleting category"
          );
        }
      } else if (
        res?.message === "No subcategories found for the specified category."
      ) {
        toast.info(
          "No subcategories found for the specified category, will Delete Category Directly."
        );
        let response = await deleteCategory(categoryToDelete);
        if (response?.isSuccess) {
          let catData = await getAllCategories(type);
          setCategories(catData?.data);
          setSubCategories([]);
          setDeleteCategoryModal(false);
        } else {
          toast.error(
            response?.message ||
              "Something went wrong while deleting category"
          );
        }
      } else {
        toast.error(
          res?.message || "Something went wrong while moving subcategories"
        );
      }
    } catch {
      toast.error("Unexpected error happened.");
    }

    setLoadingMoveDelete(false);
  };

  const justDeleteCategory = async () => {
    setLoadingJustDelete(true);

    try {
      let response = await deleteCategory(categoryToDelete);
      if (response?.isSuccess) {
        let catData = await getAllCategories(type);
        setCategories(catData?.data);
        setSubCategories([]);
        setDeleteCategoryModal(false);
      } else {
        toast.error(
          response?.message ||
            "Something went wrong while deleting category"
        );
      }
    } catch {
      toast.error("Unexpected error happened.");
    }

    setLoadingJustDelete(false);
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
              onClick={moveAndDeleteCategory}
              className="px-8 py-3 min-w-[230px] bg-primary text-white text-xs rounded-full focus:outline-none border border-transparent flex items-center justify-center"
              disabled={loadingMoveDelete}
            >
              {loadingMoveDelete ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                "Move and Delete Category"
              )}
            </button>
            <button
              onClick={justDeleteCategory}
              className="px-8 py-3 min-w-[230px] rounded-full text-xs border bg-[#FEF8FF] text-black flex items-center justify-center"
              disabled={loadingJustDelete}
            >
              {loadingJustDelete ? (
                <span className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full"></span>
              ) : (
                "Delete Category With Subcategories"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteCategoryModal;
