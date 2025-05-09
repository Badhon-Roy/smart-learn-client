import UpdateCourseForm from "@/app/components/dashboardLayout/instructor/course/UpdateCourseForm";
import { getAllUser } from "@/services/auth";
import { getSingleCourse } from "@/services/course";
import { IUser } from "@/types";



const UpdateCourseDashboardPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    console.log(id);
    const { data } = await getSingleCourse({ id: id })
    const { data: allUsers } = await getAllUser();
    const filterInstructors = await allUsers?.filter((user: IUser) => user?.role === "instructor")

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Update Course</h2>
            <UpdateCourseForm courseId={id} courseData={data} filterInstructors={filterInstructors} />
        </div>
    );
};

export default UpdateCourseDashboardPage;
