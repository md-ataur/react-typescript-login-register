import React, { useState, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiCall from "../../utils/apiCall";

const ResetPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Get query param
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const queryParam = params.get("token");

  // Clear form
  const clearForm = () => {
    setPassword("");
    setConfirmPassword("");
  };

  // Reset password
  const resetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password != confirmPassword) {
      toast.error("Password doesn't match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await apiCall(false, "/auth/reset-password", "POST", {
        password,
        confirmPassword,
        token: queryParam,
      });
      if (res.ok) {
        toast.success(res.msg);
        clearForm();
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
      <h1 className="text-3xl text-center font-bold mb-8">Reset Password</h1>
      <form onSubmit={resetPassword} className="mb-3">
        <ToastContainer />
        <div className="flex flex-col mb-3">
          <label htmlFor="name" className="mb-2 text-md font-medium">
            <span className="label-text-alt text-[16px] font-medium">Password</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input border border-gray-300 w-full rounded-md py-2 px-3 justify-center input-md focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col mb-3">
          <label htmlFor="name" className="mb-2 text-md font-medium">
            <span className="label-text-alt text-[16px] font-medium">Confirm Password</span>
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input border border-gray-300 w-full rounded-md py-2 px-3 justify-center input-md focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="transition bg-cyan-500 hover:text-primary hover:bg-cyan-600 font-medium text-white py-[10px] px-6 rounded-md"
        >
          Reset
        </button>
      </form>
      {isLoading && <p className="my-3 text-lg">Loading...</p>}
    </div>
  );
};

export default ResetPassword;
