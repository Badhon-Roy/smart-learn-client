
"use server"

import { FieldValues } from "react-hook-form";



export const createOrder = async (orderData: FieldValues) => {
    const res = await fetch(`http://localhost:5000/api/v1/orders`, {
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
