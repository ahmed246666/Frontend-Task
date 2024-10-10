"use client";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Input = ({
  label,
  name,
  id,
  placeholder,
  error,
  success,
  className,
  type,
  value,
  icon,
  isPassword,
  onChange,
}: {
  label?: string;
  name?: string;
  id: string;
  placeholder?: string;
  error?: string | null;
  success?: string | null;
  className?: string;
  type: string;
  value?: string;
  icon?: string;
  isPassword?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div>
      {label && (
        <label className="flex items-center gap-3 font-normal text-gray-700 mb-2 max-md:text-sm" htmlFor={id}>
          {icon && <Image src={icon} alt="Input Icon" width={18} height={18} />}
          {label}
        </label>
      )}
      <div className="relative">
        <input
        id={id}
          type={showPass?"text":type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full  focus:outline-none text-lg max-md:text-base px-6 bg-[#2D2D2D05] placeholder:text-[#656861] placeholder:text-base ${className}`}
        />
        {isPassword && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer ">
            {showPass ? (
              <EyeOff size={20} strokeWidth={1.5} onClick={() => setShowPass(false)} />
            ) : (
              <Eye size={20} strokeWidth={1.5} onClick={() => setShowPass(true)} />
            )}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-1">{success}</p>}
    </div>
  );
};
export default Input;
