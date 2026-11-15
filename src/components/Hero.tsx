import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const formattedDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 pb-2">
      <div className="flex flex-col-reverse items-center justify-between gap-8 rounded-2xl bg-[#eaf4ec] px-6 py-8 sm:px-12 sm:py-10 md:flex-row">
        <div className="max-w-xl">
          <div className="mb-3 inline-block rounded-full bg-[#d7ede0] px-3.5 py-1">
            <span className="text-xs font-medium text-[#1B7F4B]">
              {formattedDate}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="py-4 text-sm leading-relaxed text-gray-600 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#সব-পণ্য"
            className="btn border-none bg-[#1B7F4B] px-6 text-white hover:bg-[#15663C]"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        <div className="shrink-0">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের পণ্যের ঝুড়ি"
            width={340}
            height={260}
            className="h-auto w-60 object-contain sm:w-80"
            priority
          />
        </div>
      </div>
    </section>
  );
}