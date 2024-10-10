"use client";
import { useHandlePages } from "@/hooks/apiHandlers/useHandlePages";
import { Partner } from "@/types/types";
import Image from "next/image";
import React, { useState } from "react";

const HomeOurPartnersSection = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const { handleGetOurPartners, loading } = useHandlePages();

  React.useEffect(() => {
    handleGetOurPartners().then((data) => {
      console.log(data.data);
      setPartners(data.data);
    });
  }, []);
  return (
    <section className="container mx-auto px-6 mt-[75px] md:mt-[125px] space-y-16">
      <h2 className="text-4xl font-bold text-center">Our Partners</h2>

      <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 ">
        {partners.map((partner) => (
          <div key={partner.ordering} className="flex flex-col items-center">
            <Image
              src={partner.logo}
              alt={partner.logo}
              width={500}
              height={500}
              className="object-contain w-full max-w-[300px] max-h-[300px] max-lg:max-w-[200px] max-lg:max-h-[200px] border"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeOurPartnersSection;
