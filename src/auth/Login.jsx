import { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const baseUrl ='http://localhost:5000/api';
//   const baseUrl = import.meta.env.TEST;
//   console.log(baseUrl);
const Navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/User/login`, {
        email: email,
        password: password,
      });

      if (response.data.isSuccess) {
        console.log(response.data);
        console.log("Login successful");
        // localStorage.setItem("user_token", res.data.access_token);
        // localStorage.setItem("user_role_name", res.data.user.role_name);
        // toast("Successfuly Login", { type: "success" });
      }else{
        Navigate("/Dashboard");
        console.log("error",response?.data);
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-r from-blue-800 to-blue-500 lg:h-screen p-6">
      <div className="p-5 grid md:grid-cols-2 items-center gap-y-8 bg-white max-w-7xl w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-3xl overflow-hidden">
        <div className="max-md:order-1 flex flex-col justify-center sm:p-8 p-4 bg-gradient-to-r from-blue-600 to-blue-700 w-full h-full">
          image
        </div>
        <form onSubmit={handleSubmit} className="sm:p-8 my-6 w-full">
          <div className="text-center my-10 w-full mx-auto">
            <span>Welcome to</span>
            <h3 className="text-blue-500 text-2xl font-extrabold max-md:text-center">
              MedLearn Hub's Dashboard
            </h3>
          </div>
          {/* email */}
          <div className="grid lg:grid-cols-1 my-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Email *
              </label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter Email"
                required
              />
            </div>
          </div>
          {/* password */}
          <div className="grid lg:grid-cols-1 gap-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Password *
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-transparent border border-gray-400 w-full text-gray-800 text-sm pl-4 pr-10 py-3 rounded-xl outline-blue-600"
                  placeholder="Enter Password" />
              </div>
            </div>
          </div>
          <div className="flex items-center mt-6">
            <Link to={"/ForgetPass"} className="font-bold">
              Forget Password?
            </Link>
          </div>
          <div className="mt-6 ">
            <button
              type="submit"
              className="w-full py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all"
            >
           Login
            </button>
           
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
