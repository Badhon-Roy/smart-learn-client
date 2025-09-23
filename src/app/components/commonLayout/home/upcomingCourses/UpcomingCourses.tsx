"use client"
import { ICourse } from "@/types";
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import Image from "next/image";


const UpcomingCourses = ({filteredCourses} : {filteredCourses : ICourse[]}) => {
   
    return (
        <div className="bg-[#f2f4f7] md:px-0 px-4">
            <div className="container mx-auto py-20 lg:w-2/3">
                <div className="flex flex-col items-center justify-center">
                    <div className="border border-gray-400 text-sm inline-block bg-white rounded-full p-1 pr-4">
                        <h3 className="flex items-center gap-2"><span className="bg-gradient-to-r from-[#07a698] to-[#04d9c2] rounded-full flex items-center justify-center text-white"><BoltOutlinedIcon /></span> Coming Soon</h3>
                    </div>
                    <h2 className="lg:text-[40px] md:text-[30px] text-[20px] font-bold my-4">Our Upcoming Courses</h2>
                </div>
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 lg:gap-8 gap-4 mt-8">
                    {
                        filteredCourses?.slice(0, 8)?.map((course: ICourse) => (
                               <div key={course?._id} className="rounded-lg border border-gray-300 bg-white flex flex-col justify-between">
                                <div className="lg:p-6 md:p-4 p-2 grow">
                                    <div>
                                        <Image
                                            className="rounded-lg w-full md:h-[120px] h-[90px] object-cover hover:scale-105 transition-transform duration-300"
                                            src={course?.thumbnail}
                                            alt="category"
                                            width={1000}
                                            height={300}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <p className="bg-[#07a6992a] inline-block px-3 py-1 text-[11px] md:text-sm rounded-full text-[#07a698] font-bold">{course?.category?.name}</p>
                                        <h2 className="my-3 lg:text-[20px] md:text-[16px] text-[14px] font-semibold">{
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