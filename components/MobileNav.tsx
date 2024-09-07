"use client";
import React from "react";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Footer from "./Footer";

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            alt="menu icon"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="bg-white border-none">
          <Link
            href="/"
            className="cursor-pointer items-center gap-4 px-4 no-underline flex	"
          >
            <Image
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="page logo"
              className="size-[24px] max-xl:size-14"
            />
            <h1 className="text-26 font-ibm-plex-serif text-black-1 font-bold">
              E.Bank
            </h1>
          </Link>

          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex flex-col gap-6 h-full pt-16 text-white">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);
                  return (
                    <SheetClose asChild key={item.label}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn("mobilenav-sheet_close w-full", {
                          "bg-bankGradient": isActive,
                        })}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          className={cn({
                            "brightness-[3] invert-0": isActive,
                          })}
                          width={20}
                          height={20}
                        />
                        <p
                          className={cn(
                            "text-16 font-semibold text-black-2 tracking-wider	",
                            {
                              "!text-white": isActive,
                            }
                          )}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
            <Footer user={user}/>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
