"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "নিবন্ধন সম্পন্ন করা যায়নি");
      return;
    }

    if (data) {
      await authClient.signOut();
      toast.success("নিবন্ধন সফল হয়েছে! এখন সাইন ইন করুন");
      router.push("/signin");
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
          <h1 className="text-2xl font-bold text-gray-900">নতুন অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="mt-1 text-xs text-gray-500">
            বাজার দর প্ল্যাটফর্মে নিবন্ধন করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              পূর্ণ নাম
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="আপনার নাম লিখুন"
              className="input input-bordered w-full rounded-xl text-sm focus:border-[#1B7F4B] focus:outline-none"
            />
          </div>

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
              minLength={8}
              placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
              className="input input-bordered w-full rounded-xl text-sm focus:border-[#1B7F4B] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-full rounded-xl border-none bg-[#1B7F4B] text-white hover:bg-[#15663C]"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন আপ"}
          </button>
        </form>

        <div className="divider my-5 text-xs text-gray-400">অথবা</div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="btn btn-outline w-full rounded-xl border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
        >
          Google দিয়ে নিবন্ধন করুন
        </button>

        <p className="mt-6 text-center text-xs text-gray-500">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-bold text-[#1B7F4B] hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}