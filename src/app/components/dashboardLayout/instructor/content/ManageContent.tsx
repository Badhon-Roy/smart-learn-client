"use client"

import Image from "next/image";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
interface Course {
    _id: string;
    title: string;
    thumbnail: string;
    class: number;
    classLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}

const columns = [
    { id: "thumbnail", label: "Thumbnail", minWidth: 100 },
    { id: "title", label: "Title", minWidth: 170 },
    { id: "class", label: "Class", minWidth: 100 },
    { id: "classLevel", label: "Level", minWidth: 120 },
    { id: "action", label: "Action", minWidth: 120 },
];


const ManageContent = ({ ongoingCourses }: { ongoingCourses: Course[] }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const router = useRouter();
    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleAddContent = (id: string) => {
        router.push(`/dashboard/instructor/add-content/${id}`)
    }
    return (
        <div className="container mx-auto p-4 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Manage Content
                </h2>
            </div>

            <div className="rounded-xl shadow-2xl backdrop-blur-lg bg-white/10 border border-white/20">
                {/* Responsive Scroll Wrapper */}
                <div className="w-full overflow-x-auto">
                    <TableContainer sx={{ maxHeight: 600 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            style={{
                                                minWidth: column.minWidth,
                                                fontWeight: 700,
                                                fontSize: "16px",
                                                backgroundColor: "#07a698",
                                                color: "black",
                                                borderBottom: "1px solid rgba(255,255,255,0.2)",
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {ongoingCourses
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((course) => (
                                        <TableRow
                                            key={course._id}
                                            hover
                                            className="hover:bg-white/20 transition text-white"
                                        >
                                            <TableCell>
                                                {course.thumbnail ? (
                                                    <Image
                                                        src={course.thumbnail}
                                                        alt={course.title}
                                                        width={80}
                                                        height={50}
                                                        className="rounded-lg object-cover shadow-md"
                                                    />
                                                ) : (
                                                    <div className="w-20 h-[50px] bg-gray-700 rounded flex items-center justify-center text-white text-xs">
                                                        No Image
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="font-medium" style={{ color: "white" }}>
                                                {course?.title}
                                            </TableCell>
                                            <TableCell className="font-semibold " style={{ color: "#ffb500" }}>
                                                {course?.class}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-bold shadow-md ${course?.classLevel === "Beginner"
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : course.classLevel === "Intermediate"
                                                            ? "bg-amber-100 text-amber-700"
                                                            : "bg-indigo-100 text-indigo-700"
                                                        }`}
                                                >
                                                    {course.classLevel}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <button
                                                    onClick={()=>handleAddContent(course?._id)}
                                                    className="bg-[#07a69986] text-white/80 hover:text-white hover:bg-[#07a698] p-2 rounded-full transition cursor-pointer"
                                                >
                                                    <Add fontSize="small" /> Add Content
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div className="bg-white/10 backdrop-blur p-2">
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={ongoingCourses?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{ color: "#fff" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageContent;