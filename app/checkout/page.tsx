"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cartContext";

// Form schema with zod
const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    address: z
        .string()
        .min(5, { message: "Address must be at least 5 characters" }),
    cardNumber: z
        .string()
        .min(16, { message: "Card number must be 16 digits" })
        .max(16, { message: "Card number must be 16 digits" }),
});

export default function CheckoutPage() {
    const { state, dispatch } = useCart();
    const router = useRouter();

    // Calculate total
    const total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Initialize form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            address: "",
            cardNumber: "",
        },
    });

    // Handle form submission
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Simulate order processing
        alert(
            `Order placed successfully!\nDetails: ${JSON.stringify(
                values,
                null,
                2
            )}`
        );
        dispatch({ type: "CLEAR_CART" });
        router.push("/order-confirmation");
    };

    return (
        <section className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Form */}
                <div className="md:w-1/2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping & Payment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-6"
                                >
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="John Doe"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="john.doe@example.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Shipping Address
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="123 Main St, City, Country"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cardNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Card Number
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="1234 5678 9012 3456"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full">
                                        Place Order
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>

                {/* Cart Summary */}
                <div className="md:w-1/2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {state.items.length === 0 ? (
                                <p className="text-gray-500">
                                    Your cart is empty.
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {state.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between"
                                        >
                                            <div>
                                                <p className="font-semibold">
                                                    {item.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    ${item.price.toFixed(2)} x{" "}
                                                    {item.quantity}
                                                </p>
                                            </div>
                                            <p className="font-semibold">
                                                $
                                                {(
                                                    item.price * item.quantity
                                                ).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between font-bold">
                                            <p>Total</p>
                                            <p>${total.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
