import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef } from "react";
import { toast } from "react-toastify";
import { getSubs, moveSubCategory } from "../../utils/categories";

const MoveSubModal = ({
  id,
  setMoveSubModalOpen,
  categories,
  selectedCategory,
  setSubCategories,
}) => {
  const cat = useRef();
  const transferSubCategory = async () => {
    if (!cat.current.value) {
      toast.error("You must select a category");
      return;
    }
    let res = await moveSubCategory(id, { categoryId: cat.current.value });
    if (res?.isSuccess) {
      let subs = await getSubs(selectedCategory?.id);
      setSubCategories(subs?.data || []);
      toast.success("Subcategory moved successfully");
      setMoveSubModalOpen(false);
    }
  };
  return (
    <>
      <div
        className="fixed soft top-0 left-0 w-screen h-screen bg-black bg-opacity-40 z-40"
        onClick={() => setMoveSubModalOpen(false)}
      />
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white px-6 py-10 rounded-3xl w-[90%] md:w-[500px] lg:w-[600px] space-y-5 text-center">
          <Icon
            icon="fluent:arrow-move-24-regular"
            className="bg-[#FEF8FF] w-14 h-14 p-2 text-[#984D9F] rounded-lg cursor-pointer mx-auto"
          />
          <h1 className="text-xl font-bold text-[#E2508D]">
            Subcategory Transfer Confirmation
          </h1>
          <p className="text-sm max-w-[400px] mx-auto text-[#434343]">
            You are about to move this subcategory to a new category. Please
            confirm your selection. Once moved, all related items will be
            organized under the new category.
          </p>
          <label htmlFor="cat" className="text-[#984D9F] block">
            Choose Category
          </label>
          <select
            name="cat"
            id="cat"
            className="input !w-[300px] p-2 border border-gray-300 rounded-md"
            defaultValue=""
            ref={cat}
          >
            <option value="" disabled hidden>
              Category Name
            </option>
            {categories?.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <div className="center gap-5">
            <button
              onClick={() => transferSubCategory()}
              className="px-8 py-3 bg-primary text-white text-sm rounded-full focus:outline-none  border border-transparent"
            >
              Confirm Transfer
            </button>
            <button
              onClick={() => setMoveSubModalOpen(false)}
              className="px-8 py-3 rounded-full text-sm border bg-[#FEF8FF] text-black"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoveSubModal;
