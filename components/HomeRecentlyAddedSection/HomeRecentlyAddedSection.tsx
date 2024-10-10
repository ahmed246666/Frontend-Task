"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import ImageRecently1 from "@/images/ImageRecently1.webp";
import ImageRecently2 from "@/images/ImageRecently2.webp";
import ImageRecently3 from "@/images/ImageRecently3.webp";
import logoPropertyOwner from "@/images/logoPropertyOwner.png";
import locationImage from "@/images/icons/location.svg";
import bathroomImage from "@/images/icons/bathroom.svg";
import bedroomImage from "@/images/icons/bedroom.svg";
import areaImage from "@/images/icons/area.svg";
import apartment from "@/images/icons/apartment.svg";
import bgLogoPattern from "@/images/bgLogoPattern.svg";
import { ArrowRight, Heart } from "lucide-react";

const HomeRecentlyAddedSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
 
  const recentlyAdded = [
    {
      name: "TULWA for sale in west orascom",
      image: ImageRecently1,
      propertyOwner: logoPropertyOwner,
      location: "Est St, 77 - Central Park South, NYC",
      bathrooms: 2,
      bedrooms: 2,
      area: "1200",
      price: "524.000 ",
      priceMonthly: "85.000",
    },
    {
      name: "TULWA for sale in west orascom",
      image: ImageRecently2,
      propertyOwner: logoPropertyOwner,
      location: "Est St, 77 - Central Park South, NYC",
      bathrooms: 2,
      bedrooms: 2,
      area: "1200",
      price: "524.000 ",
      priceMonthly: "85.000",
    },
    {
      name: "TULWA for sale in west orascom",
      image: ImageRecently3,
      propertyOwner: logoPropertyOwner,
      location: "Est St, 77 - Central Park South, NYC",
      bathrooms: 2,
      bedrooms: 2,
      area: "1200",
      price: "524.000 ",
      priceMonthly: "85.000",
    },
    {
      name: "TULWA for sale in west orascom",
      image: ImageRecently2,
      propertyOwner: logoPropertyOwner,
      location: "Est St, 77 - Central Park South, NYC",
      bathrooms: 2,
      bedrooms: 2,
      area: "1200",
      price: "524.000 ",
      priceMonthly: "85.000",
    },
  ];

  return (
    <section className="relative">
      <Image
        src={bgLogoPattern}
        alt="bgLogoPattern"
        className="absolute -bottom-[15%] right-0 h-full object-contain"
      />

      <div className="container mx-auto px-6 my-[75px] md:my-[125px] space-y-10 relative">
        <h2 className="text-4xl max-md:text-3xl font-bold text-center">Recently Added</h2>
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {recentlyAdded.map((item, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 group"
              >
                <div className="m-3 border border-border bg-white">
                  <div className="relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-[250px] lg:h-[370px] rounded-t-lg"
                      width={500}
                      height={500}
                    />
                    <Image
                      src={item.propertyOwner}
                      alt={item.name}
                      className="object-cover w-10 h-10 absolute top-4 left-4"
                    />
                    <div className="absolute top-4 right-4 rounded-full bg-white flex items-center justify-center w-10 h-10">
                      <Heart
                        strokeWidth={1}
                        color="#D20300"
                        className="w-6 h-6 -mb-0.5"
                      />
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white p-2 flex items-center justify-center gap-2">
                      <Image
                        src={apartment}
                        alt="apartment"
                        className="w-4 h-4"
                      />
                      <p className="font-medium text-xs">Apartment</p>
                    </div>
                  </div>
                  <div className="p-6 max-lg:p-4 space-y-5 max-lg:space-y-3">
                    <p className="text-xl max-lg:text-lg">{item.name}</p>
                    <div className="flex items-center gap-2">
                      <Image
                        src={locationImage}
                        alt="location"
                        className="w-4 h-4"
                      />
                      <p className="text-gray-400 max-lg:text-sm">{item.location}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Image
                          src={bathroomImage}
                          alt="bathroom"
                          className="w-4 h-4"
                        />
                        <p className="max-lg:text-sm">{item.bathrooms} bathroom</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Image
                          src={bedroomImage}
                          alt="bedroom"
                          className="w-4 h-4"
                        />
                        <p className="max-lg:text-sm">{item.bedrooms} bedroom</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Image
                          src={areaImage}
                          alt="area"
                          className="w-4 h-4"
                        />
                        <p className="max-lg:text-sm">{item.area} m</p>
                      </div>
                    </div>
                    <hr className="border-t border-gray-100" />
                    <div className="flex justify-between items-center">
                      <div className="space-y-3">
                        <p className="text-lg font-medium">{item.price} EGP</p>
                        <p className="text-gray-400">
                          {item.priceMonthly} Monthly
                        </p>
                      </div>
                      <ArrowRight
                        strokeWidth={1.5}
                        className="h-8 w-8 -rotate-45 group-hover:rotate-0 transition duration-700"
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-8">
            <CarouselPrevious />
            <div className="flex items-center gap-2">
              {count ? (
                [...Array(count)].map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index + 1 === current ? "bg-black" : "bg-[#EDEDEC]"
                    }`}
                  />
                ))
              ) : (
                <div className="w-2 h-2 rounded-full bg-black" />
              )}
            </div>
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default HomeRecentlyAddedSection;
