"use server"


import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";


export const createCategory = async (categoryData: FieldValues) => {
    const accessToken = (await cookies()).get('accessToken')?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/categories`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            ...(accessToken && { Authorization: `${accessToken}` })
        },
        body: JSON.stringify(categoryData)
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create category");
    }

    return res.json();
};


export const getAllCategory = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/categories`, {
            next: {
                tags: ["CATEGORY"]
            }
        })
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error)
    }
}
export const getSingleCategory = async ({ id }: { id: string }) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/categories/${id}`, {
            next: {
                tags: ["CATEGORY"]
            }
        })
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error)
    }
}

export const updateCategory = async (id: string, data: FieldValues) => {
    const accessToken = (await cookies()).get('accessToken')?.value;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/categories/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                ...(accessToken && { Authorization: `${accessToken}` })
            },
            body: JSON.stringify(data)
        });
        revalidateTag("CATEGORY")
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const deleteCategory = async (id: string) => {
    const accessToken = (await cookies()).get('accessToken')?.value;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/categories/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                ...(accessToken && { Authorization: `${accessToken}` })
            }
        });
        revalidateTag("CATEGORY");
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error)
    }
}
