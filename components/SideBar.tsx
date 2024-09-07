"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Footer from "./Footer";
import PlaidLink from "./PlaidLink";

const SideBar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link
          href="/"
          className="mb-12 cursor-pointer items-center gap-2 no-underline flex	"
        >
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="page logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">E.Bank</h1>
        </Link>
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn("sidebar-link", { "bg-bankGradient": isActive })}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  className={cn({
                    "brightness-[3] invert-0": isActive,
                  })}
                  fill
                />
              </div>
              <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {item.label}
              </p>
            </Link>
          );
        })}
        <PlaidLink user={user}/>
      </nav>
      <Footer user={user}/>
    </section>
  );
};

export default SideBar;