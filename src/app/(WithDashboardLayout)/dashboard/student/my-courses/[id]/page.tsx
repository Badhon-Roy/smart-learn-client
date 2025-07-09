import SingleCourseContent from "@/app/components/dashboardLayout/student/SingleCourseContent/SingleCourseContent";

 
const SingleCourseContentDashboardPage =async ({params} : {params : Promise<{id: string}>}) => {
    const { id } = await params;
    return (
        <div>
            <SingleCourseContent courseId={id}/>
        </div>
    );
};

export default SingleCourseContentDashboardPage;