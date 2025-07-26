import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
            {/* Gradient overlay and decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative container mx-auto px-4 md:px-4">
                <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-12 xl:grid-cols-[1fr_500px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 px-3 py-1 text-sm text-white">
                                New Collection Available
                            </div>
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                                Discover Premium Quality{" "}
                                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Products
                                </span>
                            </h1>
                            <p className="max-w-[600px] text-gray-300 md:text-xl">
                                Shop our curated collection of premium products
                                designed for modern living. Quality
                                craftsmanship meets contemporary style in every
                                piece.
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                                <span className="text-sm text-gray-300 ml-2">
                                    4.9/5 from 2,500+ reviews
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button
                                size="lg"
                                className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/25"
                            >
                                <ShoppingBag className="mr-2 h-4 w-4" />
                                Shop Now
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                asChild
                                className="border-white/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm bg-transparent"
                            >
                                <Link href="/collections">
                                    Browse Collections
                                </Link>
                            </Button>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-300">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
                                <span>Free shipping over $50</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                                <span>30-day returns</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-30"></div>
                            <Image
                                src="https://img.freepik.com/free-vector/shopping-online-with-computer-ecommerce-sale_24877-56060.jpg?t=st=1753519502~exp=1753523102~hmac=5e8d787a5110a26c8a27fe4e282a524b0f91575e7c6d530176627f3c94433e9b&w=1380"
                                width="600"
                                height="600"
                                alt="Premium products showcase"
                                className="relative mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center border border-white/10 shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
