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
import { ArrowRight } from "lucide-react";
import { useHandleProperties } from "@/hooks/apiHandlers/useHandleProperties";
import { City } from "@/types/types";

const HomePropertiesSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [properties, setProperties] = useState<City[]>([]);
  const { handleGetProperties } = useHandleProperties();

  useEffect(() => {
    if (!api) return;

    const updateCarouselState = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", updateCarouselState);
    updateCarouselState();

    return () => {
      api.off("select", updateCarouselState);
    };
  }, [api]);

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await handleGetProperties();
      setProperties(data?.data);
    };
    fetchProperties();
  }, []);
  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
  }, [properties]);

  return (
    <section className="container mx-auto px-6 my-[75px] md:my-[125px] lg:space-y-16 space-y-8">
      <h2 className="text-4xl max-md:text-3xl font-bold text-center">Properties</h2>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {properties?.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 group">
              <div className="m-3 border border-border">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-[250px] lg:h-[370px]"
                  width={500}
                  height={500}
                />
                <div className="flex justify-between items-center p-6">
                  <p className="text-lg">{item.name}</p>
                  <ArrowRight
                    strokeWidth={1.5}
                    className="h-6 w-6 rotate-90 group-hover:rotate-0 transition duration-700"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <div className="flex items-center justify-center gap-8">
          <CarouselPrevious />
          <div className="flex items-center gap-2">
            {count > 0 ? (
              Array.from({ length: count }, (_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index + 1 === current ? "bg-black" : "bg-[#EDEDEC]"}`}
                />
              ))
            ) : (
              <div className="w-2 h-2 rounded-full bg-black" />
            )}
          </div>
          <CarouselNext />
        </div>
      </Carousel>
    </section>
  );
};

export default HomePropertiesSection;
