import ManageCourse from "@/app/components/dashboardLayout/instructor/ManageCourse";
import { getAllCourse } from "@/services/course";


const ManageCoursesDashboardPage =async () => {
    const {data} = await getAllCourse();
    console.log(data);
    return (
        <div>
            <ManageCourse courses={data || []}/>
        </div>
    );
};

export default ManageCoursesDashboardPage;