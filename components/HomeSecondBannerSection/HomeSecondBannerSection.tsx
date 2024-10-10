import React from "react";
import MainButton from "../ui/MainButton";
import HomeSecondBannerImage from "@/images/BannerKeys.png";
import Image from "next/image";

const HomeSecondBannerSection = () => {
  return (
    <section className="container mx-auto px-6">
      <div className="px-20 max-lg:p-14 max-sm:p-8 my-[75px] md:my-[125px] bg-[#F8F8F7] py-20 flex max-lg:flex-col justify-end gap-10 items-center relative">
        <div className="space-y-10 lg:w-1/2">
          <h2 className="text-4xl max-md:text-3xl  font-bold leading-relaxed max-lg:text-center">
            Become an ambassador
          </h2>
          <MainButton
            label="Register Now"
            classname="gap-3 max-lg:mx-auto"
            mode="dark"
            loading={false}
          />
        </div>
        <Image
          src={HomeSecondBannerImage}
          alt="HomeBannerImage"
          className="h-[330px] max-md:h-[250px] max-sm:h-[220px] object-contain lg:absolute xl:-top-10 xl:-left-0 lg:-left-32 "
        />
      </div>
    </section>
  );
};

export default HomeSecondBannerSection;
