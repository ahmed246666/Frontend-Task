"use client";
import Image from "next/image";
import Logo from "@/images/Logo.svg";
import arrowDown from "@/images/icons/arrowDown.svg";
import globe from "@/images/icons/globe.svg";
import Link from "next/link";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { usePathname } from "next/navigation";
import { Heart, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import MainButton from "../ui/MainButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const routes = [
  { name: "Home", route: "/" },
  { name: "About us", route: "#" },
  { name: "Services", route: "#" },
  {
    name: "Properties",
    route: "#",
    subRoutes: [
      { name: "Buy", route: "#" },
      { name: "Rent", route: "#" },
      { name: "Sell", route: "#" },
    ],
  },
  { name: "Our Partners", route: "#" },
  { name: "Contact us", route: "#" },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="p-4 absolute top-0 w-full h-[100px]">
      <div className="container mx-auto py-5 flex justify-between items-center gap-7">
        <Image src={Logo} alt="Logo" priority />

        <div className="hidden lg:flex items-center gap-4 xl:gap-10">
          <ul className="flex gap-5 xl:gap-10 shrink-0">
            {routes.map((item) => (
              <li key={item.name} className="text-white text-nowrap">
                {item.subRoutes ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex gap-2 items-center">
                      {item.name}
                      <Image src={arrowDown} alt="Arrow Down" width={10} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="rounded-none space-y-2 py-3 px-8 bg-white text-black">
                      {item.subRoutes.map((subRoute) => (
                        <DropdownMenuItem
                          key={subRoute.name}
                          className="border-l-2 py-1 border-black cursor-pointer"
                        >
                          {subRoute.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={item.route}
                    className={
                      pathname === item.route ? "relative activeLink" : ""
                    }
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <Image
                src={globe}
                alt="Globe"
                className="max-xl:w-5 max-xl:h-5"
              />
              <span className="text-white">Ar</span>
            </div>
            <div className="w-[1px] bg-white h-7"></div>
            <Heart
              strokeWidth={1}
              className="text-white w-6 h-6 max-xl:w-5 max-xl:h-5 shrink-0 "
            />
          </div>
          <Link href="/login">
            <MainButton
              label="Become an ambassador"
              mode="light"
              loading={false}
            />
          </Link>
        </div>
        <div className="lg:hidden flex items-center">
          <Sheet>
            <SheetTrigger>
              <Menu size={"30px"} color="#FFFFFF" />
            </SheetTrigger>
            <SheetContent className=" flex flex-col justify-center gap-14">
              <ul className="flex flex-col gap-8">
                {routes.map((item) => (
                  <li key={item.name} className="">
                    <Link
                      href={item.route}
                      className={`text-2xl font-bold ${
                        pathname === item.route ? "relative activeLink " : ""
                      }`}
                    >
                      {item.subRoutes ? (
                        <Accordion type="single" collapsible>
                          <AccordionItem value="item-1">
                            <AccordionTrigger>{item.name}</AccordionTrigger>
                            <AccordionContent>
                              <ul className="flex flex-col gap-4 list-inside ml-4 list-disc">
                                {item.subRoutes.map((subRoute) => (
                                  <li key={subRoute.name}>
                                    <Link href={subRoute.route}>
                                      {subRoute.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ) : (
                        <>{item.name}</>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/login">
                <MainButton
                  label="Become an ambassador"
                  mode="dark"
                  loading={false}
                />
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
