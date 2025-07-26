"use client";

import ProductCard from "./ProductCard";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useSWRConfig } from "swr";
import { useProduct } from "@/contexts/productContext";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductList() {
    const { state } = useProduct();
    const { mutate } = useSWRConfig();

    // Filter and sort products
    const filteredProducts = state.products
        .filter((product) =>
            product.title.toLowerCase().includes(state.search.toLowerCase())
        )
        .sort((a, b) => {
            switch (state.sortBy) {
                case "price-asc":
                    return a.price - b.price;
                case "price-desc":
                    return b.price - a.price;
                case "title-asc":
                    return a.title.localeCompare(b.title);
                case "title-desc":
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });

    // Loading state
    if (!state.products.length) {
        return (
            <section className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold mb-8 text-center">
                    Our Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array(4)
                        .fill(0)
                        .map((_, i) => (
                            <Skeleton
                                key={i}
                                className="h-64 w-full rounded-lg"
                            />
                        ))}
                </div>
            </section>
        );
    }

    return (
        <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
                Our Products
            </h2>
            {/* <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Input
                    placeholder="Search products..."
                    value={state.search}
                    onChange={(e) =>
                        dispatch({
                            type: "SET_SEARCH",
                            payload: e.target.value,
                        })
                    }
                    className="max-w-md"
                />
                <Select
                    value={state.sortBy}
                    onValueChange={(value) =>
                        dispatch({ type: "SET_SORT_BY", payload: value })
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="price-asc">
                            Price: Low to High
                        </SelectItem>
                        <SelectItem value="price-desc">
                            Price: High to Low
                        </SelectItem>
                        <SelectItem value="title-asc">Title: A-Z</SelectItem>
                        <SelectItem value="title-desc">Title: Z-A</SelectItem>
                    </SelectContent>
                </Select>
            </div> */}
            {filteredProducts.length === 0 ? (
                <div className="text-center">
                    <p className="text-gray-500 mb-4">No products found.</p>
                    <Button
                        onClick={() =>
                            mutate(
                                `https://dummyjson.com/products?limit=${
                                    state.limit
                                }&skip=${(state.page - 1) * state.limit}`
                            )
                        }
                    >
                        Retry
                    </Button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <Link href="/products">
                            <Button className="w-full">
                                All products <ArrowRight />
                            </Button>
                        </Link>
                    </div>
                </>
            )}
        </section>
    );
}
