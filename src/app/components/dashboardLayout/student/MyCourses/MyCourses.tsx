"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { getSingleUser } from "@/services/auth";
import { ICourse, IUser } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MyCourses = () => {
    const { user } = useUser();
    const [userData, setUserData] = useState<IUser | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.userId) {
                try {
                    const { data } = await getSingleUser({ id: user.userId });
                    console.log("Fetched user data:", data);
                    setUserData(data);
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                }
            }
        };

        fetchUserData();
    }, [user?.userId]);

    const handleContinueCourse = (id : string)=>{
        router.push(`/dashboard/student/my-courses/${id}`);
    }

    return (
        <div>
            {userData && userData?.enrolledCourses.length > 0 ? (
                <div>
                    <h3 className="text-3xl font-bold mb-6">🎓 Enrolled Courses</h3>
                    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8 my-8">
                        {userData.enrolledCourses.map((course: ICourse) => (
                            <div
                                key={course._id}
                                className="md:flex gap-6 p-5 border border-white/10 rounded-2xl shadow-lg bg-gradient-to-br from-[#0e1523] to-[#1a2437] hover:shadow-2xl transition duration-300"
                            >
                                <div className="md:w-1/3">
                                    <Image
                                        className="w-full h-[200px] object-cover rounded-xl transition duration-300 hover:scale-105"
                                        src={course?.thumbnail}
                                        alt={course?.title}
                                        width={1000}
                                        height={300}
                                    />
                                </div>
                                <div className="md:w-2/3 mt-4 lg:mt-0">
                                    <h2 className="text-2xl font-bold text-white">{course?.title}</h2>
                                    <p className="text-md font-medium text-gray-400 mt-2 mb-4">Smart Learn</p>
                                    <button onClick={()=>handleContinueCourse(course?._id as string)} className="bg-[#07A698] cursor-pointer transition px-5 py-2 rounded-full text-white font-semibold shadow-md">
                                        Continue Course
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-400 py-10 text-lg animate-pulse">Loading your enrolled courses...</p>
            )}
        </div>

    );
};

export default MyCourses;
