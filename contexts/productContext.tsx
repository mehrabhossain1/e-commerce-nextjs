"use client";

import {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    useEffect,
} from "react";
import useSWR from "swr";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    thumbnail: string;
}

interface ProductState {
    products: Product[];
    search: string;
    sortBy: string;
    page: number;
    totalPages: number;
    limit: number;
}

type ProductAction =
    | { type: "SET_PRODUCTS"; payload: { products: Product[]; total: number } }
    | { type: "SET_SEARCH"; payload: string }
    | { type: "SET_SORT_BY"; payload: string }
    | { type: "SET_PAGE"; payload: number };

const ProductContext = createContext<
    | {
          state: ProductState;
          dispatch: React.Dispatch<ProductAction>;
      }
    | undefined
>(undefined);

const productReducer = (
    state: ProductState,
    action: ProductAction
): ProductState => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {
                ...state,
                products: action.payload.products,
                totalPages: Math.ceil(action.payload.total / state.limit),
            };
        case "SET_SEARCH":
            return { ...state, search: action.payload, page: 1 }; // Reset to page 1 on search
        case "SET_SORT_BY":
            return { ...state, sortBy: action.payload, page: 1 }; // Reset to page 1 on sort
        case "SET_PAGE":
            return { ...state, page: action.payload };
        default:
            return state;
    }
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const initialState: ProductState = {
        products: [],
        search: "",
        sortBy: "default",
        page: 1,
        totalPages: 1,
        limit: 8,
    };

    const [state, dispatch] = useReducer(productReducer, initialState);
    const { data, error } = useSWR(
        `https://dummyjson.com/products?limit=${state.limit}&skip=${
            (state.page - 1) * state.limit
        }`,
        fetcher
    );

    // Update products when data is fetched
    useEffect(() => {
        if (data?.products) {
            dispatch({
                type: "SET_PRODUCTS",
                payload: { products: data.products, total: data.total },
            });
        }
    }, [data]);

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProduct must be used within a ProductProvider");
    }
    return context;
};
