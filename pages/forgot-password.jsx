import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineMail, AiOutlineLoading } from "react-icons/ai";
import { useMutation } from "react-query";
import backendUrl from "@/utils/baseUrl";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const mutation = useMutation(async () => {
    const { data } = await axios.post(
      `${backendUrl}/api/auth/forgot-password`,
      { email }
    );
    return data;
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync();
      toast.success("Kindly check ypur email to reset your password");
      setEmail("");
    } catch (er) {
      toast.error(er.response?.data?.msg || "Try again later");
    }
  };
  return (
    <section>
      <div></div>
    </section>
  );
};
