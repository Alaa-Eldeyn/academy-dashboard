import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../utils/LocalStorage";
import { signinValidation } from "./Validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function Login() {
  const baseUrl = "http://localhost:5000/api";
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signinValidation),
  });
  const Navigate = useNavigate();
 
  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(`${baseUrl}/User/login`, formData);
      if (response.data.isSuccess) {
        Navigate("/");
        addUser(response.data.token);
        toast("Successfully Login", { type: "success" });
      }  else {
        if (response?.data?.message === "Can't find this username") {
          toast.error("Please enter the email you registered with");
        } else {
          toast.error(response?.data?.message);
        }
        console.log("error", response?.data?.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center  lg:h-screen p-6">
    <div className="grid md:grid-cols-2 items-center gap-y-8 bg-white max-w-7xl w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-3xl overflow-hidden">
      <div className="max-md:order-1 flex flex-col justify-center items-center sm:p-8 p-4 bg-gradient-to-b from-bgFontColor to-[#AC59FF] w-full h-full">
        <img
              src="src\assets\login.png"
              alt="hero image" 
              srcSet="/signup-2x.png 2x, /signup-3x.png 3x" 
              width={"350"}
              height={"300"}
             /> 
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="sm:p-8 my-6 w-full">
        <div className="text-center my-10 w-full mx-auto">
            <span className="text-secondary">Welcome to</span>
            <h3 className="text-bgFontColor text-2xl font-extrabold max-md:text-center">
              MedLearn Hub
            </h3>
          </div>
          {/* email */}
          <div className="grid lg:grid-cols-1 my-6">
            <div>
              <label className="text-base font-normal mb-2 block text-bgFontColor">
                Email *
              </label>
              <input
                {...register("email")}
                type="email"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-bgColor"
                placeholder="Enter Email"
              />
              {errors.email && (
                <p className="text-red-500 mt-2 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          {/* Password Input */}
          <div className="grid lg:grid-cols-1 gap-6">
            <div>
              <label className="text-base font-normal mb-2 block text-bgFontColor">
                Password *
              </label>
              <div className="relative flex items-center">
                <input
                  {...register("password")}
                  type="password"
                  className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-bgColor"
                  placeholder="Enter Password"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 mt-2 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center mt-6">
            <Link to={"/Forget-pass"} className="font-bold">
              Forget Password ?
            </Link>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-6 text-lg tracking-wide font-bold rounded-md text-white bg-[#984D9F] focus:outline-none transition-all">
              Sign In
            </button>
            <div className="w-full flex justify-center my-6 font-bold text-lg">
              <span>
                Don’t have an account?{" "}
                <Link
                  href={"/sign-up"}
                  className="ml-2 font-bold underline text-bgColor">
                  Join Now
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
