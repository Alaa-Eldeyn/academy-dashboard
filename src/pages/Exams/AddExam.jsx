import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllSubCategories } from "../../utils/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addExam, schema, getExam, updateExam } from "../../utils/Exams";
import { toast } from "react-toastify";

const AddExam = ({ isUpdateMode }) => {
  let params = useParams();
  const [isPaid, setIsPaid] = useState(true);
  const [subCategories, setSubCategories] = useState([]);
  let navigate = useNavigate();
  const handleToggle = () => {
    setIsPaid(!isPaid);
  };
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const handleAddExam = async () => {
    if (!Number.isInteger(+getValues("price"))) {
      toast.error("السعر يجب أن يكون عدد صحيح");
      return;
    }
    let data = {
      title: getValues("examName"),
      fullmark: +getValues("fullMark"),
      subCategoryId: +getValues("subCategoryID"),
      durationInMinutes: +getValues("duration"),
      type: +isPaid,
      price: isPaid ? +getValues("price") : 0,
      difficulty: +getValues("difficulty"),
    };
    let res = await addExam(data);
    if (res?.isSuccess) {
      toast.success("Exam Added Successfully");
      navigate(`/exams/exam-questions/${res?.data?.id}`);
    }
  };
  const handleUpdateExam = async () => {
    if (!Number.isInteger(+getValues("price"))) {
      toast.error("السعر يجب أن يكون عدد صحيح");
      return;
    }
    let data = {
      title: getValues("examName"),
      fullmark: +getValues("fullMark"),
      subCategoryId: +getValues("subCategoryID"),
      durationInMinutes: +getValues("duration"),
      type: +isPaid,
      price: isPaid ? +getValues("price") : 0,
      difficulty: +getValues("difficulty"),
    };
    let res = await updateExam(params?.id, data);
    if (res?.isSuccess) {
      toast.success("Exam Updated Successfully");
      navigate(`/exams/exam-questions/${res?.data?.id}`);
    }
  };
  useEffect(() => {
    const getAllSubs = async () => {
      let res = await getAllSubCategories("Exams");
      setSubCategories(res?.data);
    };
    getAllSubs();
  }, []);
  useEffect(() => {
    if (isUpdateMode) {
      const fetchExam = async () => {
        let { data } = await getExam(params?.id);
        setValue("examName", data?.title);
        setValue("subCategoryID", data?.subCategoryId?.toString());
        setValue("difficulty", data?.difficulty?.toString());
        setValue("duration", data?.durationInMinutes?.toString());
        setValue("fullMark", data?.fullmark?.toString());
        setValue("price", data?.price?.toString());
        setIsPaid(data?.type === 1);
      };
      fetchExam();
    }
  }, [isUpdateMode, params?.id]);
  return (
    <div className="px-6 max-w-[1000px]">
      <form className="space-y-4">
        <div>
          <label>Exam Name</label>
          <input
            type="text"
            placeholder="Enter Exam Title"
            className={`${errors?.examName ? "mb-0" : "mb-3"} input`}
            {...register("examName")}
          />
          {errors && errors?.examName && (
            <span className="text-red-500">{errors?.examName?.message}</span>
          )}
        </div>
        <div className="flex gap-5">
          <div className="flex-1">
            <label>Sub Category</label>
            <select
              className={`${errors?.subCategoryID ? "mb-0" : "mb-3"} input`}
              defaultValue={""}
              {...register("subCategoryID")}
            >
              <option value="" hidden disabled>
                Select Sub Category
              </option>
              {subCategories?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors && errors?.subCategoryID && (
              <span className="text-red-500">
                {errors?.subCategoryID?.message}
              </span>
            )}
          </div>
          <div className="flex-1">
            <div className="center mt-8">
              <label className="relative inline-block w-10 mr-2">
                <input
                  type="checkbox"
                  checked={isPaid}
                  onChange={handleToggle}
                  className="hidden"
                />
                <span
                  className={`block w-10 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
                    isPaid ? "bg-primary" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-0 w-4 h-4 m-1 bg-white rounded-full shadow-md soft ${
                      isPaid ? "translate-x-4" : ""
                    }`}
                  />
                </span>
              </label>
              <span
                onClick={handleToggle}
                className="select-none cursor-pointer"
              >
                Exam is {isPaid ? "Paid" : "Free"}
              </span>
            </div>
          </div>
          <div className={`flex-1 ${!isPaid && "invisible"}`}>
            <label>Paid Subscription ($)</label>
            <input
              type="number"
              placeholder="Enter Price"
              className={`input`}
              {...register("price")}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex-1">
            <label>difficulty</label>
            <select
              className={`${errors?.difficulty ? "mb-0" : "mb-3"} input`}
              defaultValue={""}
              {...register("difficulty")}
            >
              <option value="" hidden disabled>
                Select difficulty level
              </option>
              <option value="0">Easy</option>
              <option value="1">Medium</option>
              <option value="2">Hard</option>
            </select>
            {errors && errors?.difficulty && (
              <span className="text-red-500">
                {errors?.difficulty?.message}
              </span>
            )}
          </div>
          <div className="flex-1">
            <label>Duration (Minutes)</label>
            <input
              type="number"
              placeholder="Enter Duration in minutes"
              className={`${errors?.duration ? "mb-0" : "mb-3"} input`}
              step={0.5}
              {...register("duration")}
            />
            {errors && errors?.duration && (
              <span className="text-red-500">{errors?.duration?.message}</span>
            )}
          </div>
          <div className="flex-1">
            <label>Full Mark</label>
            <input
              type="number"
              placeholder="Enter Full Mark"
              className={`${errors?.fullMark ? "mb-0" : "mb-3"} input`}
              {...register("fullMark")}
            />
            {errors && errors?.fullMark && (
              <span className="text-red-500">{errors?.fullMark?.message}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 mb-4">
          {isUpdateMode ? (
            <>
              <button
                type="button"
                onClick={handleSubmit(handleUpdateExam)}
                disabled={isSubmitting}
                className="main-btn"
              >
                Save Edits
              </button>
              <Link
                to={"/exams/exam-questions/" + params?.id}
                className="main-btn"
              >
                Continue to Questions
              </Link>
            </>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(handleAddExam)}
              disabled={isSubmitting}
              className="main-btn"
            >
              Save Exam
            </button>
          )}
          <Link to={"/exams"} type="button" className="second-btn">
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddExam;
