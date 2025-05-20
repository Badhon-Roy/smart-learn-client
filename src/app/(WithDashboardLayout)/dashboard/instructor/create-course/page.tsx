import CreateCourseForm from "@/app/components/dashboardLayout/instructor/course/CreateCourseForm";
import { getAllUser } from "@/services/auth";
import { getAllCategory } from "@/services/category";
import { IUser } from "@/types";
import Link from "next/link";


const CreateCourseDashboardPage = async() => {
    const {data: allUsers} = await getAllUser();
    const filterInstructors = await allUsers?.filter((user : IUser)=> user?.role === "instructor")
    const {data: allCategories} = await getAllCategory();
    return (
        <div >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl text-amber-500 font-bold">Create Course</h2>
                <Link href='/dashboard/instructor/manage-course'>
                    <button className="bg-amber-500 px-4 py-2 rounded-full font-bold cursor-pointer">Go Back</button>
                </Link>
            </div>
            <CreateCourseForm filterInstructors={filterInstructors || []} allCategories={allCategories}/>
        </div>
    );
};

export default CreateCourseDashboardPage;