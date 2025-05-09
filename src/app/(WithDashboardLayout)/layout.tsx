'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Menu as MenuIcon,
    Close as CloseIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import QuizIcon from '@mui/icons-material/Quiz';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ClassIcon from '@mui/icons-material/Class';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/context/UserContext';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { logout } from '@/services/auth';

const navItems = {
    student: [
      { label: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
      { label: 'Browse Courses', href: '/courses', icon: <ClassIcon /> },
      { label: 'My Courses', href: '/student/courses', icon: <PlayCircleIcon /> },
      { label: 'Assignments', href: '/student/assignments', icon: <AssignmentTurnedInIcon /> },
      { label: 'Quizzes', href: '/student/quizzes', icon: <QuizIcon /> },
      { label: 'Certificates', href: '/student/certificates', icon: <WorkspacePremiumIcon /> },
      { label: 'Progress', href: '/student/progress', icon: <SettingsIcon /> },
      { label: 'Home', href: '/', icon: <HomeIcon /> },
    ],
  
    instructor: [
      { label: 'Instructor Dashboard', href: '/dashboard/instructor', icon: <DashboardIcon /> },
      { label: 'Manage Course', href: '/dashboard/instructor/manage-course', icon: <UploadFileIcon /> },
      { label: 'Manage Content', href: '/dashboard/instructor/manage-content', icon: <UploadFileIcon /> },
      { label: 'Manage Quizzes', href: '/dashboard/instructor/manage-quizzes', icon: <QuizIcon /> },
      { label: 'Track Performance', href: '/dashboard/instructor/performance', icon: <PeopleIcon /> },
      { label: 'Issue Certificates', href: '/dashboard/instructor/certificates', icon: <WorkspacePremiumIcon /> },
      { label: 'Home', href: '/', icon: <HomeIcon /> },
    ],
  
    admin: [
      { label: 'Admin Dashboard', href: '/dashboard/admin', icon: <DashboardIcon /> },
      { label: 'User Management', href: '/dashboard/admin/users', icon: <PeopleIcon /> },
      { label: 'Course Approvals', href: '/dashboard/admin/courses', icon: <AssignmentTurnedInIcon /> },
      { label: 'Payment Management', href: '/dashboard/admin/payments', icon: <MonetizationOnIcon /> },
      { label: 'Site Settings', href: '/dashboard/admin/settings', icon: <SettingsIcon /> },
      { label: 'Admin Panel', href: '/dashboard/admin/control', icon: <AdminPanelSettingsIcon /> },
      { label: 'Home', href: '/', icon: <HomeIcon /> },
    ],
  };

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { user ,setIsLoading} = useUser();
    const role = user?.role;
    const currentNavItems = role && navItems[role];;
    const pathname = usePathname();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleNavClick = () => setDrawerOpen(false);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        logout();
        setIsLoading(true)
    }

    return (
        <div className="min-h-screen flex bg-[#0b0f1a] text-white relative overflow-hidden">
            {/* Desktop Sidebar */}
            <aside className="hidden px-6 py-6 md:flex w-72 flex-col bg-[#101929]/60 backdrop-blur-xl border-r border-white/10 shadow-lg">
                <div className=" text-3xl font-bold tracking-widest text-[#00ffff]">NeoDash</div>
                <h2 className='uppercase'><span className='text-[#00ffff]'>{user?.role}</span> Dashboard</h2>
                <nav className="flex flex-col gap-2 mt-8">
                    {currentNavItems?.map(({ label, href, icon }) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={label}
                                href={href}
                                className={`flex items-center gap-4 p-2 rounded-lg transition-all duration-300 group relative overflow-hidden ${isActive
                                    ? 'bg-[#00ffff20] text-[#00ffff] border-l-4 border-[#00ffff]'
                                    : 'hover:bg-white/10'
                                    }`}
                            >
                                <span className="text-lg">{icon}</span>
                                <span className="text-sm font-medium">{label}</span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="mt-auto py-6">
                    {user && (
                        <>
                            <IconButton onClick={handleClick}>
                                <Avatar alt={'User'} src={user?.photo || 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png'} />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                className='mb-[50px]'
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 3,
                                    sx: {
                                        ml:7,
                                        mb:8, 
                                        minWidth: 160,
                                    },
                                }}
                            >
                                <MenuItem component={Link} href="/profile">Profile</MenuItem>
                                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                            </Menu>
                        </>
                    )}
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 w-full z-50 px-4 py-3 bg-[#0e1422]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
                <div className="text-xl font-semibold text-[#00ffff]">NeoDash</div>
                <button onClick={() => setDrawerOpen(!drawerOpen)}>
                    {drawerOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
                </button>
            </header>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {drawerOpen && (
                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="md:hidden fixed top-[60px] left-0 h-[calc(100vh-60px)] w-64 z-40 bg-[#101929]/90 backdrop-blur-lg p-4 border-r border-white/10 flex flex-col"
                    >
                        {currentNavItems?.map(({ label, href, icon }) => {
                            const isActive = pathname === href;
                            return (
                                <Link
                                    key={label}
                                    href={href}
                                    onClick={handleNavClick}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${isActive
                                        ? 'bg-[#00ffff20] text-[#00ffff] border-l-4 border-[#00ffff]'
                                        : 'hover:bg-white/10'
                                        }`}
                                >
                                    {icon}
                                    {label}
                                </Link>
                            );
                        })}
                        <div className="mt-auto">
                            <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/40 transition mt-4">
                                <LogoutIcon />
                                <span>Logout</span>
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 pt-24 md:pt-8 transition-all duration-500 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
