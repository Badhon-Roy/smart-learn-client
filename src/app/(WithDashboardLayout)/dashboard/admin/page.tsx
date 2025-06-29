"use server"
import { getAllUser } from "@/services/auth";
import { getAllCourse } from "@/services/course";
import { ICourse, IUser } from "@/types";
import {
    // People,
    // MenuBook,
    // PersonPin,
    // AttachMoney,
    // QueryStats,
    // ThumbUp,
    NotificationsActive,
    BarChart,
    Feedback,
    // WbSunny,
    // DarkMode,
    AdminPanelSettings,
    Settings,
    Bolt,
    Build,
    ManageAccounts,
    GroupsOutlined,
} from "@mui/icons-material";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { LinearProgress, Stack } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";


const BorderLinearProgress = ({ value }: { value: any }) => (
    <LinearProgress
        variant="determinate"
        value={value}
        sx={{
            height: 8,
            borderRadius: 8,
            '& .MuiLinearProgress-bar': {
                backgroundColor: 'white',
            },
        }}
    />
)

const columns = [
    { id: "user", label: "User", minWidth: 200 },
    { id: "email", label: "Email", minWidth: 180 },
    { id: "role", label: "Role", minWidth: 100 }
];

const courseColumns = [
    { id: "thumbnail", label: "Thumbnail", minWidth: 100 },
    { id: "title", label: "Title", minWidth: 170 },
    { id: "price", label: "Price", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 120 },
    { id: "isApproved", label: "Approval", minWidth: 120 },
];



const AdminDashboardPage = async () => {
    const { data: allUsers } = await getAllUser();
    const { data: allCourses } = await getAllCourse();
    const approvalCourses = await allCourses?.filter((course: ICourse) => course?.isApproved === true)
    console.log(approvalCourses);
    const instructors = await allUsers?.filter((user: IUser) => user?.role === "instructor")
    const students = await allUsers?.filter((user: IUser) => user?.role === "student")
    return (
        <div className='md:mx-0 mx-4'>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">🛡️ Admin Dashboard & Panel</h1>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {/* Total Students */}
                <div className="bg-[#6a73fa] border border-white px-5 py-8 rounded-lg flex items-center gap-6">

                    <div className="bg-[#0e1523] border border-white  inline-block justify-center items-center p-6 rounded-full">
                        <GroupsOutlined />
                    </div>
                    <div className="flex-1">
                        <h2 className="uppercase font-medium text-[16px]">Total Students</h2>
                        <h2 className="text-3xl font-bold my-2">{students?.length}</h2>
                        <Stack spacing={2} sx={{ flexGrow: 1 }}>
                            {/* Add the custom BorderLinearProgress with the value prop */}
                            <BorderLinearProgress value={50} />
                        </Stack>
                        <p className="text-sm mt-2">80% Increase in 20 Days</p>
                    </div>
                </div>
                {/* Total Instructors */}
                <div className="bg-[#ffaa16] border border-white px-5 py-8 rounded-lg flex items-center gap-6">

                    <div className="bg-[#0e1523] border border-white inline-block justify-center items-center p-6 rounded-full">
                        <GroupOutlinedIcon />
                    </div>
                    <div className="flex-1">
                        <h2 className="uppercase font-medium text-[16px]">Total Instructors</h2>
                        <h2 className="text-3xl font-bold my-2">{instructors?.length}</h2>
                        <Stack spacing={2} sx={{ flexGrow: 1 }}>
                            {/* Add the custom BorderLinearProgress with the value prop */}
                            <BorderLinearProgress value={50} />
                        </Stack>
                        <p className="text-sm mt-2">80% Increase in 20 Days</p>
                    </div>
                </div>
                {/* Total Courses */}
                <div className="bg-[#07a698] border border-white px-5 py-8 rounded-lg flex items-center gap-6">

                    <div className="bg-[#0e1523] border border-white inline-block justify-center items-center p-6 rounded-full">
                        <SchoolOutlinedIcon />
                    </div>
                    <div className="flex-1">
                        <h2 className="uppercase font-medium text-[16px]">Total Courses</h2>
                        <h2 className="text-3xl font-bold my-2">{allCourses?.length}</h2>
                        <Stack spacing={2} sx={{ flexGrow: 1 }}>
                            {/* Add the custom BorderLinearProgress with the value prop */}
                            <BorderLinearProgress value={50} />
                        </Stack>
                        <p className="text-sm mt-2">80% Increase in 20 Days</p>
                    </div>
                </div>

                {/* Total Courses */}
                <div className="bg-[#ff1616] border border-white px-5 py-8 rounded-lg flex items-center gap-6">

                    <div className="bg-[#0e1523] border border-white inline-block justify-center items-center p-6 rounded-full">
                        <SchoolOutlinedIcon />
                    </div>
                    <div className="flex-1">
                        <h2 className="uppercase font-medium text-[16px]">Total Revenue</h2>
                        <h2 className="text-3xl font-bold my-2">10000</h2>
                        <Stack spacing={2} sx={{ flexGrow: 1 }}>
                            <BorderLinearProgress value={80} />
                        </Stack>
                        <p className="text-sm mt-2">80% Increase in 20 Days</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between gap-6">
                <div className="rounded-xl shadow-2xl backdrop-blur-lg bg-[#0e1523] border border-white/30 flex-1">
                    {/* Responsive Scroll Wrapper */}
                    <div className="w-full overflow-x-auto">
                        <TableContainer sx={{ maxHeight: 600 }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <h2 className="text-2xl font-medium p-4">Top Five Instructor List</h2>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                style={{
                                                    minWidth: column.minWidth,
                                                    fontWeight: 700,
                                                    fontSize: "16px",
                                                    backgroundColor: "#0e1523",
                                                    color: "white",
                                                    borderBottom: "1px solid rgba(255,255,255,0.2)",
                                                }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {instructors?.slice(0, 5)?.map((instructor: IUser) => (
                                        <TableRow
                                            key={instructor._id}
                                            hover
                                            className="hover:bg-white/20 transition text-white"
                                        >
                                            <TableCell>
                                                {instructor.photo ? (
                                                    <Image
                                                        src={instructor?.photo}
                                                        alt='instructor'
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full object-cover shadow-md"
                                                    />
                                                ) : (
                                                    <Image
                                                        src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png"
                                                        alt='instructor'
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full object-cover shadow-md"
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell >
                                                <span className="text-gray-300 font-medium"> {instructor?.name}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-gray-300 font-medium">{instructor.email}</span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                <div className="rounded-xl shadow-2xl backdrop-blur-lg bg-[#0e1523] border border-white/30 flex-1">
                    {/* Responsive Scroll Wrapper */}
                    <div className="w-full overflow-x-auto">
                        <TableContainer sx={{ maxHeight: 600 }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <h2 className="text-2xl font-medium p-4">Top Five Student List</h2>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                style={{
                                                    minWidth: column.minWidth,
                                                    fontWeight: 700,
                                                    fontSize: "16px",
                                                    backgroundColor: "#0e1523",
                                                    color: "white",
                                                    borderBottom: "1px solid rgba(255,255,255,0.2)",
                                                }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {students?.slice(0, 5)?.map((student: IUser) => (
                                        <TableRow
                                            key={student._id}
                                            hover
                                            className="hover:bg-white/20 transition text-white"
                                        >
                                            <TableCell>
                                                {student.photo ? (
                                                    <Image
                                                        src={student?.photo}
                                                        alt='student'
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full object-cover shadow-md"
                                                    />
                                                ) : (
                                                    <Image
                                                        src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png"
                                                        alt='student'
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full object-cover shadow-md"
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell >
                                                <span className="text-gray-300 font-medium"> {student?.name}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-gray-300 font-medium">{student.email}</span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
            <div className="my-10">
                <div className="rounded-xl shadow-2xl backdrop-blur-lg bg-[#0e1523] border border-white/30 flex-1">
                    {/* Responsive Scroll Wrapper */}
                    <div className="w-full overflow-x-auto">
                        <TableContainer sx={{ maxHeight: 600 }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <h2 className="text-2xl font-medium p-4">Course List</h2>
                                    <TableRow>
                                        {courseColumns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                style={{
                                                    minWidth: column.minWidth,
                                                    fontWeight: 700,
                                                    fontSize: "16px",
                                                    backgroundColor: "#0e1523",
                                                    color: "white",
                                                    borderBottom: "1px solid rgba(255,255,255,0.2)",
                                                }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {allCourses?.slice(0, 5)?.map((course: ICourse) => (
                                        <TableRow
                                            key={course._id}
                                            hover
                                            className="hover:bg-white/20 transition text-white"
                                        >
                                            <TableCell>
                                                {course.thumbnail ? (
                                                    <Image
                                                        src={course?.thumbnail}
                                                        alt='course'
                                                        width={80}
                                                        height={60}
                                                        className="rounded-lg object-cover shadow-md"
                                                    />
                                                ) : (
                                                    <Image
                                                        src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png"
                                                        alt='course'
                                                        width={80}
                                                        height={60}
                                                        className="rounded-lg object-cover shadow-md"
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell >
                                                <span className="text-gray-300 font-medium"> {course?.title}</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-gray-300 font-medium">{course?.price}tk</span>
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-bold shadow-md ${course.status === "Ongoing"
                                                        ? "bg-green-500/20 text-green-300"
                                                        : course.status === "Upcoming"
                                                            ? "bg-yellow-500/20 text-yellow-300"
                                                            : "bg-blue-500/20 text-blue-300"
                                                        }`}
                                                >
                                                    {course.status}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-bold shadow-md ${course.isApproved === true
                                                        ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-300"
                                                        }`}
                                                >
                                                    {course.isApproved === true ? "Approved" : "Pending"}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>


            {/* Main Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                {/* Course Chart */}
                <div className="card col-span-2 bg-white dark:bg-gray-800 shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">📈 Course Performance</h2>
                    <div className="bg-gray-100 dark:bg-gray-700 h-56 flex items-center justify-center text-gray-500 rounded-lg">
                        Chart integration here
                    </div>
                </div>

                {/* Notifications */}
                <div className="card bg-white dark:bg-gray-800 shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <NotificationsActive /> System Notifications
                    </h2>
                    <ul className="space-y-2 text-sm">
                        <li>🎉 New instructor signup: Sarah</li>
                        <li>🚨 Pending approval: `&quot;`Node.js Basics`&quot;`</li>
                        <li>✅ 200+ enrollments this week</li>
                        <li>⚙️ Maintenance: May 15</li>
                    </ul>
                </div>
            </div>

            {/* Feedback and Top Courses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                <div className="card bg-white dark:bg-gray-800 shadow-lg p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Feedback /> Recent Feedback
                    </h2>
                    <ul className="text-sm space-y-2">
                        <li>“Loving the React course!” - John</li>
                        <li>“Dashboard is clean.” - Maria</li>
                        <li>“Need more design tutorials.” - Ayesha</li>
                    </ul>
                </div>

                <div className="card bg-white dark:bg-gray-800 shadow-lg p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <BarChart /> Top Rated Courses
                    </h2>
                    <ol className="list-decimal ml-5 space-y-1 text-sm">
                        <li>Advanced React - 4.9 ⭐</li>
                        <li>MongoDB Essentials - 4.8 ⭐</li>
                        <li>JavaScript Mastery - 4.8 ⭐</li>
                    </ol>
                </div>
            </div>

            {/* Admin Panel Functionalities */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <PanelCard title="Quick Actions" icon={<Bolt />} items={["Add Course", "Approve Instructor", "Send Notification"]} />
                <PanelCard title="System Tools" icon={<Build />} items={["Backup DB", "Server Logs", "Error Reports"]} />
                <PanelCard title="User Roles" icon={<ManageAccounts />} items={["Admin - 3", "Instructor - 45", "Student - 3000"]} />
                <PanelCard title="Activity Logs" icon={<AdminPanelSettings />} items={["John edited a course", "Maria approved an instructor", "Backup completed"]} />
                <PanelCard title="Settings" icon={<Settings />} items={["Update Theme", "Reset Passwords", "Access Control"]} />
            </div>
        </div>
    );
};

// Reusable Panel Card
const PanelCard = ({ title , icon, items } : { title: string , icon : any, items : any }) => (
    <div className="card bg-white dark:bg-gray-800 shadow-lg p-5">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            {icon} {title}
        </h2>
        <ul className="list-disc ml-5 text-sm space-y-1">
            {items.map((item : any , i : number) => (
                <li key={i}>{item}</li>
            ))}
        </ul>
    </div>
);

export default AdminDashboardPage;
