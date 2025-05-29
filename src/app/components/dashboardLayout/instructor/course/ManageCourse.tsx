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
import { deleteCourse, updateCourseStatus } from "@/services/course";
import { useRouter } from "next/navigation";
import { Divider, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { ICourse } from "@/types";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


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
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openDropdown = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

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


  const handleStatusChange = async (status:  "Ongoing" | "Upcoming" | "Completed") => {
    const toastLoading = toast.loading("Changing...")
    try {
      const res = await updateCourseStatus(selectedCourseId as string, status)
      if (res.success) {
        toast.success(res.message, { id: toastLoading })
      } else if (res.err) {
        toast.error(res?.message || "Something went wrong!", { id: toastLoading })
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastLoading })
    }
  }

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
                        <button
                          onClick={(event) => {
                            handleClick(event);
                            setSelectedCourseId(course?._id);
                          }}
                          className={`px-3 py-1 rounded-full text-sm font-bold shadow-md ${course.status === "Ongoing"
                            ? "bg-green-500/20 text-green-300"
                            : course.status === "Upcoming"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-blue-500/20 text-blue-300"
                            }`}
                        >
                          {course.status}
                        </button>

                        <Menu
                          anchorEl={anchorEl}
                          open={openDropdown}
                          onClose={handleDropdownClose}
                          onClick={handleDropdownClose}
                          PaperProps={{
                            elevation: 4,
                            sx: {
                              mt: 1.5,
                              minWidth: 200,
                              borderRadius: 2,
                              overflow: 'visible',
                              color: '#fff',
                              backgroundColor: '#0e1523',
                              boxShadow: '0px 10px 25px rgba(0,0,0,0.4)',
                              '& .MuiMenuItem-root': {
                                paddingY: 1.2,
                                fontSize: '0.95rem',
                                fontWeight: 500,
                                transition: 'all 0.2s ease-in-out',
                                borderRadius: 1,
                                '&:hover': {
                                  backgroundColor: '#1a2235',
                                  color: '#00ffff',
                                  textShadow: '0 0 5px #00ffff',
                                },
                              },
                            },
                          }}
                        >
                          <Typography className="px-4 pt-3 pb-1 text-gray-300 text-sm font-medium">
                            Select Status
                          </Typography>
                          <Divider sx={{ borderColor: '#1f2937' }} />

                          <MenuItem onClick={() => handleStatusChange('Ongoing')}>
                            <ListItemIcon sx={{ color: '#00ffff', minWidth: '36px' }}>
                              <HourglassTopIcon fontSize="small" />
                            </ListItemIcon>
                            Ongoing
                          </MenuItem>

                          <MenuItem onClick={() => handleStatusChange('Upcoming')}>
                            <ListItemIcon sx={{ color: '#00ffff', minWidth: '36px' }}>
                              <AccessTimeIcon fontSize="small" />
                            </ListItemIcon>
                            Upcoming
                          </MenuItem>

                          <MenuItem onClick={() => handleStatusChange('Completed')}>
                            <ListItemIcon sx={{ color: '#00ffff', minWidth: '36px' }}>
                              <CheckCircleIcon fontSize="small" />
                            </ListItemIcon>
                            Completed
                          </MenuItem>

                        </Menu>


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
