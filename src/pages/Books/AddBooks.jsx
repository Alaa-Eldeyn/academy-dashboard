import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addBook, getBook, schema } from "../../utils/books";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

const AddBooks = ({ isUpdateMode, details }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [bookCover, setBookCover] = useState(null);
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBookCover(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setBookCover(null);
    }
  };
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const handleAddBook = async () => {
    if (getValues("cover")?.length < 1) {
      toast.error("Please upload a cover photo");
      return;
    }
    const data = new FormData();
    data.append("Title", getValues("name"));
    data.append("Description", getValues("description"));
    data.append("Thumbnail", getValues("cover.0"));
    data.append("Url", getValues("downloadLink"));
    data.append("SubCategoryId", getValues("subcategory"));
    data.append("CategoryId", getValues("category"));

    let response = await addBook(data);
    if (response?.isSuccess) {
      toast.success("Book added successfully");
      return navigate("/books");
    } else {
      toast.error("Failed to add book");
    }
  };
  const handleUpdateBook = async () => {
    const data = new FormData();
    data.append("Title", getValues("name"));
    data.append("Description", getValues("description"));
    data.append("Thumbnail", getValues("cover.0"));
    data.append("Url", getValues("downloadLink"));
    data.append("SubCategoryId", getValues("subcategory"));
    data.append("CategoryId", getValues("category"));

    let response = await addBook(data);
    if (response?.isSuccess) {
      toast.success("Book Updated successfully");
      return navigate("/books");
    } else {
      toast.error("Failed to update book");
    }
  };

  useEffect(() => {
    if (details || isUpdateMode) {
      const fetchBook = async () => {
        const book = await getBook(params?.id);
        setValue("name", book?.data?.title);
        setValue("description", book?.data?.description);
        setValue("category", book?.data?.categoryId.toString());
        setValue("subcategory", book?.data?.subCategoryId.toString());
        setValue("downloadLink", book?.data?.downloadLink);
        setBookCover(book?.data?.thumbnailURL);
      };
      fetchBook();
    }
  }, [isUpdateMode, details, params?.id]);

  return (
    <div className="px-6">
      <h1 className="font-bold text-xl mb-8">Add a Books</h1>
      <div>
        <form className="flex gap-8 flex-col md:flex-row">
          <div
            className="flex w-fit h-fit"
            onClick={() =>
              !details && document.getElementById("photoInput").click()
            }
          >
            <input
              type="file"
              className="hidden"
              id="photoInput"
              accept="image/*"
              {...register("cover", {
                onChange: (e) => handlePhotoChange(e),
              })}
            />
            {bookCover ? (
              <div className="relative">
                {isUpdateMode && (
                  <div className="text-md absolute -top-3 rounded-full bg-gray-300 p-1 border border-white left-1/2 -translate-x-1/2 text-gray-700">
                    <Icon icon="ic:outline-cloud-upload" />
                  </div>
                )}
                <span
                  className="w-40 h-56 rounded bg-gray-300 center cursor-pointer"
                  style={{
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundImage: `url(${bookCover})`,
                  }}
                ></span>
              </div>
            ) : (
              <div className="w-40 h-56 rounded bg-gray-300 center cursor-pointer">
                <Icon
                  icon="ic:outline-cloud-upload"
                  className="text-4xl text-gray-700"
                />
              </div>
            )}
            {errors && errors?.cover && (
              <span className="text-sm text-red-500 block">
                {errors?.cover?.message}
              </span>
            )}
          </div>
          <div className="flex-1 max-w-[600px]">
            <label htmlFor="bookName" className="text-sm mb-1 block">
              Book Name
            </label>
            <input
              type="text"
              name="bookName"
              {...register("name")}
              placeholder="Enter Your Book Name here"
              className={`${errors?.name ? "mb-0" : "mb-3"} input`}
              disabled={details}
            />
            {errors && errors?.name && (
              <span className="text-sm text-red-500 block mb-2">
                {errors?.name?.message}
              </span>
            )}

            <label className="text-sm mb-1 block">Book Description</label>
            <textarea
              {...register("description")}
              placeholder="Enter Book Description here"
              className={`${errors?.description ? "mb-0" : "mb-3"} input h-32`}
              disabled={details}
            />
            {errors && errors?.description && (
              <span className="mb-3 text-sm text-red-500 block">
                {errors?.description?.message}
              </span>
            )}

            <div className="flex justify-between">
              <div className="w-1/2 mr-2">
                <label className="text-sm mb-1 block">Book Category</label>
                <select
                  {...register("category")}
                  className={`${errors?.category ? "mb-0" : "mb-3"} input`}
                  defaultValue={""}
                  disabled={details}
                >
                  <option value="" disabled hidden>
                    Choose Category
                  </option>
                  <option value="1">Anatomy</option>
                  <option value="2">Biology</option>
                </select>
                {errors && errors?.category && (
                  <span className="mb-3 text-sm text-red-500 block">
                    {errors?.category?.message}
                  </span>
                )}
              </div>

              <div className="w-1/2 ml-2">
                <label className="text-sm mb-1 block">Book Subcategory</label>
                <select
                  {...register("subcategory")}
                  className={`${errors?.subcategory ? "mb-0" : "mb-3"} input`}
                  defaultValue={""}
                  disabled={details}
                >
                  <option value="" disabled hidden>
                    Choose Subcategory
                  </option>
                  <option value="1">Anat Part</option>
                  <option value="2">Biology Part</option>
                </select>
                {errors && errors?.subcategory && (
                  <span className="mb-3 text-sm text-red-500 block">
                    {errors?.subcategory?.message}
                  </span>
                )}
              </div>
            </div>
            <label className="text-sm mb-1 block">Download Link</label>
            <input
              type="text"
              {...register("downloadLink")}
              placeholder="Add Download Link here"
              className={`${errors?.downloadLink ? "mb-0" : "mb-3"} input`}
              disabled={details}
            />
            {errors && errors?.downloadLink && (
              <span className="mb-3 text-sm text-red-500 block">
                {errors?.downloadLink?.message}
              </span>
            )}
            <div className="flex items-center gap-3 mt-8">
              {details ? (
                <Link
                  to={`/books/update-book/${params?.id}`}
                  className="px-4 py-3 bg-gray-400 text-white  rounded-full focus:outline-none  border border-transparent"
                  disabled={isSubmitting}
                >
                  Edit Your Book Now
                </Link>
              ) : isUpdateMode ? (
                <button
                  type="button"
                  onClick={handleSubmit(handleUpdateBook)}
                  className="px-4 py-3 bg-gray-400 text-white  rounded-full focus:outline-none  border border-transparent"
                  disabled={isSubmitting}
                >
                  Save changes
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit(handleAddBook)}
                  className="px-4 py-3 bg-gray-400 text-white  rounded-full focus:outline-none  border border-transparent"
                  disabled={isSubmitting}
                >
                  Publish Your Book Now
                </button>
              )}
              <Link
                to={"/books"}
                type="button"
                className="px-8 py-3 text-black rounded-full border border-gray-400"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBooks;
