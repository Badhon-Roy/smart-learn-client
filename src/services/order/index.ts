
"use server"

import { FieldValues } from "react-hook-form";



export const createOrder = async (orderData: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create course");
    }

    return res.json();
};
