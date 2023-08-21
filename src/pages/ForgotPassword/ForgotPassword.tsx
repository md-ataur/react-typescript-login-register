import React, { useState, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiCall from "../../utils/apiCall";

const ForgotPassword: React.FC = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const forgotPassword = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await apiCall(false, "/auth/forgot-password", "POST", { email: userEmail });
      if (res.ok) {
        toast.success(res.msg);
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
      <h1 className="text-3xl text-center font-bold mb-8">Recover Password</h1>
      <form onSubmit={forgotPassword} className="mb-3">
        <ToastContainer />
        <div className="flex flex-col mb-3">
          <label htmlFor="name" className="mb-2 text-md font-medium">
            <span className="label-text-alt text-[16px] font-medium">Email</span>
          </label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Your email"
            className="input border border-gray-300 w-full rounded-md py-2 px-3 justify-center input-md focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="transition bg-cyan-500 hover:text-primary hover:bg-cyan-600 font-medium text-white py-[10px] px-6 rounded-md"
        >
          Recover
        </button>
      </form>
      {isLoading && <p className="my-3 text-lg">Loading...</p>}
    </div>
  );
};

export default ForgotPassword;
