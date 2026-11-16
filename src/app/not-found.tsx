import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
      <span className="rounded-full bg-[#eaf4ec] px-4 py-1 text-xs font-bold text-[#1B7F4B]">
        ৪০৪ এরর
      </span>
      <h1 className="mt-4 text-3xl font-bold text-gray-900">
        পেজটি খুঁজে পাওয়া যায়নি
      </h1>
      <p className="mt-2 max-w-md text-sm text-gray-500">
        আপনি যে পেজটি খুঁজছেন তা সরিয়ে ফেলা হয়েছে অথবা লিংকটি সঠিক নয়।
      </p>
      <Link
        href="/"
        className="btn mt-6 rounded-xl border-none bg-[#1B7F4B] px-6 text-white hover:bg-[#15663C]"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}