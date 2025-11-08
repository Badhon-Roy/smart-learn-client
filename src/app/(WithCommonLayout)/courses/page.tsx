import { lazy, Suspense } from "react";
const CommonBanner = lazy(() => import("@/app/common/CommonBanner"));
const AllCourses = lazy(() => import("@/app/components/commonLayout/courses/allCourses/AllCourses"));
import { getAllCategory } from "@/services/category";
import { getAllCourse } from "@/services/course";
import UpcomingCourses from "@/app/components/commonLayout/home/upcomingCourses/UpcomingCourses";
import { ICourse } from "@/types";


const CoursesPage = async () => {
    const { data: allCourses } = await getAllCourse();
    const filteredCourses = allCourses?.filter((course: ICourse) => course?.status === "Upcoming");
    const { data: allCategories } = await getAllCategory();
    return (
        <Suspense fallback={<div>Loading courses...</div>}>
            <CommonBanner title="Courses" />
            <AllCourses allCourses={allCourses} allCategories={allCategories} />
            <UpcomingCourses filteredCourses={[...filteredCourses, ...filteredCourses,...filteredCourses]}/>
        </Suspense>
    );
};

export default CoursesPage;