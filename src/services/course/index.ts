"use server"


import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";


export const createCourse = async (courseData: FieldValues) => {
    const accessToken = (await cookies()).get('accessToken')?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/courses`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            ...(accessToken && { Authorization: `${accessToken}` })
        },
        body: JSON.stringify(courseData)
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create course");
    }

    return res.json();
};
