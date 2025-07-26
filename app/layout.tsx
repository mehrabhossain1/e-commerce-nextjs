import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/cartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProductProvider } from "@/contexts/productContext";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "E-commerce App",
    description: "A simple e-commerce application built with Next.js",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${roboto.className} antialiased`}>
                <ProductProvider>
                    <CartProvider>
                        <Header />
                        <main>{children}</main>
                        <Footer />
                    </CartProvider>
                </ProductProvider>
            </body>
        </html>
    );
}
