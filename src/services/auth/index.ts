/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form"
import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";

export const registerUser = async (userData: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(userData)
    })
    return res.json();
}
export const loginUser = async (userData: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(userData)
    })
    const result = await res.json();
    if (result.success) {
        (await cookies()).set('accessToken', result.data.accessToken)
    }
    return result;
}

export const getCurrentUser = async () => {
    const accessToken = (await cookies()).get('accessToken')?.value;
    let decodedData = null;
    if (accessToken) {
        decodedData = await jwtDecode(accessToken)
        return decodedData;
    } else {
        return null;
    }
}

export const logout = async () => {
    try {
        (await cookies()).delete('accessToken')
    } catch (error: any) {
        return Error(error)
    }
}


export const getAllUser = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users`, {
            next: {
                tags: ["USER"]
            }
        })
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error)
    }
}
export const getSingleUser = async ({ id }: { id: string }) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${id}`, {
            next: {
                tags: ["USER"]
            }
        })
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error)
    }
}

export const updateUser = async (id: string, data: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        revalidateTag("USER")
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const deleteUser = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        revalidateTag("USER")
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
};


export const updateUserRole = async (id: string, role: 'admin' | 'student' | 'instructor') => {
    const accessToken = (await cookies()).get('accessToken')?.value;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/update-role/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                ...(accessToken && { Authorization: `${accessToken}` })
            },
            body: JSON.stringify({ role })
        });
        revalidateTag("USER")
        const result = await res.json();
        return result;
    }
    catch (error: any) {
        return Error(error);
    }
}
