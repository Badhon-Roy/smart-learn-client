
"use server"


import { revalidateTag } from "next/cache";
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


export const getAllCourse = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/courses`, {
            next: {
                tags: ["COURSE"]
            }
        })
        const result = await res.json();
        console.log(res);
        return result;
    } catch (error: any) {
        return Error(error)
    }
}
export const getSingleCourse = async ({ id }: { id: string }) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/courses/${id}`, {
            next: {
                tags: ["COURSE"]
            }
        })
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error)
    }
}

export const updateCourse = async (id: string, data: FieldValues) => {
    const accessToken = (await cookies()).get('accessToken')?.value;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/courses/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                ...(accessToken && { Authorization: `${accessToken}` })
            },
            body: JSON.stringify(data)
        });
        revalidateTag("COURSE")
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const AddContent = async (id: string, data: FieldValues) => {
    const accessToken = (await cookies()).get('accessToken')?.value;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/courses/${id}/add-lesson`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken && { Authorization: `${accessToken}` })
                },
                body: JSON.stringify(data)
            }
        );
        revalidateTag("COURSE")
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const updateCourseApproval = async (id: string, data: FieldValues) => {
    const accessToken = (await cookies()).get('accessToken')?.value;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/courses/approve/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken && { Authorization: `${accessToken}` })
                },
                body: JSON.stringify(data)
            }
        );
        revalidateTag("COURSE")
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const deleteCourse = async (id: string) => {
    const accessToken = (await cookies()).get('accessToken')?.value;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/courses/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                ...(accessToken && { Authorization: `${accessToken}` })
            }
        });
        revalidateTag("COURSE");
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error)
    }
}

export const updateCourseStatus = async (id: string, status:  "Ongoing" | "Upcoming" | "Completed") => {
    const accessToken = (await cookies()).get('accessToken')?.value;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/courses/status/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                ...(accessToken && { Authorization: `${accessToken}` })
            },
            body: JSON.stringify({ status })
        });
        revalidateTag("COURSE")
        const result = await res.json();
        return result;
    }
    catch (error: any) {
        return Error(error);
    }
}
