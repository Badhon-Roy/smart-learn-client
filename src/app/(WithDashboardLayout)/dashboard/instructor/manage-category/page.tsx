import ManageCategory from "@/app/components/dashboardLayout/instructor/category/ManageCategory";
import { getAllCategory } from "@/services/category";


const ManageCategoryDashboardPage = async () => {
    const {data: categories} = await getAllCategory();
    return (
        <div>
           <ManageCategory categories={categories || []}/>
        </div>
    );
};

export default ManageCategoryDashboardPage;