import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlog } from "../../utils/blogs";
import { getAllCategories, getAllSubCategories } from "../../utils/categories";

const ViewBlog = () => {
  const [blog, setBlog] = useState({});
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const params = useParams();
  useEffect(() => {
    const getAllCategoriesAndSubs = async () => {
      let cat = await getAllCategories("Blogs");
      setCategories(cat?.data);
      let subs = await getAllSubCategories("Blogs");
      setSubCategories(subs?.data);
    };
    const fetchBlog = async () => {
      const blog = await getBlog(params?.id);
      setBlog(blog.data);
    };
    getAllCategoriesAndSubs();
    fetchBlog();
  }, []);
  return (
    <div className="px-6">
      <h1 className="font-bold text-xl mb-5">{blog?.title}</h1>
      <div className="relative w-full h-52 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={`http://localhost:5000${blog?.imageURL}`}
          alt=""
          className="w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex gap-3 mb-5 mt-3">
        <div className="py-2 px-4 bg-[#FFF2F7] rounded-lg">
          {categories?.filter((cat) => cat.id === blog?.categoryId)?.[0]
            ?.name || ""}
        </div>
        <div className="py-2 px-4 bg-[#FFF2F7] rounded-lg">
          {subCategories?.filter((sub) => sub.id === blog?.subCategoryId)?.[0]
            ?.name || ""}
        </div>
      </div>
      <div className="space-y-5">
        <div>
          <p className="font-bold">Introduction</p>
          <p>{blog?.intro}</p>
        </div>
        <div>
          <p className="font-bold">Main Body</p>
          <p>{blog?.content}</p>
        </div>
        <div>
          <p className="font-bold">Conclusion</p>
          <p>{blog?.conclusion}</p>
        </div>
      </div>
      <div className="flex gap-3 mt-5">
        <Link
          to={`/blogs/update-blog/${params?.id}`}
          className="px-8 py-3 bg-primary text-white  rounded-full focus:outline-none  border border-transparent"
        >
          Edit this blog
        </Link>
        <Link
          to={"/blogs"}
          type="button"
          className="px-8 py-3 text-primary rounded-full border border-primary"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default ViewBlog;
