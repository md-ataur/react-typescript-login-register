import React, { useState, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setTokens } from "../../utils/Auth";
import { Link } from "react-router-dom";
import apiCall from "../../utils/apiCall";

/**
 * Interface declared
 */
interface User {
  email: string;
  password: string;
}

/**
 * Login component
 * @returns
 */
const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<User>({
    email: "ataur@gmail.com",
    password: "password12",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Login form handler
  const loginOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await apiCall(false, "/auth/login", "POST", loginData);
      if (res.ok) {
        toast.success(res.msg);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setTokens(res.data.tokens);
        window.location.assign("/dashboard");
      } else {
        toast.error(res.msg);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-8">Login</h1>
      <form onSubmit={loginOnSubmit} className="mb-3">
        <ToastContainer />
        <div className="flex flex-col mb-3">
          <label htmlFor="name" className="mb-2 text-md font-medium">
            <span className="label-text-alt text-[16px] font-medium">Email</span>
          </label>
          <input
            type="email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            placeholder="Your email"
            className="input border border-gray-300 w-full rounded-md py-2 px-3 justify-center input-md focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="name" className="mb-2 text-md font-medium">
            <span className="label-text-alt text-[16px] font-medium">Password</span>
          </label>
          <input
            type="password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            placeholder="********"
            className="input border border-gray-300 w-full rounded-md py-2 px-3 justify-center input-md focus:outline-none"
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={isLoading}
            className="transition bg-cyan-500 hover:text-primary hover:bg-cyan-600 font-medium text-white py-[10px] px-6 rounded-md"
          >
            Login
          </button>
          <p className="font-medium">
            <Link to="/forgotpassword">Forgot password?</Link>
          </p>
        </div>
        {isLoading && <p className="my-3 text-lg">Loading...</p>}
      </form>
    </div>
  );
};

export default Login;
