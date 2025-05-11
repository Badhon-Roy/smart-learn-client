import CourseApproval from "@/app/components/dashboardLayout/admin/CourseApproval/CourseApproval";
import { getAllCourse } from "@/services/course";


const CourseApprovalDashboardPage = async () => {
    const { data } = await getAllCourse();
    return (
        <div>
           <CourseApproval courses={data || []}/>
        </div>
    );
};

export default CourseApprovalDashboardPage;