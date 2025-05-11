/* eslint-disable @typescript-eslint/no-explicit-any */
import CreateContent from "@/app/components/dashboardLayout/instructor/content/CreateContent";
import { getSingleCourse } from "@/services/course";
import Image from "next/image";

const AddContentDashboardPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { data: course } = await getSingleCourse({ id });

    return (
        <div className="px-4">
            <div className="rounded-3xl shadow-xl p-6 mb-10 border border-white/20 bg-[#0e1523]">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                    <div className="flex-1 w-full">
                        <Image
                            className="h-[200px] w-full object-cover rounded-2xl shadow-lg"
                            src={course?.thumbnail}
                            alt={course?.title}
                            width={1000}
                            height={200}
                        />
                    </div>
                    <div className="flex-1 text-white space-y-4 w-full">
                        <h2 className="text-2xl sm:text-3xl font-bold">{course?.title}</h2>
                        <p className="text-lg font-medium">Class: {course?.class}</p>
                        <p className="text-lg font-medium">Level: {course?.classLevel}</p>
                        <div className="space-y-1">
                            <h3 className="text-lg font-semibold underline">Instructors</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {course?.instructors?.map((ins: any, index: number) => (
                                    <p key={index} className="text-sm text-white/80">
                                        {ins?.instructor?.name}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CreateContent course={course} />
        </div>
    );
};

export default AddContentDashboardPage;
