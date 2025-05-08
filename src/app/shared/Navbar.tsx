"use client";

import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { useState } from 'react';
import { logout } from '@/services/auth';

const Navbar = () => {
    const pathname = usePathname();
    const { user, setIsLoading } = useUser();

    const menus = [
        { title: 'Home', href: '/' },
        { title: 'Courses', href: '/courses' },
        { title: 'Online Batch', href: '/online-batch' },
        { title: 'English Center', href: '/english-center' },
    ];

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
        <section className='bg-white shadow-md'>
            <nav className="container mx-auto flex items-center justify-between px-6 py-3">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <h2 className='text-lg font-bold text-red-500'>
                        <span className='text-3xl'>Smart</span>Learn
                    </h2>
                </div>

                {/* Search bar */}
                <div className="flex-1 max-w-xl mx-4 relative">
                    <input
                        type="text"
                        placeholder="স্কিলস কোর্স, স্কুল প্রোগ্রাম সার্চ করুন..."
                        className="w-full pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#f87652]"
                    />
                </div>

                {/* Menus */}
                <div className="hidden lg:flex items-center gap-5 text-sm font-medium text-gray-700">
                    {menus.map((menu, i) => {
                        const isActive = pathname === menu.href;
                        return (
                            <Link key={i} href={menu.href} passHref>
                                <div className={`cursor-pointer hover:text-[#f87652] ${isActive ? 'text-[#f87652] underline underline-offset-4' : ''}`}>
                                    {menu.title}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Auth Section */}
                <div>
                    {user ? (
                        <>
                            <IconButton onClick={handleClick}>
                                <Avatar alt={'User'} src={user?.photo || 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png'} />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 3,
                                    sx: {
                                        mt: 1.5,
                                        minWidth: 180,
                                    },
                                }}
                            >
                                <MenuItem component={Link} href={`/dashboard/${user?.role}`}>Dashboard</MenuItem>
                                <MenuItem component={Link} href="/profile">Profile</MenuItem>
                                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Link href='/login'>
                            <button className="px-4 py-1 bg-[#f87652] text-white rounded-full hover:bg-[#f7643c]">Login</button>
                        </Link>
                    )}
                </div>
            </nav>
        </section>
    );
};

export default Navbar;
