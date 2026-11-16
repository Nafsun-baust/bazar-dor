"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TCategory } from "@/types/category";
import { authClient, useSession } from "@/lib/auth-client";

export default function Navbar() {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট হয়েছে");
          router.push("/signin");
        },
      },
    });
  };

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
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-[#1B7F4B]" />
          ) : session?.user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex cursor-pointer items-center gap-2.5 px-2 py-1"
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1B7F4B] text-sm font-bold text-white">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden text-sm font-semibold text-gray-800 sm:inline">
                  {session.user.name?.split(" ")[0]}
                </span>
                <span className="text-xs text-gray-500">▾</span>
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content z-50 mt-3 w-56 rounded-2xl border border-gray-100 bg-white p-3 shadow-lg"
              >
                <li className="pointer-events-none px-2 py-1.5">
                  <div className="flex flex-col items-start gap-0.5 p-0">
                    <span className="text-sm font-bold text-gray-900">
                      {session.user.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {session.user.email}
                    </span>
                  </div>
                </li>
                <li className="mt-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <span>👤</span>
                    <span>আমার প্রোফাইল</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-xs font-medium text-red-500 hover:bg-red-50"
                  >
                    <span>↪</span>
                    <span>সাইন আউট</span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="btn btn-sm border-none bg-[#1B7F4B] text-white hover:bg-[#15663C]"
              >
                Sign Up
              </Link>
            </>
          )}
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