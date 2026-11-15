"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TCategory } from "@/types/category";

export default function Navbar() {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const formattedDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="navbar mx-auto max-w-7xl px-4 py-2.5">
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1B7F4B] p-2">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-tight text-gray-900">
                বাজার দর
              </span>
              <span className="text-xs text-gray-500">{formattedDate}</span>
            </div>
          </Link>
        </div>

        <div className="navbar-end gap-2">
          <Link href="/signin" className="btn btn-ghost btn-sm">
            Sign In
          </Link>
          <Link
            href="/signup"
            className="btn btn-sm border-none bg-[#1B7F4B] text-white hover:bg-[#15663C]"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <nav className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4">
          <ul className="menu menu-horizontal min-w-max flex-nowrap gap-2 px-0 py-2 text-sm">
            <li>
              <Link
                href="/"
                className={
                  pathname === "/"
                    ? "rounded-lg bg-[#eaf4ec] font-semibold text-[#1B7F4B]"
                    : "text-gray-600 hover:bg-gray-50"
                }
              >
                সব পণ্য
              </Link>
            </li>

            {categories.map((cat) => {
              const href = `/category/${cat.slug}`;
              const isActive = pathname === href;

              return (
                <li key={cat.id}>
                  <Link
                    href={href}
                    className={
                      isActive
                        ? "rounded-lg bg-[#eaf4ec] font-semibold text-[#1B7F4B]"
                        : "text-gray-600 hover:bg-gray-50"
                    }
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.nameBn}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}