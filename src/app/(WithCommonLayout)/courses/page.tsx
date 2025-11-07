import { lazy, Suspense } from "react";
const CommonBanner = lazy(() => import("@/app/common/CommonBanner"));
const AllCourses = lazy(() => import("@/app/components/commonLayout/courses/allCourses/AllCourses"));
import { getAllCategory } from "@/services/category";
import { getAllCourse } from "@/services/course";


const CoursesPage = async () => {
    const { data: allCourses } = await getAllCourse();
    const { data: allCategories } = await getAllCategory();
    return (
        <Suspense fallback={<div>Loading courses...</div>}>
            <CommonBanner title="Courses" />
            <AllCourses allCourses={allCourses} allCategories={allCategories} />
        </Suspense>
    );
};

export default CoursesPage;