import UpdateCourseForm from "@/app/components/dashboardLayout/instructor/course/UpdateCourseForm";
import { getAllUser } from "@/services/auth";
import { getAllCategory } from "@/services/category";
import { getSingleCourse } from "@/services/course";
import { IUser } from "@/types";



const UpdateCourseDashboardPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { data } = await getSingleCourse({ id: id })
    const { data: allUsers } = await getAllUser();
    const filterInstructors = await allUsers?.filter((user: IUser) => user?.role === "instructor")
    const { data: allCategories } = await getAllCategory();

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Update Course</h2>
            <UpdateCourseForm courseId={id} courseData={data} filterInstructors={filterInstructors} allCategories={allCategories} />
        </div>
    );
};

export default UpdateCourseDashboardPage;
