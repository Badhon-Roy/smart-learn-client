import CourseCard from "@/app/shared/CourseCard";
import { ICategory, ICourse } from "@/types";

const AllCourses = ({
    allCourses,
    allCategories,
}: {
    allCourses: ICourse[];
    allCategories: ICategory[];
}) => {
    const filteredCourses = allCourses?.filter(
        (course) =>
            course?.status === "Ongoing" &&
            course?.isApproved === true &&
            course?.category?.name
    );
    console.log(filteredCourses);

    // Get unique category names from filtered courses
    const usedCategoryNames = Array.from(
        new Set(filteredCourses?.map((course) => course?.category.name))
    );

    // Filter categories that are actually used
    const filteredCategories = allCategories?.filter((category) =>
        usedCategoryNames.includes(category.name)
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">All Courses</h1>

            {filteredCategories?.map((category) => {
                const categoryCourses = filteredCourses?.filter(
                    (course) => course?.category?.name === category?.name
                );

                return (
                    <div key={category?._id} className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-primary">
                            {category?.name} <span className="text-gray-500 text-sm">({categoryCourses?.length} Courses)</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {categoryCourses?.slice(0, 4)?.map((course) => (
                                <CourseCard key={course._id} course={course} />
                            ))}
                        </div>
                        {
                            categoryCourses?.length > 4 && <div className="flex justify-center items-center">
                                <button className="mt-4 hover:text-[#07a698] cursor-pointer hover:border hover:rounded-full px-4 py-2">সব দেখুন ➝</button>
                            </div>
                        }
                    </div>
                );
            })}
        </div>
    );
};

export default AllCourses;