"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useCart } from "@/contexts/cartContext";
import { Trash2 } from "lucide-react";
import Link from "next/link";

interface CartPopoverProps {
    children: React.ReactNode;
}

export default function CartPopover({ children }: CartPopoverProps) {
    const { state, dispatch } = useCart();
    const [open, setOpen] = useState(false);

    const handleRemove = (id: number) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };

    const handleQuantityChange = (id: number, quantity: number) => {
        if (quantity < 1) return;
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    };

    const totalPrice = state.items
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);

    const handleCheckoutClick = () => {
        setOpen(false); // Close popover before navigation
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent className="w-80">
                <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
                {state.items.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                    <div>
                        {state.items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between py-2 border-b"
                            >
                                <div className="flex-1">
                                    <p className="text-sm font-medium">
                                        {item.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        ${item.price.toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handleQuantityChange(
                                                item.id,
                                                item.quantity - 1
                                            )
                                        }
                                    >
                                        −
                                    </Button>
                                    <span>{item.quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handleQuantityChange(
                                                item.id,
                                                item.quantity + 1
                                            )
                                        }
                                    >
                                        +
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleRemove(item.id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <div className="mt-4">
                            <p className="text-lg font-semibold">
                                Total: ${totalPrice}
                            </p>
                            <Button
                                className="w-full mt-4"
                                asChild
                                onClick={handleCheckoutClick}
                            >
                                <Link href="/checkout">
                                    Proceed to Checkout
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}
