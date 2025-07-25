export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
}

export const products: Product[] = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 59.99,
        description:
            "High-quality wireless headphones with noise cancellation.",
        image: "/images/headphones.jpg",
    },
    {
        id: 2,
        name: "Smartphone Case",
        price: 19.99,
        description: "Durable and stylish case for your smartphone.",
        image: "/images/phone-case.jpg",
    },
    {
        id: 3,
        name: "Portable Charger",
        price: 29.99,
        description: "Compact power bank with fast-charging capabilities.",
        image: "/images/charger.jpg",
    },
    {
        id: 4,
        name: "Smart Watch",
        price: 99.99,
        description:
            "Track your fitness and stay connected with this smart watch.",
        image: "/images/smart-watch.jpg",
    },
];
