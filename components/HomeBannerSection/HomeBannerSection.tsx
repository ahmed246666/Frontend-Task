import React from "react";
import MainButton from "../ui/MainButton";
import Image from "next/image";
import HomeBannerImage from "@/images/HomeBannerImage.webp";

const HomeBannerSection = () => {
  return (
    <section className="container mx-auto px-6">
      <div className="p-20 max-lg:p-14 max-sm:p-8 my-[75px] md:my-[125px] bg-[#F8F8F7]  flex max-lg:flex-col gap-14 items-center relative">

      <div className="space-y-10 lg:w-1/2 w-full">
        <h2 className="text-4xl max-md:text-3xl  font-bold leading-relaxed max-lg:text-center">
          Sell your property with
          <br className="max-xl:hidden" /> SIANCHES
        </h2>
        <MainButton
          label="Sell your unit"
          classname="gap-3 max-lg:mx-auto" 
          mode="dark"
          loading={false}
        />
      </div>
      <Image
        src={HomeBannerImage}
        alt="Home Banner"
        className="max-h-[500px] max-xl:h-[400px] max-md:h-[300px] max-sm:h-[150px] object-contain lg:absolute max-md:scale-125 -right-[16.5%] max-2xl:-right-[18.5%]"
      />
      </div>
    </section>
  );
};

export default HomeBannerSection;
