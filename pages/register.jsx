import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import backendUrl from "../utils/baseUrl";
import { registerUser } from "../utils/authentication";
import {
  AiOutlineLoading,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineCheck,
  AiFillEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import { RxCross2 } from "react-icons/ri";
import {
  HiOutlineUserCircle,
  HiOutlineDotsCircleHorizontal,
} from "react-icons/hi";
const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
let cancel;
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [userName, setUserName] = useState("");
  const [userNameLoading, setUserNameLoading] = useState(false);
  const [userNameAvailable, setUserNameAvailable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { name, email, password } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(user, setError, setLoading, toast, setModalOpen);
  };

  const checkUserName = async () => {
    setUserNameLoading(true);
    try {
      cancel && cancel();
      const cancelToken = axios.CancelToken;
      const res = await axios.get(
        `${backendUrl}/api/auth/register/${userName}`,
        {
          cancelToken: new cancelToken((c) => {
            cancel = c;
          }),
        }
      );
      if (error !== null) setError(null);
      if (res.data.success) {
        setUserNameAvailable(true);
        setUser({ ...user, userName });
      }
    } catch (error) {
      setUserNameAvailable(true);
      setError("Username not available");
      console.log(error);
    }
    setUserNameLoading(false);
  };

  useEffect(() => {
    const isUser = Object.values({ name, email, password }).every((i) =>
      Boolean(i)
    );
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  useEffect(() => {
    userName === "" ? setUserNameAvailable(false) : checkUserName();
  }, [userName]);
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900 selection:bg-primary-1">
            Welcome to{" "}
            <span className="font-salsa text-primary-4">RoamMate</span>
          </h2>
          <p className="text-center text-primary-5 mt-2 mb-6 font-bold text-md selection:bg-primary-1">
            We're thrilled to have you{" "}
            <span className="font-salsa">onboard</span>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-0-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineUserCircle className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Your Name"
                  id="name"
                  required
                  onChange={handleChange}
                  className=" block w-full pl-10 p-2 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700"
              >
                UserName
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {userNameLoading || userName === "" ? (
                    <HiOutlineDotsCircleHorizontal
                      className={`h-5 w-5 text-gray-400 ${
                        userNameLoading && "animate-spin"
                      }`}
                    />
                  ) : userName !== "" && userNameAvailable ? (
                    <AiOutlineCheck className="h-5 w-5 text-gray-400" />
                  ) : (
                    <RxCross2 className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  className={` block w-full 
                  p-2 pl-10 sm:text-sm border-gray-300 
                  rounded-md ${
                    userName !== "" && !userNameAvailable ? "bg-red-100" : ""
                  }`}
                  placeholder="User Name"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    if (usernameRegex.test(e.target.value)) {
                      setUserNameAvailable(true);
                    } else {
                      setUserNameAvailable(false);
                    }
                  }}
                />
              </div>
              {userName !== "" && !userNameLoading && !userNameAvailable && (
                <small className="text-xs text-red-600">
                  This username is invalid or not available
                </small>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
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
                  className="p-2 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="mail@domain.com"
                  onChange={handleChange}
                  required
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
                  <AiOutlineLock className="h-t w-5 text-gray-400" />
                </div>
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible className="h-5 w-5 text-gray" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5 text-gray" />
                  )}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className=" p-2 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  value={password}
                  onChange={handleChange}
                  required
                  placeholder="Must be atlest 8 characters long"
                />
              </div>
            </div>
          </div>

          <section className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/login"
                className="font-medium text-primary-3 hover:text-primary-5"
              >
                Already have an account ?
              </Link>
            </div>
          </section>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-3 hover:bg-primary-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-5 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitDisabled || !userNameAvailable}
            >
              {loading && (
                <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                  <AiOutlineLoading className="h-5 w-5 text-gray-100 animate-spin" />
                </span>
              )}
              Register
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
      title: "Register for RoamMate",
    },
  };
}
export default Register;
