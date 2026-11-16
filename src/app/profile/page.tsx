"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";

export default function ProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <span className="loading loading-spinner text-[#1B7F4B]" />
            </div>
        );
    }

    if (!session?.user) return null;

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

    return (
        <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
                <p className="mt-1 text-xs text-gray-500">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>
            </div>

            <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                    {session.user.image ? (
                        <Image
                            src={session.user.image}
                            alt={session.user.name}
                            width={64}
                            height={64}
                            className="h-16 w-16 rounded-xl object-cover"
                        />
                    ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#1B7F4B] text-2xl font-bold text-white">
                            {session.user.name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            {session.user.name}
                        </h2>
                        <p className="text-xs text-gray-500">{session.user.email}</p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleSignOut}
                    className="btn btn-sm rounded-lg border border-red-200 bg-white text-xs font-semibold text-red-600 hover:border-red-300 hover:bg-red-50"
                >
                    ↪ সাইন আউট
                </button>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="text-base font-bold text-gray-900">তথ্য</h2>

                <div className="mt-4 space-y-4">
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-600">
                            নাম
                        </label>
                        <input
                            type="text"
                            readOnly
                            value={session.user.name}
                            className="input input-bordered w-full rounded-lg border-gray-200 bg-white text-sm text-gray-800 focus:outline-none"
                        />
                    </div>

                    <Link
                        href="/profile/update"
                        className="btn w-full rounded-lg border-none bg-[#1B7F4B] text-white hover:bg-[#15663C]"
                    >
                        আপডেট
                    </Link>
                </div>
            </div>
        </div>
    );
}