"use client";
import React, { useState } from "react";
import Image from "next/image";
import emailImage from "@/images/icons/email.svg";
import phoneImage from "@/images/icons/phone.svg";
import contactUsImage from "@/images/contactUsImage.webp";
import Input from "../ui/Input";
import MainButton from "../ui/MainButton";
import { useHandlePages } from "@/hooks/apiHandlers/useHandlePages";

const HomeContactSection = () => {
  const { handlePostContactUs, loading } = useHandlePages();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    content: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    content: "",
  });
  const [response, setResponse] = useState<{
    data: null;
    message: string;
    status: "fail" | "success";
  }>({ data: null, message: "", status: "fail" });

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", phone: "", content: "" };

    if (!formData.name) {
      newErrors.name = "Name is required.";
      valid = false;
    } else if (formData.name.length < 3 || formData.name.length > 250) {
      newErrors.name = "Name must be between 3 and 250 characters.";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
      valid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
      valid = false;
    }

    if (!formData.content) {
      newErrors.content = "Message is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResponse({ data: null, message: "", status: "fail" });

    if (!validateForm()) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    handlePostContactUs(data).then((response) => {
      setResponse(
        response as {
          data: null;
          message: string;
          status: "fail" | "success";
        }
      );
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="relative">
      <div className="container mx-auto px-6 py-[75px] md:py-[125px] grid lg:grid-cols-2 lg:gap-10">
        <div className="space-y-10">
          <h2 className="text-4xl max-md:text-3xl font-bold leading-relaxed max-w-[500px] max-lg:mx-auto max-lg:text-center">
            We&apos;ll help you find a place you&apos;ll love!
          </h2>
          <div className="lg:space-y-10 max-lg:flex gap-6 flex-wrap items-center justify-evenly">
            <div className="flex gap-6 items-center">
              <Image src={phoneImage} alt="Phone" />
              <div className="space-y-2">
                <p className="text-lg max-sm:text-base">Phone Number</p>
                <p className="text-lg max-sm:text-base">314-555-0123</p>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <Image src={emailImage} alt="Email" />
              <div className="space-y-2">
                <p className="text-lg max-sm:text-base">Email Address</p>
                <p className="text-lg max-sm:text-base">sianches@gmail.com</p>
              </div>
            </div>
          </div>
          <Image
            src={contactUsImage}
            alt="Contact"
            className="lg:absolute -left-16 bottom-0 max-lg:max-w-[500px] max-md:max-w-[400px] max-sm:w-full"
          />
        </div>

        <div className="space-y-8 border bg-white border-border p-14 max-sm:p-8">
          <div className="space-y-4">
            <p className="text-4xl max-md:text-3xl font-bold leading-relaxed max-lg:text-center">
              Contact us
            </p>
            <p className="md:text-lg max-lg:text-center">
              We will respond as soon as we receive your message.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {response?.message && (
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
              id="Contact Name"
              name="name"
              className="border border-border h-16"
              label="Name"
              type="text"
              error={errors.name}
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Input
              id="Contact Email"
              name="email"
              className="border border-border h-16"
              label="Email Address"
              type="email"
              error={errors.email}
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              id="Contact Phone Number"
              name="phone"
              className="border border-border h-16"
              label="Phone Number"
              type="text"
              error={errors.phone}
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <Input
              id="Contact Message"
              name="content"
              className="border border-border h-16"
              label="Message"
              type="text"
              error={errors.content}
              placeholder="Enter your message"
              value={formData.content}
              onChange={handleInputChange}
            />
            <MainButton
              label="Send Message"
              loading={loading}
              mode="dark"
              classname="h-16 !gap-4 ml-auto"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default HomeContactSection;
