import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Discover Quality Products at Unbeatable Prices
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                    Shop our curated collection of premium goods designed to
                    elevate your lifestyle.
                </p>
                <Button
                    asChild
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                >
                    <Link href="/products">Shop Now</Link>
                </Button>
            </div>
        </section>
    );
}
