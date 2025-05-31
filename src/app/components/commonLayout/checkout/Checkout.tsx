"use client";
import { getSingleCourse } from "@/services/course";
import { useEffect, useState } from "react";
import { CheckCircle } from "@mui/icons-material";
import Image from "next/image";
import { ICourse } from "@/types";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";



const Checkout = () => {
    const [course, setCourse] = useState<ICourse | null>(null);
    const router = useRouter();
    const {user} = useUser();

    useEffect(() => {
        const fetchCourse = async () => {
            const storedCourseId = localStorage.getItem("courseId");
            if (storedCourseId) {
                const { data } = await getSingleCourse({ id: storedCourseId });
                setCourse(data);
            }
        };

        fetchCourse();
    }, []);

    const handlePlaceOrder = () => {
        if(!user){
            router.push("/login");
        }
       router.push("/payment");
    };

    if (!course) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-[#e0f7fa] to-[#e0f2f1]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] to-[#e0f2f1] relative">
            <Image
                className="absolute top-32 left-10 w-[360px] h-[200px] object-contain"
                src="https://wp.rrdevs.net/edcare/wp-content/themes/edcare/assets/img/shapes/page-header-shape-1.png"
                alt={course.title}
                width={100}
                height={50}
            />
            <Image
                className="absolute top-0 right-0 w-[190px] h-[170px] object-contain"
                src="https://wp.rrdevs.net/edcare/wp-content/themes/edcare/assets/img/shapes/page-header-shape-3.png"
                alt={course.title}
                width={100}
                height={50}
            />
            <Image
                className="absolute bottom-32 right-10 w-[150px] h-[200px] object-contain"
                src="https://wp.rrdevs.net/edcare/wp-content/uploads/2025/04/course-shape-5.png"
                alt={course.title}
                width={100}
                height={50}
            />

            <div className="max-w-6xl mx-auto overflow-hidden p-6 md:p-10 transition-all">
                <h2 className="text-4xl font-extrabold text-center text-[#07a698] mb-10">Confirm Your Enrollment</h2>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Left: Course Details */}
                    <div className="space-y-6 border border-gray-300 rounded p-6">
                        <div className="relative">
                            <Image
                                className="w-full h-60 rounded object-cover shadow-md border border-gray-200 "
                                src={course?.thumbnail}
                                alt={course?.title}
                                width={500}
                                height={300}
                            />
                            <p className="bg-[#0e1523] inline-block px-3 py-1 text-sm rounded border text-white font-bold absolute top-2 left-2">{course?.category?.name}</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">{course?.title}</h3>
                            <div className="mt-4">


                                <div className="flex justify-between items-center">
                                    <p className="md:text-[16px] text-sm">Class/Dept: {course?.class}</p>
                                    <p className="md:text-[16px] text-sm">Level: {course?.classLevel}</p>
                                </div>

                                <div className="flex justify-between items-center mt-4 gap-4">
                                    <p className="flex items-center gap-1 text-sm">
                                        <TimerOutlinedIcon color={"action"} fontSize={"small"} /> Duration: {course?.duration}
                                    </p>
                                    <p className="flex items-center gap-1 text-sm">
                                        <Person2OutlinedIcon color={"action"} fontSize={"small"} /> Students: {course?.studentsEnrolled?.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Summary Box */}
                    <div className="bg-white shadow-xl rounded-2xl p-6 border border-dashed border-[#07a698]">
                        <h4 className="text-2xl font-semibold mb-4 text-teal-700">Order Summary</h4>

                        <div className="space-y-4 text-gray-700">
                            <div className="flex justify-between border-b pb-2">
                                <span>Course Price</span>
                                <span>৳{course.price.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span>Discount Price</span>
                                <span>৳{
                                    course.discountPrice
                                        ? (course.discountPrice * 0.01 * course.price).toFixed(2)
                                        : 0.00
                                }</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span>Delivery Charge</span>
                                <span>৳0.00</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-gray-800">
                                <span>Total</span>
                                <span>
                                    ৳{course.discountPrice
                                        ? (course.price - course.discountPrice * 0.01 * course.price).toFixed(2)
                                        : course.price.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            className="mt-6 cursor-pointer w-full bg-[#07a698] text-white text-lg py-3 rounded-xl hover:bg-[#00695c] transition-all shadow-lg"
                        >
                            Confirm & Enroll
                        </button>

                        <div className="mt-6 flex items-center gap-2 text-green-700 text-sm font-medium">
                            <CheckCircle fontSize="small" />
                            <span>Instant access & lifetime updates included</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
