import Link from "next/link";

const ManageCourse = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-lg text-amber-500 font-bold">Manage Course</h2>
                <Link href='/dashboard/instructor/create-course'>
                    <button className="bg-amber-500 px-4 py-2 rounded-full font-bold cursor-pointer">Create New Course</button>
                </Link>
            </div>
        </div>
    );
};

export default ManageCourse;