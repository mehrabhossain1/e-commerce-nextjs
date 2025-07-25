"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer, CartState, CartItem } from "@/reducers/cartReducer";

interface CartContextType {
    state: CartState;
    dispatch: React.Dispatch<any>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const initialState: CartState = {
        items: [],
    };

    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Load cart from localStorage on mount (bonus feature)
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            // Initialize cart with saved items
            parsedCart.forEach((item: CartItem) => {
                dispatch({ type: "ADD_ITEM", payload: item });
            });
        }
    }, []);

    // Save cart to localStorage on update
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
