import CourseCard from "@/app/shared/CourseCard";
import { getAllCourse } from "@/services/course";
import { ICourse } from "@/types";
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import Image from "next/image";


const UpcomingCourses = async () => {
    const { data: courses } = await getAllCourse();
    const filteredCourses = courses?.filter((course: ICourse) => course?.status === "Upcoming");
    return (
        <div className="bg-[#f2f4f7]">
            <div className="container mx-auto py-20 w-2/3">
                <div className="flex flex-col items-center justify-center">
                    <div className="border border-gray-400 text-sm inline-block bg-white rounded-full p-1 pr-4">
                        <h3 className="flex items-center gap-2"><span className="bg-[#07a6992a] w-6 h-6 p-1 flex items-center justify-center rounded-full"><BoltOutlinedIcon className="text-[#07a698]" /></span> Coming Soon</h3>
                    </div>
                    <h2 className="text-[40px] font-bold my-4">Our Upcoming Courses</h2>
                </div>
                <div className="grid grid-cols-4 gap-8 mt-8">
                    {
                        filteredCourses?.slice(0, 8)?.map((course: ICourse) => (
                               <div key={course?._id} className="rounded-lg border border-gray-300 bg-white flex flex-col justify-between">
                                <div className="p-6 grow">
                                    <div>
                                        <Image
                                            className="rounded-lg w-full h-[120px] object-cover hover:scale-105 transition-transform duration-300"
                                            src={course?.thumbnail}
                                            alt="category"
                                            width={1000}
                                            height={300}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <p className="bg-[#07a6992a] inline-block px-3 py-1 text-sm rounded-full text-[#07a698] font-bold">{course?.category?.name}</p>
                                        <h2 className="my-3 text-[20px] font-semibold">{
                                                course?.title?.length > 35
                                                ? course?.title?.slice(0, 35) + "..."
                                                : course?.title
                                            }</h2>

                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default UpcomingCourses;