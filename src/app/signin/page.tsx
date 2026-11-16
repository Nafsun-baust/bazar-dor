"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const toastedRef = useRef(false);

  useEffect(() => {
    if (searchParams.get("unauthorized") === "1" && !toastedRef.current) {
      toastedRef.current = true;
      toast.error("এই পেজটি দেখতে আগে সাইন ইন করুন");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়");
      return;
    }

    if (data) {
      toast.success("সফলভাবে সাইন ইন হয়েছে");
      router.push("/");
      router.refresh();
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-180px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1B7F4B] p-2">
            <Image src="/logo-icon.png" alt="বাজার দর" width={28} height={28} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">সাইন ইন করুন</h1>
          <p className="mt-1 text-xs text-gray-500">
            আপনার বাজার দর অ্যাকাউন্টে প্রবেশ করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              ইমেইল
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="name@example.com"
              className="input input-bordered w-full rounded-xl text-sm focus:border-[#1B7F4B] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              পাসওয়ার্ড
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="input input-bordered w-full rounded-xl text-sm focus:border-[#1B7F4B] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full rounded-xl border-none bg-[#1B7F4B] text-white hover:bg-[#15663C]"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>

        <div className="divider my-5 text-xs text-gray-400">অথবা</div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="btn btn-outline w-full rounded-xl border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
        >
          Google দিয়ে চালিয়ে যান
        </button>

        <p className="mt-6 text-center text-xs text-gray-500">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-bold text-[#1B7F4B] hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
}