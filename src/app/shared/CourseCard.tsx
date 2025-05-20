import Image from "next/image";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { ICourse } from "@/types";

const CourseCard = ({ course }: { course: ICourse }) => {
    return (
        <div key={course?._id} className="rounded-lg border border-gray-300 bg-white flex flex-col justify-between min-h-[500px]">
            <div className="p-6 grow">
                <div>
                    <Image
                        className="rounded-lg w-full h-[180px] object-cover hover:scale-105 transition-transform duration-300"
                        src={course?.thumbnail}
                        alt="category"
                        width={1000}
                        height={300}
                    />
                </div>
                <div className="mt-4">
                    <p className="bg-[#07a6992a] inline-block px-3 py-1 text-sm rounded-full text-[#07a698] font-bold">{course?.category?.name}</p>
                    <h2 className="my-3 text-[22px] font-semibold">{course?.title}</h2>

                    <div className="flex justify-between items-center">
                        <p>Class/Dept: {course?.class}</p>
                        <p className="text-sm text-gray-300">
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-bold shadow-md ${course.status === "Ongoing"
                                    ? "bg-green-500/20 text-[#1cab55]"
                                    : course.status === "Upcoming"
                                        ? "bg-yellow-500/20 text-[#ffb500]"
                                        : "bg-blue-500/20 text-[#122048]"
                                    }`}
                            >
                                {course.status}
                            </span>
                        </p>
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

            <div className="border-t border-gray-300 p-6 flex justify-between items-center">
                {course?.discountPrice ? (
                    <p className="text-lg font-bold text-[#07a698]">
                        <span className="line-through text-gray-400">৳{course?.price}</span>{" "}
                        ৳{(course?.price - course?.discountPrice * 0.01 * course?.price).toFixed(2)}
                    </p>
                ) : (
                    <p className="text-lg font-bold text-[#07a698]">৳{course?.price}</p>
                )}
                <button className="border border-gray-300 rounded-full px-3 py-1 font-medium hover:border-[#07a698] cursor-pointer">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default CourseCard;