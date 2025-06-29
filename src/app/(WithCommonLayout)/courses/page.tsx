import AllCourses from "@/app/components/commonLayout/courses/allCourses/AllCourses";
import { getAllCategory } from "@/services/category";
import { getAllCourse } from "@/services/course";
import { Suspense } from "react";


const CoursesPage = async () => {
    const { data: allCourses } = await getAllCourse();
    const { data: allCategories } = await getAllCategory();
    return (
        <Suspense fallback={<div>Loading courses...</div>}>
            <AllCourses allCourses={allCourses} allCategories={allCategories} />
        </Suspense>
    );
};

export default CoursesPage;