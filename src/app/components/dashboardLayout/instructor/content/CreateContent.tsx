/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Add } from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AddContent } from "@/services/course";
import { toast } from "sonner";

interface Lesson {
  title: string;
  videoUrl: string;
  duration: string;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  color: 'white',
  borderRadius: '10px',
  border: '1px solid gray',
  boxShadow: 24,
  p: 4,
};

interface Course {
  _id: string;
  lessons: Lesson[];
}

const columns = [
  { id: "title", label: "Title", minWidth: 100 },
  { id: "videoUrl", label: "Video Url", minWidth: 170 },
  { id: "duration", label: "Duration", minWidth: 100 }
];

const CreateContent = ({ course }: { course: Course }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const form = useForm<Lesson>();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = form;


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastLoading = toast.loading("Adding...")
    try {
        const res = await AddContent(course?._id ,data)
        console.log(res);
        if (res.success) {
            toast.success(res.message, { id: toastLoading })
            handleClose();
        } else if (res.err) {
            toast.error(res?.message || "Something went wrong!", { id: toastLoading })
        }
    } catch (error: any) {
        toast.error(error.message, { id: toastLoading })
    }
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto p-4 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Manage Content
        </h2>
        <button onClick={handleOpen} className="bg-[#ffb500] cursor-pointer text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform">
          <Add /> Add New Lesson
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  {...register("title", {
                    required: "Title is required",
                  })}
                  className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter lesson title"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Video URL</label>
                <input
                  type="text"
                  {...register("videoUrl", {
                    required: "Video Url is required",
                  })}
                  className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter lesson video url"
                />
                {errors.videoUrl && (
                  <p className="text-red-400 text-sm mt-1">{errors.videoUrl.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration</label>
                <input
                  type="text"
                  {...register("duration", {
                    required: "Duration is required",
                  })}
                  className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter video duration in minutes"
                />
                {errors.duration && (
                  <p className="text-red-400 text-sm mt-1">{errors.duration.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-2 cursor-pointer rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 transition duration-300 text-white font-semibold shadow-lg"
              >
                Add
              </button>
            </form>

          </Box>
        </Modal>
      </div>

      <div className="rounded-xl shadow-2xl backdrop-blur-lg bg-white/10 border border-white/20">
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
                        borderBottom: "1px solid rgba(255,255,255,0.2)"
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell
                    style={{
                      backgroundColor: "#ffb500",
                      color: "black",
                      fontWeight: 700,
                      fontSize: "16px"
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {course?.lessons
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((lesson, index) => (
                    <TableRow
                      key={index}
                      hover
                      className="hover:bg-white/20 transition text-white"
                    >
                      <TableCell style={{ color: "white" }}>
                        {lesson.title}
                      </TableCell>
                      <TableCell style={{ color: "white" }}>
                        {lesson.videoUrl}
                      </TableCell>
                      <TableCell style={{ color: "white" }}>
                        {lesson.duration} min
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-3">
                          <button className="bg-blue-500/30 hover:bg-blue-500/50 text-blue-300 p-2 rounded-full transition cursor-pointer">
                            <EditNoteIcon fontSize="small" />
                          </button>
                          <button className="bg-red-500/30 hover:bg-red-500/50 text-red-300 p-2 rounded-full transition cursor-pointer">
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
            count={course.lessons.length}
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

export default CreateContent;
