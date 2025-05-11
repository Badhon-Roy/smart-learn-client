"use client";

import Image from "next/image";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from "sonner";
import { updateCourseApproval } from "@/services/course";

interface Course {
  _id: string;
  title: string;
  thumbnail: string;
  price: number;
  status: "Ongoing" | "Upcoming" | "Completed";
  isApproved: boolean;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#0e1523',
  color: 'white',
  borderRadius: '10px',
  border: '1px solid gray',
  boxShadow: 4,
  p: 4,
};

const columns = [
  { id: "thumbnail", label: "Thumbnail", minWidth: 100 },
  { id: "title", label: "Title", minWidth: 170 },
  { id: "price", label: "Price", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 120 },
  { id: "isApproved", label: "Approve", minWidth: 120 },
];

const CourseApproval = ({ courses }: { courses: Course[] }) => {
  const [openApprovalModal, setOpenApprovalModal] = useState(false);
  const [openApprovalCancelModal, setOpenApprovalCancelModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleModalClose = () => {
    setOpenApprovalModal(false);
    setSelectedCourse(null);
  };

  const handleApprovalCancelModalClose = () => {
    setOpenApprovalCancelModal(false);
    setSelectedCourse(null);
  };

  const handleApprove = async () => {
    if (!selectedCourse) return;
    const toastLoading = toast.loading("Approving...");
    const modifiedData = { isApproved: true };

    try {
      const res = await updateCourseApproval(selectedCourse._id, modifiedData);
      if (res.success) {
        toast.success(res.message, { id: toastLoading });
        handleModalClose();
      } else {
        toast.error(res.message || "Something went wrong!", { id: toastLoading });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastLoading });
    }
  };

  const handleApproveCancel = async () => {
    if (!selectedCourse) return;
    const toastLoading = toast.loading("Canceling approval...");
    const modifiedData = { isApproved: false };

    try {
      const res = await updateCourseApproval(selectedCourse._id, modifiedData);
      if (res.success) {
        toast.success('Approval canceled', { id: toastLoading });
        handleApprovalCancelModalClose();
      } else {
        toast.error(res.message || "Something went wrong!", { id: toastLoading });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastLoading });
    }
  };

  return (
    <div className="container mx-auto p-4 w-full">
      <h2 className="text-2xl sm:text-3xl font-bold text-white">All Courses</h2>

      <div className="rounded-xl shadow-2xl backdrop-blur-lg bg-white/10 border border-white/20 mt-4">
        <div className="w-full overflow-x-auto">
          <TableContainer>
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
                      <TableCell >
                        <span className="font-medium text-white">{course.title}</span>
                      </TableCell>
                      <TableCell >
                       <span className="font-semibold text-[#ffb500]"> {course.price}৳</span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold shadow-md ${
                            course.status === "Ongoing"
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
                        {course.isApproved ? (
                          <>
                            <button
                              onClick={() => {
                                setSelectedCourse(course);
                                setOpenApprovalCancelModal(true);
                              }}
                              className="border border-green-500 rounded-lg bg-[#0e1523] text-green-500 px-4 py-2 text-sm font-semibold"
                            >
                              <CheckOutlinedIcon className="text-green-500" /> Approved
                            </button>

                            <Modal
                              open={openApprovalCancelModal}
                              onClose={handleApprovalCancelModalClose}
                              hideBackdrop
                              sx={{
                                backdropFilter: 'blur(3px)',
                                backgroundColor: 'rgba(0,0,0,0.1)',
                              }}
                            >
                              <Box sx={style}>
                                <Typography variant="h6" className="text-center underline">
                                  {selectedCourse?.title}
                                </Typography>
                                <Typography variant="h6" className="text-center">
                                  Are you sure you want to cancel approval?
                                </Typography>
                                <div className="flex justify-between mt-6">
                                  <button
                                    onClick={handleApprovalCancelModalClose}
                                    className="px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={handleApproveCancel}
                                    className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                  >
                                    Cancel Approval
                                  </button>
                                </div>
                              </Box>
                            </Modal>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setSelectedCourse(course);
                                setOpenApprovalModal(true);
                              }}
                              className="border border-[#ffb500] rounded-lg bg-[#0e1523] text-[#ffb500] px-4 py-2 text-sm font-semibold"
                            >
                              <PendingActionsOutlinedIcon className="text-[#ffb500]" /> Pending Approval
                            </button>

                            <Modal
                              open={openApprovalModal}
                              onClose={handleModalClose}
                              hideBackdrop
                              sx={{
                                backdropFilter: 'blur(3px)',
                                backgroundColor: 'rgba(0,0,0,0.1)',
                              }}
                            >
                              <Box sx={style}>
                                <Typography variant="h6" className="text-center underline">
                                  {selectedCourse?.title}
                                </Typography>
                                <Typography variant="h6" className="text-center">
                                  Are you sure you want to approve this course?
                                </Typography>
                                <div className="flex justify-between mt-6">
                                  <button
                                    onClick={handleModalClose}
                                    className="px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={handleApprove}
                                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                                  >
                                    Approve
                                  </button>
                                </div>
                              </Box>
                            </Modal>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <TablePagination style={{color: 'white'}}
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={courses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default CourseApproval;
