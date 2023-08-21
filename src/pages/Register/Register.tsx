import React, { useState, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setTokens } from "../../utils/Auth";
import apiCall from "../../utils/apiCall";

/**
 * Interface declared
 */
interface User {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

/**
 * Register component
 * @returns
 */
const Register: React.FC = () => {
  const [userData, setUserData] = useState<User>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Clear form
  const clearForm = () => {
    setUserData({
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    });
  };

  // Register from handler
  const registerOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (userData.password != userData.confirmPassword) {
      toast.error("Password doesn't match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await apiCall(false, "/auth/register", "POST", {
        name: userData.name,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
      });

      if (res.ok) {
        toast.success(res.msg);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setTokens(res.data.tokens);
        clearForm();
        window.location.reload();
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
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-8">Register</h1>
      <form onSubmit={registerOnSubmit}>
        <ToastContainer />
        <div className="grid lg:grid-cols-2 gap-x-5 mb-5">
          <div className="flex flex-col mb-3">
            <label htmlFor="name" className="mb-2 text-md font-medium">
              <span className="label-text-alt text-[16px] font-medium">Full Name</span>
            </label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              className="input border border-gray-300 w-full rounded-md py-2 px-3 justify-center input-md focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="username" className="mb-2 text-md font-medium">
              <span className="label-text-alt text-[16px] font-medium">Username</span>
            </label>
            <input
              type="text"
              value={userData.username}
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
              className="input border border-gray-300 w-full rounded-md py-2 px-3 justify-center input-md focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="email" className="mb-2 text-md font-medium">
              <span className="label-text-alt text-[16px] font-medium">Email</span>
            </label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              className="input border border-gray-300 w-full rounded-md py-2 px-3 justify-center input-md focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="phone" className="mb-2 text-md font-medium">
              <span className="label-text-alt text-[16px] font-medium">Phone</span>
            </label>
            <input
              type="text"
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              className="input border border-gray-300 w-full rounded-md py-2 px-3 justify-center input-md focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 text-md font-medium">
              <span className="label-text-alt text-[16px] font-medium">Password</span>
            </label>
            <input
              type="password"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              className="input border border-gray-300 w-full rounded-md py-2 px-3 justify-center input-md focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="mb-2 text-md font-medium">
              <span className="label-text-alt text-[16px] font-medium">Confirm Password</span>
            </label>
            <input
              type="password"
              value={userData.confirmPassword}
              onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
              className="input border border-gray-300 w-full rounded-md py-2 px-3 justify-center input-md focus:outline-none"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="transition bg-cyan-500 hover:text-primary hover:bg-cyan-600 font-medium text-white py-[10px] px-6 rounded-md"
        >
          Register
        </button>
      </form>
      {isLoading && <p className="my-3 text-lg">Loading...</p>}
    </div>
  );
};

export default Register;
