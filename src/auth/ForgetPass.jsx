"use client"
import { Link } from "react-router-dom";
import { FaAnglesLeft } from "react-icons/fa6";
import { useState } from 'react';
import axios from "axios";

function ForgetPass() {
  const baseUrl = "http://localhost:5000/api/";
  //const baseUrl = process.env.BASE_URL;
  const [email, setEmail] = useState("");
  const submitForm = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      toast("Please Write Your Email", { type: "error" });
      return;
    }
    try {
      const res = await axios.post(`${baseUrl}User/forgot-password`, {
        email: email,
      });
      
      if (res.data.isSuccess) {
        toast("Reset Code Sent Successfully", { type: "success" });
        console.log("Reset code sent.");
      } else {
          toast(res?.data?.message, { type: "error" });
           console.log(res?.data?.message);
      }
    } catch (error) {
      toast("Something went wrong, please try again.", { type: "error" });
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center lg:h-screen p-6">
      <div className="grid md:grid-cols-2 items-center gap-y-8 bg-white max-w-7xl w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.5)] rounded-3xl overflow-hidden">
        <div className="max-md:order-1 flex flex-col justify-center sm:p-8 p-4 bg-gradient-to-r from-blue-600 to-blue-700 w-full h-full">
          image
        </div>
        
        <form onSubmit={submitForm} className="sm:p-8 my-6 w-full px-6">
        <Link href={"/"} className="font-bold flex items-center gap-2 hover:opacity-65">
          <FaAnglesLeft />
          Back to home
        </Link>
          <div className="text-center my-10 w-full mx-auto ">
            <h3 className="text-blue-500 my-4 text-2xl font-extrabold max-md:text-center">Forget Password ?</h3>
           
          </div>
        
          
          <div className="grid lg:grid-cols-1 my-6">
            <div>
              <label className="text-gray-800 text-base mb-4 block">Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="user@example.com"
              />
            </div>
          </div>
          <div className="flex items-center mt-6">
            <Link to={"/auth/forGetPassword"}>Remember Your Password?</Link>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all"  >
              Send Reset Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ForgetPass;
