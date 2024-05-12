"use client"
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";

const StoreProvider = ({ children }) => {
    const store = useRef();
    if (!store.current) store.current = makeStore();
    
    return (
        <Provider store={store.current}>
            {children}
        </Provider>
    )
} 

export default StoreProvider;