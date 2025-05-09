import CreateCourseForm from "@/app/components/dashboardLayout/instructor/CreateCourseForm";
import { getAllUser } from "@/services/auth";
import { IUser } from "@/types";
import Link from "next/link";


const CreateCourseDashboardPage = async() => {
    const {data: allUsers} = await getAllUser();
    const filterInstructors = await allUsers?.filter((user : IUser)=> user?.role === "instructor")

    return (
        <div >
            <div className="flex justify-between items-center">
                <h2 className="text-lg text-amber-500 font-bold">Create Course</h2>
                <Link href='/dashboard/instructor/manage-course'>
                    <button className="bg-amber-500 px-4 py-2 rounded-full font-bold cursor-pointer">Go Back</button>
                </Link>
            </div>
            <CreateCourseForm filterInstructors={filterInstructors || []}/>
        </div>
    );
};

export default CreateCourseDashboardPage;