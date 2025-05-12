import UpdateCategoryForm from "@/app/components/dashboardLayout/instructor/category/UpdateCategoryForm";
import { getSingleCategory } from "@/services/category";

const UpdateCategoryDashboardPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { data : category} = await getSingleCategory({ id: id })

    return (
        <div className="p-6">
            <UpdateCategoryForm category={category}/>
        </div>
    );
};

export default UpdateCategoryDashboardPage;
