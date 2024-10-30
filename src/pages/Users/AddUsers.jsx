import { zodResolver } from "@hookform/resolvers/zod";
import { addUser, schema } from "../../utils/users";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AddUsers = () => {
  const {
    register,
    handleSubmit,
    // setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const handleAddUser = async () => {
    if (getValues("password") !== getValues("confirmPassword")) {
      toast.error("Passwords do not match");
      return;
    }
    const data = {
      firstName: getValues("firstName"),
      lastName: getValues("lastName"),
      password: getValues("password"),
      confirmPassword: getValues("confirmPassword"),
      email: getValues("email"),
      phoneNumber: getValues("phoneNumber"),
    };
    let res = await addUser(data);
    if (res.isSuccess) {
      await Swal.fire({
        icon: "success",
        title: "User Added Successfully",
        showConfirmButton: false,
        timer: 500,
      });
      window.location.href = "/users";
    }
  };
  return (
    <div className="px-6">
      <h1 className="text-2xl font-bold text-primary">Add User</h1>
      <h2 className="text-lg my-3 font-bold">Personal Information</h2>
      <form className="max-w-[600px]">
        <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className={`input ${errors?.firstName ? "mb-0" : "mb-3"}`}
              {...register("firstName")}
              placeholder="Enter First Name"
            />
            {errors && errors?.firstName && (
              <span className="text-sm text-red-500 mb-3 block">
                {errors?.firstName?.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className={`input ${errors?.lastName ? "mb-0" : "mb-3"}`}
              {...register("lastName")}
              placeholder="Enter Last Name"
            />
            {errors && errors?.lastName && (
              <span className="text-sm text-red-500 mb-3 block">
                {errors?.lastName?.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            className={`input ${errors?.phoneNumber ? "mb-0" : "mb-3"}`}
            {...register("phoneNumber")}
            placeholder="Enter phone number"
          />
          {errors && errors?.phoneNumber && (
            <span className="text-sm text-red-500 mb-3 block">
              {errors?.phoneNumber?.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`input ${errors?.email ? "mb-0" : "mb-3"}`}
            {...register("email")}
            placeholder="Enter Email"
          />
          {errors && errors?.email && (
            <span className="text-sm text-red-500 mb-3 block">
              {errors?.email?.message}
            </span>
          )}
        </div>
        <h2 className="text-lg my-3 font-bold">Password Creation</h2>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`input ${errors?.password ? "mb-0" : "mb-3"}`}
            {...register("password")}
            placeholder="Enter Password"
          />
          {errors && errors?.password && (
            <span className="text-sm text-red-500 mb-3 block">
              {errors?.password?.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={`input ${errors?.confirmPassword ? "mb-0" : "mb-3"}`}
            {...register("confirmPassword")}
            placeholder="Confirm Password"
          />
          {errors && errors?.confirmPassword && (
            <span className="text-sm text-red-500 mb-3 block">
              {errors?.confirmPassword?.message}
            </span>
          )}
        </div>
        <div className="flex gap-5 mt-3">
          <button
            type="button"
            className="main-btn"
            disabled={isSubmitting}
            onClick={handleSubmit(handleAddUser)}
          >
            {isSubmitting ? "Adding User..." : "Add User"}
          </button>
          <Link to={"/users"} className="second-btn">
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddUsers;
