import Image from "next/image";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { ICourse } from "@/types";
import Link from "next/link";

const CourseCard = ({ course }: { course: ICourse }) => {
    const { _id, thumbnail, title, duration,status, studentsEnrolled
        , price, discountPrice, category
    } = course;
    return (
        <div key={_id} className="rounded-lg border border-gray-300 bg-white flex flex-col justify-between min-h-[500px]">
            <div className="p-6 grow">
                <div>
                    <Image
                        className="rounded-lg w-full h-[180px] object-cover hover:scale-105 transition-transform duration-300"
                        src={thumbnail}
                        alt="category"
                        width={1000}
                        height={300}
                    />
                </div>
                <div className="mt-4">
                    <p className="bg-[#07a6992a] inline-block px-3 py-1 text-sm rounded-full text-[#07a698] font-bold">{category?.name}</p>
                    <h2 className="my-3 text-[18px] md:text-[22px] font-semibold">{title}</h2>

                    <div className="flex justify-between items-center">
                        <p className="md:text-[16px] text-sm">Class/Dept: {course?.class}</p>
                        <p className="text-sm text-gray-300">
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-bold shadow-md ${status === "Ongoing"
                                    ? "bg-green-500/20 text-[#1cab55]"
                                    : status === "Upcoming"
                                        ? "bg-yellow-500/20 text-[#ffb500]"
                                        : "bg-blue-500/20 text-[#122048]"
                                    }`}
                            >
                                {status}
                            </span>
                        </p>
                    </div>

                    <div className="flex justify-between items-center mt-4 gap-4">
                        <p className="flex items-center gap-1 text-sm">
                            <TimerOutlinedIcon color={"action"} fontSize={"small"} /> Duration: {duration}
                        </p>
                        <p className="flex items-center gap-1 text-sm">
                            <Person2OutlinedIcon color={"action"} fontSize={"small"} /> Students: {studentsEnrolled?.length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-300 p-6 flex justify-between items-center">
                {discountPrice ? (
                    <p className="text-lg font-bold text-[#07a698]">
                        <span className="line-through text-gray-400">৳{price}</span>{" "}
                        ৳{(price - discountPrice * 0.01 * price).toFixed(2)}
                    </p>
                ) : (
                    <p className="text-lg font-bold text-[#07a698]">৳{price}</p>
                )}
                <Link href={`/courses/${_id}`}>
                <button className="border border-gray-300 rounded-full px-3 py-1 font-medium hover:border-[#07a698] cursor-pointer">
                    View Details
                </button>
                </Link>
            </div>
        </div>
    );
};

export default CourseCard;