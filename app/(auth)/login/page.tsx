"use client";
import React, { useState } from "react";
import { useHandleAuth } from "@/hooks/apiHandlers/useHandleAuth";
import Image from "next/image";
import AuthImage from "@/images/AuthImage.png";
import FullLogo from "@/images/FullLogo.svg";
import EmailIcon from "@/images/icons/email.svg";
import KeyIcon from "@/images/icons/key.svg";

import Input from "@/components/ui/Input";
import MainButton from "@/components/ui/MainButton";
import Link from "next/link";

const emailRgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const Login = () => {
  const { handleLogin, loading } = useHandleAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [response, setResponse] = useState<{
    data: null;
    message: string;
    status: "fail" | "success";
  }>({ data: null, message: "", status: "fail" });

  const validateForm = () => {
    const newErrors = {
      email: emailRgx.test(formData.email) ? "" : "Invalid email format.",
      password: formData.password.length === 0 ? "Password is required." : "",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResponse({ data: null, message: "", status: "fail" });
    if (!validateForm()) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    handleLogin(data).then((response) => {
      setResponse(
        response as {
          data: null;
          message: string;
          status: "fail" | "success";
        }
      );
    });
  };

  return (
    <div className="grid grid-cols-2 max-lg:grid-cols-1">
      <Image
        src={AuthImage}
        alt="Authentication Image"
        className="w-full h-screen sticky top-0 object-cover object-bottom max-lg:hidden"
      />
      <form onSubmit={handleSubmit} className="flex min-h-screen flex-col max-lg:justify-center gap-5 px-28 py-20 max-xl:px-20 max-sm:px-7 ">
        <Link href="/">
          <Image src={FullLogo} alt="Full Logo" className="mx-auto mb-10 max-sm:w-[180px]" />
        </Link>
        {response.message && (
          <div
            className={`p-4 rounded-lg text-center ${
              response.status === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {response.message}
          </div>
        )}
        <Input
          id="email"
          className="h-14"
          label="Email Address"
          placeholder="Enter your email address"
          type="email"
          icon={EmailIcon}
          value={formData.email}
          error={errors.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <Input
          id="password"
          placeholder="Enter your password"
          className="h-14"
          label="Password"
          type="password"
          icon={KeyIcon}
          value={formData.password}
          error={errors.password}
          isPassword
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <p className="text-black font-medium tracking-normal max-md:text-sm">
          Forget your password?{" "}
        </p>
        <MainButton
          label="Login"
          loading={loading}
          mode="dark"
          classname="w-full mt-5 h-16"
        />

        <p className="tracking-wider text-center max-md:text-sm">
          Don’t have an account?{" "}
          <Link
            className="text-black font-medium tracking-normal cursor-pointer"
            href="/register"
          >
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
