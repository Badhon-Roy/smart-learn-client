/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { loginUser } from "@/services/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import Logo from "@/assets/images/logo.png";
import { useUser } from '@/context/UserContext';

type FormValues = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const router = useRouter();
    const { refetchUser } = useUser();
    const form = useForm<FormValues>({
        defaultValues: {
            email: "a@gmail.com",
            password: "123456"
        }
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset, setValue
    } = form;

   
const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastLoading = toast.loading("Logging...");
    try {
      const res = await loginUser(data);
      if (res.success) {
        toast.success(res.message, { id: toastLoading });
        await refetchUser();
        reset();
        router.push("/");
      } else {
        toast.error(res?.message || "Something went wrong!", { id: toastLoading });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastLoading });
    }
  };

    const handleAsInstructor = () => {
        setValue("email", "instractor@gmail.com");
        setValue("password", "123456");
        form.handleSubmit(onSubmit)();
    }
    const handleAsAdmin = () => {
        setValue("email", "admin@gmail.com");
        setValue("password", "123456");
        form.handleSubmit(onSubmit)();
    }

    return (
        <div className="relative bg-[#192136] min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background shape */}
            <Image
                className="absolute top-0 right-0 z-0 opacity-70"
                src="https://wp.rrdevs.net/edcare/wp-content/uploads/2025/02/appoint-shape.png"
                alt="appoint-shape"
                width={1200}
                height={500}
            />

            {/* Glass form */}
            <div className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-xl bg-[#192642] backdrop-blur-lg border border-white/20 text-white">

                <div className="flex justify-center mb-2">
                    <Image src={Logo} alt="smart_learn_logo" width={90} height={90} />
                </div>
                <h2 className="text-3xl font-semibold text-center mb-6">Welcome Back</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email address",
                                },
                            })}
                            className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 transition duration-300 text-white font-semibold shadow-lg"
                    >
                        Login
                    </button>
                </form>

                <div className="flex justify-between items-center gap-8">
                    <div className="flex-1">
                        <button title="Instructor credentials" onClick={handleAsInstructor} className="bg-[#07a698] w-full my-4 py-3 rounded cursor-pointer">
                            As a Instructor
                        </button>
                    </div>
                    <div className="flex-1">
                        <button title="Admin credentials" onClick={handleAsAdmin} className="bg-[#07a698] w-full my-4 py-3 rounded cursor-pointer">
                            As a Admin
                        </button>
                    </div>
                </div>
                <p className="text-sm mt-6 text-center text-white/70">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="underline text-cyan-400">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
