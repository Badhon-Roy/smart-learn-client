import CourseDetails from "@/app/components/commonLayout/courses/courseDetails/CourseDetails";
import { getAllCourse, getSingleCourse } from "@/services/course";
import { ICourse } from "@/types";


const CourseDetailsPage = async ({params} : {params : Promise<{id: string}>}) => {
    const { id } = await params;
    const {data: course} = await getSingleCourse({id});
    const {data: allCourses} = await getAllCourse();
    const filterCourse = allCourses?.filter((item : ICourse) => item?.category?.name === course?.category?.name)
    return (
        <div>
            <CourseDetails course={course} filterCourse={filterCourse}/>
        </div>
    );
};

export default CourseDetailsPage;