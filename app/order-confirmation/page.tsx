import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrderConfirmationPage() {
    return (
        <section className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-lg text-gray-600 mb-8">
                Thank you for your purchase. You will receive a confirmation
                email soon.
            </p>
            <Button asChild>
                <Link href="/">Continue Shopping</Link>
            </Button>
        </section>
    );
}
