"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/contexts/cartContext";
import Image from "next/image";

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
}

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { dispatch } = useCart();

    const handleAddToCart = () => {
        dispatch({
            type: "ADD_ITEM",
            payload: {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
            },
        });
    };

    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <div className="relative w-full h-48">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-t-md"
                    />
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardTitle className="text-lg font-semibold">
                    {product.name}
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                    ${product.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {product.description}
                </p>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={handleAddToCart}>
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}
