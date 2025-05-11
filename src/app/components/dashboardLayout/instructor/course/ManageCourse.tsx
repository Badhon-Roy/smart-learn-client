/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Add } from "@mui/icons-material";
import { toast } from "sonner";
import { deleteCourse } from "@/services/course";
import { useRouter } from "next/navigation";

interface Course {
  _id: string;
  title: string;
  thumbnail: string;
  price: number;
  status: "Ongoing" | "Upcoming" | "Completed";
}

const columns = [
  { id: "thumbnail", label: "Thumbnail", minWidth: 100 },
  { id: "title", label: "Title", minWidth: 170 },
  { id: "price", label: "Price", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 120 },
  { id: "action", label: "Action", minWidth: 120 },
];

const ManageCourse = ({ courses }: { courses: Course[] }) => {
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

  const handleEdit = (id: string) => {
    router.push(`/dashboard/instructor/update-course/${id}`)
  };

  const handleDelete = async (id: string) => {
    const toastLoading = toast.loading("Deleting...")
    try {
      const res = await deleteCourse(id)
      if (res.success) {
        toast.success(res.message, { id: toastLoading })
      } else if (res.err) {
        toast.error(res?.message || "Something went wrong!", { id: toastLoading })
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastLoading })
    }
  };

  return (
    <div className="container mx-auto p-4 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Manage Courses
        </h2>
        <Link href="/dashboard/instructor/create-course">
          <button className="bg-[#ffb500] text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform">
            <Add /> Create New Course
          </button>
        </Link>
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
                        backgroundColor: "#ffb500",
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
                {courses
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
                        {course.price}৳
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
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEdit(course?._id)}
                            className="bg-blue-500/30 hover:bg-blue-500/50 text-blue-300 p-2 rounded-full transition cursor-pointer"
                          >
                            <EditNoteIcon fontSize="small" />
                          </button>
                          <button
                            onClick={() => handleDelete(course?._id)}
                            className="bg-red-500/30 hover:bg-red-500/50 text-red-300 p-2 rounded-full transition cursor-pointer"
                          >
                            <DeleteForeverIcon fontSize="small" />
                          </button>
                        </div>
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
            count={courses.length}
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

export default ManageCourse;
