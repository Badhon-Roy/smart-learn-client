import CourseCard from "@/app/shared/CourseCard";
import { getAllCourse } from "@/services/course";
import { ICourse } from "@/types";
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';


const FeatureCourses = async () => {
    const { data: courses } = await getAllCourse();
    const filteredCourses = courses?.filter((course: ICourse) => course?.status === "Ongoing");
    return (
        <div className="bg-[#f2f4f7]">
            <div className="container mx-auto py-20">
                <div className="">
                    <div className="border border-gray-400 text-sm inline-block bg-white rounded-full p-1 pr-4">
                        <h3 className="flex items-center gap-2"><span className="bg-[#07a6992a] w-6 h-6 p-1 flex items-center justify-center rounded-full"><BoltOutlinedIcon className="text-[#07a698]" /></span> Top Courses</h3>
                    </div>
                    <h2 className="text-[40px] font-bold my-4">Explore Our Courses</h2>
                </div>
                <div className="grid grid-cols-4 gap-8 mt-8">
                    {
                        filteredCourses?.slice(0, 8)?.map((course: ICourse) => (
                            <CourseCard key={course?._id} course={course} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default FeatureCourses;