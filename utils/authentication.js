import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import { toast } from "react-toastify";

import backendUrl from "./baseUrl";
import errorFunction from "./error";

export const registerUser = async (
  { name, userName, email, password },
  setError,
  setLoading,
  toast,
  setModalOpen
) => {
  setLoading(true);
  try {
    const res = await axios.post(`${backendUrl}/api/register`, {
      name,
      userName,
      email,
      password,
    });
    toast.info(res.data.message);
    setModalOpen(true);
  } catch (error) {
    const errorMessage = errorFunction(error);
    setError(errorMessage);
    toast.error(errorMessage);
  }
  setLoading(false);
};

export const loginUser = async (
  { email, password },
  setError,
  setLoading,
  toast
) => {
  setLoading(true);
  try {
    const res = await axios.post(`${backendUrl}/api/auth`, {
      email,
      password,
    });
    setToken(res.data.token);
    Router.push("/feed");
  } catch (error) {
    const errorMessage = errorFunction(error);
    setError(errorMessage);
    toast.error(errorMessage);
  }
  setLoading(false);
};

export const onBoardUser = async (
  verificationToken,
  formdata,
  setLoading,
  toast
) => {
  setLoading(true);
  try {
    const response = await axios.post(
      `${backendUrl}/api/induction/${verificationToken}`,
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setToken(res.data.token);
    toast.success(res.data.message);
    Router.push("/home");
  } catch (error) {
    const errorMessage = errorFunction(error);
    toast.error(errorMessage);
  }
  setLoading(false);
};

const setToken = (token) => {
  Cookies.set("token", token, { expires: 730 });
};

export const logoutUser = () => {
  Cookies.remove("token");
  Router.push("/login");
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};
