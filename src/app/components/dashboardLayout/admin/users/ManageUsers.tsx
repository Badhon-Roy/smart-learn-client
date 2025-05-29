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
import { Delete } from "@mui/icons-material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from "sonner";
import { deleteUser, updateUserRole } from "@/services/auth";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

interface User {
    _id: string;
    photo: string;
    name: string;
    email: string;
    role: "student" | "instructor" | "admin";
    createdAt: string;
}

const columns = [
    { id: "user", label: "User", minWidth: 200 },
    { id: "email", label: "Email", minWidth: 180 },
    { id: "role", label: "Role", minWidth: 100 },
    { id: "join", label: "Join", minWidth: 100 },
    { id: "action", label: "Action", minWidth: 150 },
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


const ManageUsers = ({ users }: { users: User[] }) => {
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [roleFilter, setRoleFilter] = useState<"all" | "student" | "instructor" | "admin">("all");

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

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleModalClose = () => {
        setOpen(false);
        setSelectedUser(null);
    };

    const handleRoleUpdate = async (role: 'admin' | 'student' | 'instructor') => {
        const toastLoading = toast.loading("Updating...")
        try {
            const res = await updateUserRole(selectedUser?._id as string ,role)
            if (res.success) {
                toast.success(res.message, { id: toastLoading })
            } else if (res.err) {
                toast.error(res?.message || "Something went wrong!", { id: toastLoading })
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastLoading })
        }
    }

    const handleDelete = async () => {
        if (!selectedUser) return;
        const toastLoading = toast.loading("Deleting...")
        try {
            const res = await deleteUser(selectedUser?._id)
            console.log(res);
            if (res.success) {
                toast.success(res.message, { id: toastLoading })
                handleClose();
                setOpen(false);
                setSelectedUser(null);
            } else if (res.err) {
                toast.error(res?.message || "Something went wrong!", { id: toastLoading })
            }
        } catch (error: any) {
            toast.error(error.message, { id: toastLoading })
        }
    };

    const filteredUsers = roleFilter === "all"
        ? users
        : users.filter(user => user.role === roleFilter);



    return (
        <div className="container mx-auto px-4 py-6 w-full ">
            <div>
                <h2 className="text-3xl font-extrabold text-white mb-6 text-center sm:text-left">
                    👥 Manage Users
                </h2>
                <div className="flex justify-between items-center gap-8 mx-4">
                    <div className="flex gap-2 mb-4 justify-center sm:justify-start">
                        {["all", "student", "instructor", "admin"].map((role) => (
                            <button
                                key={role}
                                onClick={() => setRoleFilter(role as any)}
                                className={`px-4 py-1 cursor-pointer rounded-full border text-sm font-semibold transition
        ${roleFilter === role
                                        ? "bg-[#029bc0] text-white"
                                        : "bg-[#0e1523] text-white border-white/30 hover:bg-[#029bc0]"}
      `}
                            >
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div>
                        <h2 className="capitalize text-lg font-bold border border-white/30 bg-[#0e1523] rounded-full px-2 py-1">Total {roleFilter}: {filteredUsers?.length} Person</h2>
                    </div>
                </div>
            </div>


            <div className="rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden mt-4">
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
                                                backgroundColor: "#ffffff22",
                                                color: "#ffffff",
                                                borderBottom: "1px solid rgba(255,255,255,0.2)",
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {[...users]
                                    ?.filter((user) => roleFilter === "all" || user.role === roleFilter)
                                    ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    ?.map((user) => (
                                        <TableRow
                                            key={user?._id}
                                            hover
                                            className="hover:bg-white/10 transition text-white"
                                        >
                                            {/* User with photo and name */}
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {user?.photo ? <Image
                                                        src={user.photo}
                                                        alt={user.name}
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full border border-white/30"
                                                    /> : <Image
                                                        src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Images.png"
                                                        alt={user.name}
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full border border-white/30"
                                                    />}
                                                    <span className="font-semibold text-white">{user.name}</span>
                                                </div>
                                            </TableCell>

                                            {/* Email */}
                                            <TableCell >
                                                <span className=" font-medium text-[#00ffff]"> {user?.email}</span>
                                            </TableCell>

                                            {/* Role Badge */}
                                            <TableCell>
                                                <button
                                                    onClick={(event) => {
                                                        handleClick(event);
                                                        setSelectedUser(user);
                                                    }}
                                                    className={`px-3 py-1 rounded-full text-xs cursor-pointer font-semibold shadow-md
            ${user?.role === "admin"
                                                            ? "bg-red-100 text-red-600"
                                                            : user?.role === "instructor"
                                                                ? "bg-indigo-100 text-indigo-600"
                                                                : "bg-emerald-100 text-emerald-600"
                                                        }`}
                                                >
                                                    {user?.role}
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
                                                        Select Role
                                                    </Typography>
                                                    <Divider sx={{ borderColor: '#1f2937' }} />

                                                    <MenuItem onClick={() => handleRoleUpdate('student')}>
                                                        <ListItemIcon sx={{ color: '#00ffff', minWidth: '36px' }}>
                                                            <PersonIcon fontSize="small" />
                                                        </ListItemIcon>
                                                        Student
                                                    </MenuItem>

                                                    <MenuItem onClick={() => handleRoleUpdate('instructor')}>
                                                        <ListItemIcon sx={{ color: '#00ffff', minWidth: '36px' }}>
                                                            <SchoolIcon fontSize="small" />
                                                        </ListItemIcon>
                                                        Instructor
                                                    </MenuItem>

                                                    <MenuItem onClick={() => handleRoleUpdate('admin')}>
                                                        <ListItemIcon sx={{ color: '#00ffff', minWidth: '36px' }}>
                                                            <AdminPanelSettingsIcon fontSize="small" />
                                                        </ListItemIcon>
                                                        Admin
                                                    </MenuItem>
                                                </Menu>

                                            </TableCell>


                                            {/* Action */}
                                            <TableCell>
                                                <span className="text-yellow-500">  {formatDate(user?.createdAt)}</span>
                                            </TableCell>
                                            {/* Action */}
                                            <TableCell>
                                                <button
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setOpen(true);
                                                    }}
                                                    className="flex items-center gap-1 hover:text-red-500 cursor-pointer px-4 py-2 bg-gradient-to-r from-[#07a698] to-[#029bc0] text-white rounded-full hover:scale-105 transition transform text-sm font-semibold"
                                                >
                                                    <Delete fontSize="small" /> Delete
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
                                                            Are you sure you want to delete this user?
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
                                                                ⚠️ Sure
                                                            </button>
                                                        </div>
                                                    </Box>
                                                </Modal>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                {/* Pagination */}
                <div className="bg-white/10 backdrop-blur p-2">
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={users?.length}
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

export default ManageUsers;
