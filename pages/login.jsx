import { loginUser } from "@/utils/authentication";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  AiOutlineLoading,
  AiOutlineLock,
  AiOutlineMail,
  AiFillEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import Link from "next/link";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const { email, password } = user;
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser({ email, password }, setError, setLoading, toast);
  };
  useEffect(() => {
    const isUser = Object.values({ email, password }).every((i) => Boolean(i));
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 selection:bg-violet-300">
            Welcome Back !
          </h2>
          <p className="text-center text-primary-4 mt-2 mb-6 font-semibold text-md selection:bg-violet-300">
            Lets post something.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm space-y-4">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AiOutlineMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  required
                  onChange={handleChange}
                  placeholder="mail@domain.com"
                  className="p-2 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  id="email"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AiOutlineLock className="h-5 w-5 text-gray-400" />
                </div>
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEye className="h-5 w-5 text-gray-400" />
                  ) : (
                    <AiFillEyeInvisible className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="p-2 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/forgot-password">Forgot your password?</Link>
            </div>
            <div className="text-sm">
              <Link href="/register">Don't have an account?</Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-3 hover:bg-primary-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-3 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitDisabled}
            >
              {loading && (
                <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                  <AiOutlineLoading className="h-5 w-5 text-gray-100 animate-spin" />
                </span>
              )}
              Sign in
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export function getServerSideProps() {
  return {
    props: {
      title: "Login to RoamMate",
    },
  };
}

export default Login;
