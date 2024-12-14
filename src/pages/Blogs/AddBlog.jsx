import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addBlog, getBlog, schema, updateBlog } from "../../utils/blogs";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getAllCategories, getSubs } from "../../utils/categories";
import {  getUser } from "../../utils/LocalStorage";

const AddBlog = ({ isUpdateMode }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [imageName, setImageName] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const handleAddBlog = async () => {
    if (getValues("image")?.length < 1) {
      toast.error("Please upload an image");
      return;
    }
    let data = new FormData();
    let {id} = getUser();
    data.append("AuthorId", id);
    data.append("Title", getValues("name"));
    data.append("Intro", getValues("intro"));
    data.append("Content", getValues("content"));
    data.append("Conclusion", getValues("conclusion"));
    data.append("CategoryId", getValues("category"));
    data.append("SubCategoryId", getValues("subcategory"));
    data.append("image", getValues("image.0"));
    let response = await addBlog(data);
    if (response.isSuccess) {
      toast.success("Blog Added Successfully");
      navigate("/blogs");
    } else {
      toast.error("Failed to add Blog");
      console.log(response);
    }
  };
  const getCategories = async () => {
    let cat = await getAllCategories("Blogs");
    setCategories(cat?.data);
  };
  const getAllSubs = async (id) => {
    let subs = await getSubs(id);
    setSubCategories(subs?.data || []);
  };
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    if (isUpdateMode) {
      const fetchBlog = async () => {
        if (categories.length === 0) await getCategories();
        const { data } = await getBlog(params?.id);
        setValue("name", data?.title);
        setValue("intro", data?.intro);
        setValue("content", data?.content);
        setValue("conclusion", data?.conclusion);
        setValue("category", data?.categoryId?.toString() || "");
        await getAllSubs(data?.categoryId);
        setValue("subcategory", data?.subCategoryId?.toString() || "");
        setImageName(data?.imageURL?.split("/").pop());
      };
      fetchBlog();
    }
  }, [isUpdateMode, params?.id]);

  const handleUpdateBlog = async () => {
    let data = new FormData();
    data.append("Id", params?.id);
    data.append("Title", getValues("name"));
    data.append("Intro", getValues("intro"));
    data.append("Content", getValues("content"));
    data.append("Conclusion", getValues("conclusion"));
    data.append("CategoryId", getValues("category"));
    data.append("SubCategoryId", getValues("subcategory"));
    data.append("image", getValues("image.0"));
    let response = await updateBlog(data);
    if (response.isSuccess) {
      toast.success("Blog Updated Successfully");
      navigate("/blogs");
    } else {
      toast.error("Failed to update Blog");
    }
  };
  return (
    <div className="px-6">
      <form className=" max-w-[900px] ">
        <div className="mb-3">
          <label
            htmlFor="title"
            className="text-primary mb-1 block text-sm font-medium"
          >
            Blog Name
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter Blog Name"
            {...register("name")}
            className={`${errors?.name ? "mb-0" : "mb-3"} input`}
          />
          {errors && errors?.name && (
            <span className="text-red-500 text-sm">
              {errors?.name?.message}
            </span>
          )}
        </div>
        <div className="flex gap-5 mb-5">
          <div className="flex-1">
            <label
              htmlFor="category"
              className="text-primary mb-1 block text-sm font-medium"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              {...register("category", {
                onChange: (e) => {
                  setValue("subcategory", "");
                  let res = getAllSubs(e?.target?.value);
                  setSubCategories(res?.data || []);
                },
              })}
              className={`${errors?.category ? "mb-0" : "mb-3"} input`}
              defaultValue={""}
            >
              <option value="" disabled hidden>
                Select Category
              </option>
              {categories?.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
            {errors && errors?.category && (
              <span className="text-red-500 text-sm">
                {errors?.category?.message}
              </span>
            )}
          </div>
          <div className="flex-1">
            <label
              htmlFor="subcategory"
              className="text-primary mb-1 block text-sm font-medium"
            >
              Subcategory
            </label>
            <select
              id="subcategory"
              name="subcategory"
              {...register("subcategory")}
              className={`${errors?.subcategory ? "mb-0" : "mb-3"} input`}
              defaultValue={""}
            >
              <option value="" disabled hidden>
                Select Subcategory
              </option>
              {subCategories?.map((subcategory) => {
                return (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                );
              })}
            </select>
            {errors && errors?.subcategory && (
              <span className="text-red-500 text-sm">
                {errors?.subcategory?.message}
              </span>
            )}
          </div>
          <div className="flex-1">
            <label
              htmlFor="image"
              className="text-primary mb-1 block text-sm font-medium"
            >
              Image
            </label>
            <label
              htmlFor="image"
              className="input cursor-pointer relative bg-white flex items-center justify-between !pr-5"
            >
              {imageName ? (
                <p className=" line-clamp-1 ">{imageName}</p>
              ) : (
                "Upload Blog cover"
              )}
              <Icon icon="solar:upload-outline" />
              <input
                type="file"
                id="image"
                name="image"
                className={`hidden`}
                accept="image/*"
                {...register("image", {
                  onChange: (e) => setImageName(e?.target?.files?.[0]?.name),
                })}
              />
            </label>
            {errors && errors?.image && (
              <span className="text-red-500 text-sm">
                {errors?.image?.message}
              </span>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="intro"
            className="text-primary mb-1 block text-sm font-medium"
          >
            Introduction
          </label>
          <textarea
            id="intro"
            name="intro"
            placeholder="Enter Introduction"
            {...register("intro")}
            className={`${errors?.intro ? "mb-0" : "mb-3"} input`}
          ></textarea>
          {errors && errors?.intro && (
            <span className="text-red-500 text-sm">
              {errors?.intro?.message}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="content"
            className="text-primary mb-1 block text-sm font-medium"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Enter Content"
            {...register("content")}
            className={`${errors?.content ? "mb-0" : "mb-3"} input`}
          ></textarea>
          {errors && errors?.content && (
            <span className="text-red-500 text-sm">
              {errors?.content?.message}
            </span>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="conclusion"
            className="text-primary mb-1 block text-sm font-medium"
          >
            Conclusion
          </label>
          <textarea
            id="conclusion"
            name="conclusion"
            placeholder="Enter Conclusion"
            {...register("conclusion")}
            className={`${errors?.conclusion ? "mb-0" : "mb-3"} input`}
          ></textarea>
          {errors && errors?.conclusion && (
            <span className="text-red-500 text-sm">
              {errors?.conclusion?.message}
            </span>
          )}
        </div>
        <div className="flex gap-3">
          {isUpdateMode ? (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit(handleUpdateBlog)}
              className="px-8 py-3 bg-primary text-white  rounded-full focus:outline-none  border border-transparent"
            >
              Publish this Blog
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit(handleAddBlog)}
              className="px-8 py-3 bg-primary text-white  rounded-full focus:outline-none  border border-transparent"
            >
              Publish this Blog
            </button>
          )}
          <Link to={"/blogs"} type="button" className="second-btn">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
