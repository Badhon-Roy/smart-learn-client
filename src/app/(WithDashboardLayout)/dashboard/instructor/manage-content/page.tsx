"use server"
import ManageContent from "@/app/components/dashboardLayout/instructor/content/ManageContent";
import { getAllCourse } from "@/services/course";
import { ICourse } from "@/types";

const ManageContentDashboardPage = async () => {
    const { data } = await getAllCourse();
    const ongoingCourses = await data?.filter((course: ICourse) => course.status === "Ongoing")
    return (
        <div>
           <ManageContent ongoingCourses={ongoingCourses}/>
        </div>
    );
};

export default ManageContentDashboardPage;