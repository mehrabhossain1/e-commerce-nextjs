"use client";

import { cartReducer, CartState } from "@/reducers/cartReducer";
import { createContext, useContext, useReducer, useEffect } from "react";

interface CartContextType {
    state: CartState;
    dispatch: React.Dispatch<any>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Initialize state from localStorage if available
const getInitialState = (): CartState => {
    if (typeof window !== "undefined") {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                return { items: parsedCart };
            } catch (error) {
                console.error("Failed to parse cart from localStorage:", error);
            }
        }
    }
    return { items: [] };
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, getInitialState());

    // Save cart to localStorage on state updates
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state.items));
    }, [state.items]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
