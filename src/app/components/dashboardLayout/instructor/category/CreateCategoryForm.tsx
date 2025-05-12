
"use client";
import { createCategory } from "@/services/category";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface Category {
    name: string;
    description: string;
    image: string;
}


const CreateCategory = () => {
    const router = useRouter();
    const form = useForm<Category>();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = form;


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastLoading = toast.loading("Adding...")
        console.log(data);
        try {
            const res = await createCategory(data)
            if (res.success) {
                toast.success(res.message, { id: toastLoading })
                router.push('/dashboard/instructor/manage-category')
            } else if (res.err) {
                toast.error(res?.message || "Something went wrong!", { id: toastLoading })
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastLoading })
        }
    }

    return (
        <div className="container mx-auto p-4 w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl text-amber-500 font-bold">Create Course</h2>
                <Link href='/dashboard/instructor/manage-category'>
                    <button className="bg-amber-500 px-4 py-2 rounded-full font-bold cursor-pointer">Go Back</button>
                </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-[#101929]/60 rounded-lg space-y-6 border border-white/20 md:m-8 md:my-0 my-8">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        {...register("name", {
                            required: "Title is required",
                        })}
                        className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Enter category name"
                    />
                    {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input
                        type="text"
                        {...register("image", {
                            required: "Image Url is required",
                        })}
                        className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Enter category image url"
                    />
                    {errors.image && (
                        <p className="text-red-400 text-sm mt-1">{errors.image.message}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <input
                        type="text"
                        {...register("description", {
                            required: "Description is required",
                        })}
                        className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="Enter category description"
                    />
                    {errors.description && (
                        <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full py-2 mt-2 cursor-pointer rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 transition duration-300 text-white font-semibold shadow-lg"
                >
                    Add
                </button>
            </form>
        </div>
    );
};

export default CreateCategory;
