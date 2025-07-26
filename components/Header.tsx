"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import CartPopover from "./CartPopover";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/cartContext";

export default function Header() {
    const { state } = useCart();
    const [isHydrated, setIsHydrated] = useState(false);

    // Set isHydrated to true after client-side mount
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const itemCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-gray-800">
                    E-Shop
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-6 font-semibold">
                    <Link
                        href="/"
                        className="text-gray-600 hover:text-gray-800"
                    >
                        Home
                    </Link>
                    <Link
                        href="/products"
                        className="text-gray-600 hover:text-gray-800"
                    >
                        Products
                    </Link>
                    <Link
                        href="/about"
                        className="text-gray-600 hover:text-gray-800"
                    >
                        About
                    </Link>
                    <Link
                        href="/checkout"
                        className="text-gray-600 hover:text-gray-800"
                    >
                        Checkout
                    </Link>
                </nav>

                {/* Cart Icon with Popover */}
                <div className="relative">
                    <CartPopover>
                        <Button variant="outline" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            {isHydrated && itemCount > 0 && (
                                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                                    {itemCount}
                                </Badge>
                            )}
                        </Button>
                    </CartPopover>
                </div>
            </div>
        </header>
    );
}
