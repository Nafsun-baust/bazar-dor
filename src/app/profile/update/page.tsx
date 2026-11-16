"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner text-[#1B7F4B]" />
      </div>
    );
  }

  if (!session?.user) return null;

  const currentName = name ?? session.user.name ?? "";

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await authClient.updateUser({ name: currentName });

    setSaving(false);

    if (error) {
      toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
      return;
    }

    toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-xl space-y-6 px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">তথ্য আপডেট করুন</h1>
        <Link
          href="/profile"
          className="text-xs font-semibold text-[#1B7F4B] hover:underline"
        >
          ← প্রোফাইলে ফিরুন
        </Link>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-600">
              নাম
            </label>
            <input
              type="text"
              required
              value={currentName}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full rounded-lg border-gray-200 text-sm focus:border-[#1B7F4B] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn w-full rounded-lg border-none bg-[#1B7F4B] text-white hover:bg-[#15663C]"
          >
            {saving ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </div>
    </div>
  );
}