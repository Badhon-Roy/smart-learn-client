import AllCourses from "@/app/components/commonLayout/courses/allCourses/AllCourses";
import { getAllCategory } from "@/services/category";
import { getAllCourse } from "@/services/course";

 
const CoursesPage = async () => {
    const {data: allCourses}= await getAllCourse();
    const {data: allCategories} = await getAllCategory();
    return (
        <div>
            <AllCourses allCourses={allCourses} allCategories={allCategories}/>
        </div>
    );
};

export default CoursesPage;