/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { registerUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const RegisterForm = () => {
    const router = useRouter();
  const {
    register,
    handleSubmit,
    reset
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastLoading = toast.loading("Registering...")
    try {
        const res = await registerUser(data)
        console.log(res);
        if (res.success) {
            toast.success("Register Successful", { id: toastLoading })
            reset();
            router.push('/login')
        } else if (res.err) {
            toast.error(res?.message || "Something went wrong!", { id: toastLoading })
        }
    } catch (error: any) {
        toast.error(error.message, { id: toastLoading })
    }
}

  return (
    <div className="relative bg-[#192136] min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-xl bg-[#192642]/70 backdrop-blur-lg border border-white/20 text-white">
        <h2 className="text-3xl font-semibold text-center mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium mb-1">Photo URL</label>
            <input
              type="text"
              {...register("photo", { required: "Photo URL is required" })}
              placeholder="Enter your profile photo URL"
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Password */}
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
              placeholder="Enter a strong password"
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-2 rounded-md bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500 transition duration-300 text-white font-semibold shadow-lg"
          >
            Register
          </button>
        </form>

        <p className="text-sm mt-6 text-center text-white/70">
          Already have an account?{" "}
          <a href="/login" className="underline text-cyan-400">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
