
import { Link } from "react-router-dom";
import { FaAnglesLeft } from "react-icons/fa6";
import { useState } from 'react';
import axios from "axios";

import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';


function ForgetPass() {
  const baseUrl = "http://localhost:5000/api/";
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}User/forgot-password`, {
        email: data.email,
      });

      if (res.data.isSuccess) {
        toast(res.data?.message, { type: "success" });
        reset();
        console.log("success",res.data?.message);
        
      } else {
        toast(res?.data?.message, { type: "error" });
        console.log(res?.data?.message);
        console.log("error",res);
      }
    } catch (error) {
      toast("Something went wrong, please try again.", { type: "error" });
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center lg:h-screen p-6">
    <div className="grid md:grid-cols-2 items-center gap-y-8 bg-white max-w-7xl w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.5)] rounded-3xl overflow-hidden">
      <div className="rounded-3xl max-md:order-1 flex flex-col justify-center items-center sm:p-8 p-4 bg-gradient-to-b from-bgFontColor to-[#AC59FF] w-full h-full">
      <img
            src="src\assets\forgetpass1.png"
            alt="hero image" 
            srcSet="/forgetpass2-2x.png 2x, /forgetpass2-3x.png 3x" 
            width={"300"}
            height={"300"}
            className='relative  hidden lg:block z-50'
           /> 
      <img
            src="src\assets\forgetpass2.png"
            alt="hero image" 
            srcSet="/forgetpass2-2x.png 2x, /forgetpass2-3x.png 3x" 
            width={"300"}
            height={"300"}
            className='absolute z-10 top-[180px] hidden lg:block md:block '
           />  
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="sm:p-8 my-6 w-full px-6">
        <div className="text-center my-10 w-full mx-auto ">
          <h3 className="text-bgFontColor my-4 text-2xl font-extrabold max-md:text-center">
            Forget Password?
          </h3>
          <span className='text-secondary'>Don’t Worry</span>
        </div>
        <p>Please enter the email address associated with your account, and you will receive a request to reset your password.</p>
        
        <div className="grid lg:grid-cols-1 my-6">
          <div>
            <label className="text-base font-normal mb-2 block text-bgFontColor">Email Address</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              name="email"
              type="email"
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-bgColor"
              placeholder="user@example.com"
            />
            {/* Show validation errors */}
            {errors.email && (
              <span className="text-red-600 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center font-bold mt-6">
          <Link href={"/sign-in"}>Remember Your Password?</Link>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-3 hover:opacity-40 px-6 tracking-wide rounded-md text-white font-bold text-lg bg-[#984D9F] focus:outline-none transition-all"
          >
            Send 
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}
export default ForgetPass;

 