import ManageUsers from "@/app/components/dashboardLayout/admin/users/ManageUsers";
import { getAllUser } from "@/services/auth";

const ManageUsersDashboardPage = async() => {
    const {data : users} = await getAllUser();
    return (
        <div>
            <ManageUsers users={users || []}/>
        </div>
    );
};

export default ManageUsersDashboardPage;