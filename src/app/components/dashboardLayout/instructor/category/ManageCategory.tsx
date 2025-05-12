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
import { useRouter } from "next/navigation";
import { Box, Modal, Typography } from "@mui/material";
import { deleteCategory } from "@/services/category";

interface Category {
    _id: string;
    name: string;
    description: string;
    image: string;
}

const columns = [
    { id: "image", label: "Image", minWidth: 100 },
    { id: "name", label: "Name", minWidth: 170 },
    { id: "action", label: "Action", minWidth: 170 },
];


const style = {
    position: 'absolute',
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

const ManageCategory = ({ categories }: { categories: Category[] }) => {
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
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
        router.push(`/dashboard/instructor/update-category/${id}`)
    };

    const handleModalClose = () => {
        setOpen(false);
        setSelectedCategory(null);
    };

    const handleDelete = async () => {
        if (!selectedCategory) return;
        const toastLoading = toast.loading("Deleting...")
        try {
            const res = await deleteCategory(selectedCategory?._id)
            console.log(res);
            if (res.success) {
                toast.success(res.message, { id: toastLoading })
                handleClose();
                setOpen(false);
                setSelectedCategory(null);
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
                    Manage Category
                </h2>
                <Link href="/dashboard/instructor/create-category">
                    <button className="bg-[#ffb500] text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform">
                        <Add /> Create New Category
                    </button>
                </Link>
            </div>

            <div className="rounded-xl shadow-2xl backdrop-blur-lg bg-white/10 border border-white/20">
                {/* Responsive Scroll Wrapper */}
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
                                {categories
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((category) => (
                                        <TableRow
                                            key={category._id}
                                            hover
                                            className="hover:bg-white/20 transition text-white"
                                        >
                                            <TableCell>
                                                {category.image ? (
                                                    <Image
                                                        src={category?.image}
                                                        alt={category?.name}
                                                        width={40}
                                                        height={40}
                                                        className="rounded-lg object-cover shadow-md"
                                                    />
                                                ) : (
                                                    <div className="w-20 h-[50px] bg-gray-700 rounded flex items-center justify-center text-white text-xs">
                                                        No Image
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="font-medium" style={{ color: "white" }}>
                                                {category?.name}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => handleEdit(category?._id)}
                                                        className="bg-blue-500/30 hover:bg-blue-500/50 text-blue-300 p-2 rounded-full transition cursor-pointer"
                                                    >
                                                        <EditNoteIcon fontSize="small" />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedCategory(category);
                                                            setOpen(true);
                                                        }}
                                                        className="bg-red-500/30 hover:bg-red-500/50 text-red-300 p-2 rounded-full transition cursor-pointer"
                                                    >
                                                        <DeleteForeverIcon fontSize="small" />
                                                    </button>
                                                    <Modal
                                                        open={open}
                                                        onClose={handleClose}
                                                        aria-labelledby="modal-modal-title"
                                                        aria-describedby="modal-modal-description"
                                                        hideBackdrop
                                                        sx={{
                                                            backdropFilter: 'blur(3px)',
                                                            backgroundColor: 'rgba(0,0,0,0.1)',
                                                        }}
                                                    >
                                                        <Box sx={style}>
                                                            <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center">
                                                                Are you sure you want to delete this category?
                                                            </Typography>
                                                            <Typography id="modal-modal-description" sx={{ mt: 1 }} className="text-center">
                                                                This action cannot be undone.
                                                            </Typography>

                                                            <div className="flex justify-between items-center gap-4 mt-6">
                                                                <button
                                                                    onClick={handleModalClose}
                                                                    className="px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400 cursor-pointer"
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <button
                                                                    onClick={handleDelete}
                                                                    className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                                                                >
                                                                    ⚠️ Delete
                                                                </button>
                                                            </div>
                                                        </Box>
                                                    </Modal>
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
                        count={categories.length}
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

export default ManageCategory;
