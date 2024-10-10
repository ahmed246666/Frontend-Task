"use client";
import React, { useState } from "react";
import { useHandleAuth } from "@/hooks/apiHandlers/useHandleAuth";
import Image from "next/image";
import AuthImage from "@/images/AuthImage.webp";
import FullLogo from "@/images/FullLogo.svg";
import UserIcon from "@/images/icons/user.svg";
import EmailIcon from "@/images/icons/email.svg";
import KeyIcon from "@/images/icons/key.svg";
import NationalIdIcon from "@/images/icons/nationalId.svg";
import FoldersIcon from "@/images/icons/folders.svg";
import Input from "@/components/ui/Input";
import MainButton from "@/components/ui/MainButton";
import Link from "next/link";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidImageFile = (file: File) =>
  ["image/jpeg", "image/png", "image/jpg"].includes(file.type);

const getPasswordValidation = (password: string) => ({
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  number: /\d/.test(password),
  specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
});

const isValidFullName = (fullName: string) => {
  const words = fullName.trim().split(/\s+/);
  return words.length >= 2 && fullName.length >= 3 && fullName.length <= 250;
};

const Register = () => {
  const { handleRegister, loading } = useHandleAuth();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    national_image: null as File | null,
  });

  const [errors, setErrors] = useState({
    full_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    national_image: "",
    termsAccepted: "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [response, setResponse] = useState<{
    data: null;
    message: string;
    status: "fail" | "success";
  }>(
    {} as {
      data: null;
      message: string;
      status: "fail" | "success";
    }
  );
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState(
    getPasswordValidation("")
  );

  const handlePasswordChange = (password: string) => {
    const validations = getPasswordValidation(password);
    setPasswordErrors(validations);
    setFormData((prev) => ({ ...prev, password }));
  };

  const validateForm = () => {
    const newErrors = {
      full_name: formData.full_name
        ? isValidFullName(formData.full_name)
          ? ""
          : "Full name must be at least 2 words and between 3 and 250 characters."
        : "Full name is required.",
      email: isValidEmail(formData.email) ? "" : "Invalid email format.",
      password: Object.values(passwordErrors).every(Boolean)
        ? ""
        : "Password does not meet all criteria.",
      password_confirmation:
        formData.password === formData.password_confirmation
          ? ""
          : "Passwords do not match.",
      national_image: formData.national_image
        ? isValidImageFile(formData.national_image)
          ? ""
          : "Invalid file type. Please upload a JPEG or PNG image."
        : "National ID image is required.",
      termsAccepted: termsAccepted ? "" : "You must accept the terms.",
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
    data.append("terms", "1");

    handleRegister(data).then((response) => {
      setResponse(
        response as {
          data: null;
          message: string;
          status: "fail" | "success";
        }
      );
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && isValidImageFile(file)) {
      updateImage(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidImageFile(file)) {
      updateImage(file);
    } else {
      setErrors((prev) => ({ ...prev, national_image: "Invalid file type." }));
    }
  };

  const updateImage = (file: File) => {
    setFormData((prev) => ({ ...prev, national_image: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div className="grid grid-cols-2 max-lg:grid-cols-1">
      <Image
        src={AuthImage}
        alt="Authentication Image"
        className="w-full h-screen sticky top-0 object-cover object-bottom max-lg:hidden"
      />
      <form
        onSubmit={handleSubmit}
        className="flex min-h-screen flex-col max-lg:justify-center gap-5 px-28 py-20 max-xl:px-20 max-sm:px-7 "
      >
        <Link href="/">
          <Image
            src={FullLogo}
            alt="Full Logo"
            className="mx-auto mb-10 max-sm:w-[180px]"
          />
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
          id="full_name"
          className="h-14"
          label="Full Name"
          placeholder="Enter your full name"
          type="text"
          icon={UserIcon}
          value={formData.full_name}
          error={errors.full_name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, full_name: e.target.value }))
          }
        />
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
          isPassword
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
        {(formData.password || errors.password) &&
          !Object.values(passwordErrors).every(Boolean) && (
            <ul className="text-sm text-gray-500 space-y-1 list-disc ml-3">
              {Object.entries(passwordErrors).map(([key, isValid]) => (
                <li
                  key={key}
                  className={isValid ? "text-green-500" : "text-red-500"}
                >
                  {key === "length" && "At least 8 characters"}
                  {key === "uppercase" && "Contains an uppercase letter"}
                  {key === "lowercase" && "Contains a lowercase letter"}
                  {key === "number" && "Contains a number"}
                  {key === "specialChar" && "Contains a special character"}
                </li>
              ))}
            </ul>
          )}
        <Input
          id="password_confirmation"
          className="h-14"
          label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
          icon={KeyIcon}
          value={formData.password_confirmation}
          error={errors.password_confirmation}
          isPassword
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              password_confirmation: e.target.value,
            }))
          }
        />
        <div>
          <label className="flex items-center gap-3 font-normal text-gray-700 mb-2">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="accent-black w-4 h-4"
              id="terms"
            />
            <p className="text-gray-400 tracking-wider max-md:text-sm">
              Agree to the{" "}
              <span className="text-black font-medium tracking-normal">
                Terms and Conditions
              </span>
            </p>
          </label>
          {errors.termsAccepted && (
            <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>
          )}
        </div>
        <div>
          <label>
            <div className="flex items-center gap-3 font-normal text-gray-700 max mb-2 max-md:text-sm">
              <Image
                src={NationalIdIcon}
                alt="National ID Icon"
                width={18}
                height={18}
              />
              National ID Image
            </div>
            <div
              className={`border p-4 border-black border-dashed h-20 flex items-center justify-center bg-[#F5F5F5] cursor-pointer transition-all duration-300 hover:bg-gray-100 ${
                isDragging ? "bg-gray-200" : ""
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt="Preview"
                  className="w-16 h-16 object-cover"
                  width={100}
                  height={100}
                />
              ) : (
                <>
                  <Image
                    src={FoldersIcon}
                    alt="Folders Icon"
                    width={18}
                    height={18}
                  />
                  <p className="text-gray-400 text-center ml-2">
                    Drag & drop your image here or click to upload
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleFileChange}
              className="hidden"
              id="national_image"
            />
            {errors.national_image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.national_image}
              </p>
            )}
          </label>
        </div>
        <MainButton
          label="Create account"
          loading={loading}
          mode="dark"
          classname="w-full mt-5 h-16"
        />

        <p className="tracking-wider text-center max-md:text-sm">
          Have an account?{" "}
          <Link
            className="text-black font-medium tracking-normal cursor-pointer"
            href="/login"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
