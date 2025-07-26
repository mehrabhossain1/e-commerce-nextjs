"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useSWRConfig } from "swr";
import { useProduct } from "@/contexts/productContext";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
    const { state, dispatch } = useProduct();
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

    // Pagination handlers
    const goToPreviousPage = () => {
        if (state.page > 1) {
            dispatch({ type: "SET_PAGE", payload: state.page - 1 });
        }
    };

    const goToNextPage = () => {
        if (state.page < state.totalPages) {
            dispatch({ type: "SET_PAGE", payload: state.page + 1 });
        }
    };

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
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
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
            </div>
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
                        <Button
                            variant="outline"
                            onClick={goToPreviousPage}
                            disabled={state.page === 1}
                            aria-label="Previous page"
                        >
                            Previous
                        </Button>
                        <span className="text-gray-600">
                            Page {state.page} of {state.totalPages}
                        </span>
                        <Button
                            variant="outline"
                            onClick={goToNextPage}
                            disabled={state.page === state.totalPages}
                            aria-label="Next page"
                        >
                            Next
                        </Button>
                    </div>
                </>
            )}
        </section>
    );
}
