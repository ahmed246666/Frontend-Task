"use client";
import Image from "next/image";
import Logo from "@/images/LogoBlack.svg";
import facebook from "@/images/icons/facebook.svg";
import insta from "@/images/icons/insta.svg";
import x from "@/images/icons/x.svg";
import youtube from "@/images/icons/youtube.svg";
import Input from "../ui/Input";
import MainButton from "../ui/MainButton";
import { useHandleNewsLetter } from "@/hooks/apiHandlers/useHandleNewsLetter";
import { useState } from "react";

const Footer = () => {
  const { handlePostNewsLetter, loading } = useHandleNewsLetter();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<{
    data: null;
    message: string;
    status: "fail" | "success";
  }>({ data: null, message: "", status: "fail" });

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResponse({ data: null, message: "", status: "fail" });
  
    if (!validateForm()) return;
  
    const data = new FormData();
    data.append("email", email);
  
    handlePostNewsLetter(data).then((response) => {
      setResponse(
        response as {
          data: null;
          message: string;
          status: "fail" | "success";
        }
      );
      if (response.status === "fail") {
        setError(response.message);
      }
    });
  };
  

  const validateForm = () => {
    setError(null);
    if (!email) {
      setError("Email is required.");
      return false;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  return (
    <footer className=" bg-[#F3F3F1]">
      <div className="container mx-auto px-6 py-[70px] max-lg:py-[40px] grid lg:grid-cols-2 items-center lg:gap-16 gap-8">
        <div>
           <p className="text-4xl max-md:text-3xl font-bold leading-relaxed max-lg:text-center">
            Subscribe to newsletter
          </p>
          <p className="lg:text-lg mt-2 max-lg:text-center">
            Sign up to receive the latest news
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <div className="flex-1">
            <Input
              id="Footer Contact Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              success={
                response.status === "success" ? "Subscribed successfully!" : ""
              }
              type="text"
              className="h-16 !bg-white"
              placeholder="Enter your email address"
            />
          </div>
            <MainButton
              label="Subscribe"
              loading={loading}
              mode="dark"
              noIcon
              classname="h-16"
            />
        </form>
      </div>
      <div className="container mx-auto px-6 py-[70px] max-lg:py-[40px] border-y border-black grid grid-cols-2 sm:grid-cols-3 gap-8">
        <div className="space-y-5 max-sm:col-span-2">
          <div className="flex items-center mb-4">
            <Image src={Logo} alt="Logo" />
          </div>
          <p className="mb-4">
            Donec bibendum nibh quis nisl luctus, at aliquet ipsum bibendum.
            Fusce at dui tincidunt nulla semper.
          </p>
          <div className="flex gap-4 items-center">
            <p className="text-gray-500">Follow Us On</p>
            <div className="flex space-x-4">
              <Image src={facebook} alt="facebook" />
              <Image src={insta} alt="insta" />
              <Image src={x} alt="x" />
              <Image src={youtube} alt="youtube" />
            </div>
          </div>
        </div>
        <div className="sm:mx-auto">
          <p className="text-lg">Main Links</p>
          <ul className="space-y-4 mt-8">
            <li>Home</li>
            <li>Our Projects</li>
            <li>Services</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div className="sm:mx-auto">
          <p className="text-lg">Quick Links</p>
          <ul className="space-y-4 mt-8">
            <li>Privacy policy</li>
            <li>Terms of Use</li>
          </ul>
        </div>
      </div>
      <p className="text-center px-6 py-[30px] max-sm:py-[15px]">
        © 2023 All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
