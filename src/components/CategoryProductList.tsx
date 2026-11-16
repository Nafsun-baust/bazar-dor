"use client";
import { useState } from "react";
import Link from "next/link";
import { TProductPrice } from "@/types/product";
import ProductCard from "./ProductCard";

export default function CategoryProductList({ products, }: {
    products: TProductPrice[];
}) {
    const [sortOption, setSortOption] = useState<string>("default");

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === "lowToHigh") return a.today - b.today;
        if (sortOption === "highToLow") return b.today - a.today;
        return 0;
    });

    if (products.length === 0) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
                <h3 className="text-lg font-bold text-gray-900">
                    এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    অনুগ্রহ করে অন্য ক্যাটাগরি বা সব পণ্য দেখুন।
                </p>
                <Link
                    href="/"
                    className="btn btn-sm mt-4 border-none bg-[#1B7F4B] text-white hover:bg-[#15663C]"
                >
                    সব পণ্য দেখুন
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4">
                <span className="text-sm text-gray-600">
                    মোট{" "}
                    <strong className="font-bold text-gray-900">
                        {products.length.toLocaleString("bn-BD")}
                    </strong>{" "}
                    টি পণ্য পাওয়া গেছে
                </span>

                <div className="flex items-center gap-2">
                    <label
                        htmlFor="sort-select"
                        className="text-sm font-semibold text-gray-700"
                    >
                        সাজান:
                    </label>
                    <select
                        id="sort-select"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="select select-bordered select-sm rounded-xl border-gray-200 bg-gray-50 text-xs font-semibold focus:border-[#1B7F4B] focus:outline-none"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="lowToHigh">দাম: কম থেকে বেশি ↑</option>
                        <option value="highToLow">দাম: বেশি থেকে কম ↓</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}