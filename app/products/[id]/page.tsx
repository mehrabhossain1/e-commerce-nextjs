"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { Star } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useCart } from "@/contexts/cartContext";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    reviews: {
        rating: number;
        comment: string;
        date: string;
        reviewerName: string;
        reviewerEmail: string;
    }[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params);
    const { data: product, error } = useSWR<Product>(
        `https://dummyjson.com/products/${resolvedParams.id}`,
        fetcher
    );
    const { dispatch } = useCart();
    const [mainImage, setMainImage] = useState<string>("");

    // Set initial main image
    useEffect(() => {
        if (product?.images) {
            setMainImage(product.images[0]);
        }
    }, [product]);

    // Handle add to cart
    const handleAddToCart = () => {
        if (product) {
            dispatch({
                type: "ADD_ITEM",
                payload: {
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    quantity: 1,
                },
            });
        }
    };

    // Loading state
    if (!product && !error) {
        return (
            <section className="container mx-auto px-4 py-12">
                <Skeleton className="h-8 w-1/3 mb-8" />
                <div className="flex flex-col md:flex-row gap-8">
                    <Skeleton className="h-96 w-full md:w-1/2" />
                    <div className="md:w-1/2 space-y-4">
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-10 w-40" />
                    </div>
                </div>
            </section>
        );
    }

    // Error state
    if (error) {
        return (
            <section className="container mx-auto px-4 py-12 text-center">
                <p className="text-red-500 mb-4">
                    Failed to load product details.
                </p>
                <Button asChild>
                    <Link href="/products">Back to Products</Link>
                </Button>
            </section>
        );
    }

    // Main render (product is guaranteed to be defined here)
    return (
        <section className="container mx-auto px-4 py-12">
            <Link
                href="/products"
                className="text-blue-600 hover:underline mb-4 inline-block"
            >
                &larr; Back to Products
            </Link>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Images */}
                <div className="md:w-1/2">
                    <Card>
                        <CardContent className="p-4">
                            <div className="relative w-full h-96">
                                <Image
                                    src={mainImage || product!.thumbnail}
                                    alt={product!.title}
                                    fill
                                    className="object-cover rounded-md"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "https://via.placeholder.com/600";
                                    }}
                                />
                            </div>
                            <div className="flex gap-2 mt-4">
                                {product!.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setMainImage(image)}
                                        className={`relative w-16 h-16 border-2 rounded-md overflow-hidden ${
                                            mainImage === image
                                                ? "border-blue-500"
                                                : "border-gray-200"
                                        }`}
                                        aria-label={`View image ${index + 1}`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${product!.title} image ${
                                                index + 1
                                            }`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Details */}
                <div className="md:w-1/2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                {product!.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold">
                                    ${product!.price.toFixed(2)}
                                </span>
                                <Badge
                                    variant={
                                        product!.stock > 0
                                            ? "default"
                                            : "destructive"
                                    }
                                >
                                    {product!.stock > 0
                                        ? `In Stock: ${product!.stock}`
                                        : "Out of Stock"}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${
                                            i < Math.round(product!.rating)
                                                ? "text-yellow-400 fill-current"
                                                : "text-gray-300"
                                        }`}
                                    />
                                ))}
                                <span className="ml-2 text-sm text-gray-600">
                                    ({product!.rating.toFixed(1)})
                                </span>
                            </div>
                            <p className="text-gray-600">
                                {product!.description}
                            </p>
                            <p className="text-sm text-gray-500">
                                <strong>Brand:</strong> {product!.brand}
                            </p>
                            <p className="text-sm text-gray-500">
                                <strong>Category:</strong> {product!.category}
                            </p>
                            <Button
                                onClick={handleAddToCart}
                                disabled={product!.stock === 0}
                                className="w-full"
                            >
                                Add to Cart
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Reviews */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Customer Reviews</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {product!.reviews.length === 0 ? (
                                <p className="text-gray-500">No reviews yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {product!.reviews.map((review, index) => (
                                        <div
                                            key={index}
                                            className="border-b pb-4"
                                        >
                                            <div className="flex items-center gap-1 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${
                                                            i < review.rating
                                                                ? "text-yellow-400 fill-current"
                                                                : "text-gray-300"
                                                        }`}
                                                    />
                                                ))}
                                                <span className="ml-2 text-sm text-gray-600">
                                                    {new Date(
                                                        review.date
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-gray-600">
                                                {review.comment}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                <strong>By:</strong>{" "}
                                                {review.reviewerName}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
