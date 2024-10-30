import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import {
  addCategory,
  addSubCategory,
  getAllCategories,
  getSubs,
} from "../../utils/categories";
import { toast } from "react-toastify";
import MoveSubModal from "./MoveSubModal";
import DeleteSubModal from "./DeleteSubModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

const Blogs = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubCategoryName, setNewSubCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});
  const [subCategoryId, setSubCategoryId] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState("");
  const [MoveSubModalOpen, setMoveSubModalOpen] = useState(false);
  const [deleteSubCategoryModal, setDeleteSubCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  const getAllSubs = async (id) => {
    let subs = await getSubs(id);
    setSubCategories(subs?.data || []);
  };
  const addNewCategory = async () => {
    if (!newCategoryName) {
      toast.error("You must enter a category name");
      return;
    }
    let res = await addCategory(newCategoryName, "Blogs");
    if (res?.isSuccess) {
      toast.success("Category added successfully");
      setNewCategoryName("");
      let cat = await getAllCategories("Blogs");
      setCategories(cat?.data);
    }
  };
  const addNewSubCategory = async () => {
    if (!newSubCategoryName || !document.getElementById("cat").value) {
      toast.error("You must enter a sub category name");
      return;
    }
    let data = {
      name: newSubCategoryName,
      categoryId: document.getElementById("cat").value,
    };
    let res = await addSubCategory(data);
    if (res?.isSuccess) {
      toast.success("Sub category added successfully");
      setNewSubCategoryName("");
      let subs = await getSubs(selectedCategory?.id);
      setSubCategories(subs?.data || []);
    }
  };
  useEffect(() => {
    const getCategories = async () => {
      let cat = await getAllCategories("Blogs");
      setCategories(cat?.data);
    };
    getCategories();
  }, []);

  return (
    <>
      {MoveSubModalOpen && (
        <MoveSubModal
          id={subCategoryId}
          setMoveSubModalOpen={setMoveSubModalOpen}
          categories={categories}
          selectedCategory={selectedCategory}
          setSubCategories={setSubCategories}
        />
      )}
      {deleteSubCategoryModal && (
        <DeleteSubModal
          subCategoryToDelete={subCategoryId}
          subCategories={subCategories}
          setDeleteSubCategoryModal={setDeleteSubCategoryModal}
          setSubCategories={setSubCategories}
          selectedCategory={selectedCategory}
        />
      )}
      {deleteCategoryModal && (
        <DeleteCategoryModal
          categoryToDelete={categoryToDelete}
          categories={categories}
          setCategories={setCategories}
          setDeleteCategoryModal={setDeleteCategoryModal}
          setSubCategories={setSubCategories}
          type="Blogs"
        />
      )}
      <div className="flex gap-5 flex-wrap">
        <div className="bg-white p-5 rounded-lg w-[420px]">
          <h1 className="font-bold text-xl">Categories</h1>
          <p className="my-3">Add a new category</p>
          <form className="flex gap-3">
            <input
              type="text"
              placeholder="Category name"
              className="input"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e?.target?.value)}
            />
            <button
              onClick={() => addNewCategory()}
              type="button"
              className="px-8 py-2 text-white bg-[#E2508D] rounded-lg cursor-pointer select-none soft"
            >
              Add
            </button>
          </form>
        </div>
        <div className="bg-white p-5 rounded-lg">
          <h1 className="font-bold text-xl mb-3">Sub Blogs</h1>
          <form className="flex gap-3 items-end flex-wrap">
            <div>
              <label htmlFor="cat" className="mb-3 block">
                Select a category
              </label>
              <select
                className="input h-[50px] min-w-56"
                id="cat"
                defaultValue={""}
              >
                <option value="" disabled hidden>
                  Choose category
                </option>
                {categories?.map(({ id, name }) => {
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="subCat" className=" mb-3 block">
                Add a new sub category
              </label>
              <input
                type="text"
                placeholder="Sub category name"
                className="input"
                id="subCat"
                value={newSubCategoryName}
                onChange={(e) => setNewSubCategoryName(e?.target?.value)}
              />
            </div>
            <button
              onClick={() => addNewSubCategory()}
              type="button"
              className="px-8 py-2 text-white bg-[#E2508D] rounded-lg cursor-pointer select-none soft h-12"
            >
              Add
            </button>
          </form>
        </div>
      </div>
      <div>
        <h2 className="font-bold mt-8 mb-5 text-xl">My Added Categories</h2>
        <div className="flex gap-10 flex-wrap">
          <div className=" w-full sm:w-[420px] ">
            <h3 className="font-bold mb-2">Categories</h3>
            <ul className="h-80 p-2 !pl-0 rounded-lg overflow-auto space-y-2 pink-sc">
              {categories?.map(({ id, name }, i) => {
                return (
                  <li
                    key={i}
                    className={`bg-white cursor-pointer shadow-sm select-none rounded-lg flex items-center justify-between border border-transparent hover:border-[#E2508D] soft ${
                      selectedCategory.name === name && "border-[#E2508D]"
                    }`}
                  >
                    <span
                      onClick={() => {
                        setSelectedCategory({ id, name });
                        getAllSubs(id);
                      }}
                      className="flex-1 line-clamp-1 px-4 py-3"
                    >
                      {name}
                      <span className="bg-[#FFF2F7] inline-block text-black text-xs rounded-full mx-3 py-1 px-3">
                        10 Sub Categories
                      </span>
                    </span>
                    <span>
                      <Icon
                        onClick={() => {
                          setCategoryToDelete(id);
                          setDeleteCategoryModal(true);
                        }}
                        icon="fluent:delete-28-regular"
                        className="bg-[#FFF2F7] w-8 h-8 p-2 mr-4 text-[#E23F3F] rounded-lg cursor-pointer"
                      />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className=" w-full sm:w-[420px] ">
            <h3 className="font-bold mb-2">Sub Categories</h3>
            <ul className="h-80 p-2 !pl-0 rounded-lg overflow-auto space-y-2 pink-sc">
              {selectedCategory ? (
                subCategories?.map(({ id, name }, i) => {
                  return (
                    <li
                      key={i}
                      className="bg-white shadow-sm px-4 py-2 rounded-lg flex items-center justify-between"
                    >
                      <span className="flex-1 line-clamp-1">
                        {name}
                        <span className="bg-[#FFF2F7] inline-block text-black text-xs rounded-full mx-3 py-1 px-3">
                          Category name
                        </span>
                      </span>
                      <span className="center gap-3">
                        <Icon
                          icon="fluent:arrow-move-24-regular"
                          onClick={() => {
                            setSubCategoryId(id);
                            setMoveSubModalOpen(true);
                          }}
                          className="bg-[#FEF8FF] w-8 h-8 p-2 text-[#984D9F] rounded-lg cursor-pointer"
                        />
                        <Icon
                          icon="fluent:delete-28-regular"
                          onClick={() => {
                            setSubCategoryId(id);
                            setDeleteSubCategoryModal(true);
                          }}
                          className="bg-[#FFF2F7] w-8 h-8 p-2 text-[#E23F3F] rounded-lg cursor-pointer"
                        />
                      </span>
                    </li>
                  );
                })
              ) : (
                <p className="text-center">
                  Select a category to view sub categories
                </p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
