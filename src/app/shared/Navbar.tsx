'use client';

import React, { useEffect, useState } from 'react';
import { Toolbar,IconButton,Drawer,List,ListItemButton,ListItemIcon, ListItemText, Box, Avatar, useTheme, useMediaQuery, Divider, Typography, Menu,MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import BookIcon from '@mui/icons-material/Book';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/assets/images/logo.png';
import { useUser } from '@/context/UserContext';
import { logout } from '@/services/auth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from 'sonner';
import { PersonOutline } from '@mui/icons-material';

const navLinks = [
    { title: 'Home', href: '/', icon: <HomeIcon /> },
    { title: 'Courses', href: '/courses', icon: <SchoolIcon /> },
    { title: 'About Us', href: '/about', icon: <PersonOutline /> },
    { title: 'Community', href: '/community', icon: <GroupsIcon /> }
];

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const pathname = usePathname();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { user, setUser, setIsLoading } = useUser();
    const open = Boolean(anchorEl);

    const isActive = (href: string) => pathname === href;
    const toggleDrawer = () => setDrawerOpen(!drawerOpen);


    useEffect(() => {
        if (!isMobile && drawerOpen) {
            setDrawerOpen(false);
        }
    }, [isMobile, drawerOpen]);

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await logout();
        toast.success("Logout Successfull");
        setUser(null);
        setIsLoading(true);
        handleMenuClose();
    };

    return (
        <>
            <div
                className="sticky top-0 z-50 border-b border-white/20"
                style={{
                    background: 'linear-gradient(90deg, #0f2027, #203a43, #2c5364)',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                }}
            >
                <Toolbar className="container mx-auto flex justify-between items-center py-3">
                    <Link href="/" passHref>
                        <Image src={Logo} alt="smart_learn_logo" width={90} height={90} />
                    </Link>

                    {!isMobile ? (
                        <Box sx={{ display: 'flex', gap: 3 }}>
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} passHref>
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            color: isActive(link.href) ? '#07a698' : '#ffffffcc',
                                            fontWeight: isActive(link.href) ? 700 : 500,
                                            px: 1,
                                            py: 0.5,
                                            cursor: 'pointer',
                                            letterSpacing: '0.5px',
                                            transition: 'all 0.3s ease',
                                            '&::after': {
                                                content: '""',
                                                position: 'absolute',
                                                bottom: -2,
                                                left: 0,
                                                width: isActive(link.href) ? '100%' : 0,
                                                height: '2px',
                                                backgroundColor: '#07a698',
                                                transition: 'width 0.3s ease',
                                            },
                                            '&:hover::after': {
                                                width: '100%',
                                            },
                                        }}
                                    >
                                        <span className='pr-1'>{link.icon}</span>{link.title}
                                    </Box>
                                </Link>
                            ))}
                            {user &&
                                <Link key={'/dashboard/student/my-courses'} href={'/dashboard/student/my-courses'} passHref>
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            color: isActive('/dashboard/student/my-courses') ? '#07a698' : '#ffffffcc',
                                            fontWeight: isActive('/dashboard/student/my-courses') ? 700 : 500,
                                            px: 1,
                                            py: 0.5,
                                            cursor: 'pointer',
                                            letterSpacing: '0.5px',
                                            transition: 'all 0.3s ease',
                                            '&::after': {
                                                content: '""',
                                                position: 'absolute',
                                                bottom: -2,
                                                left: 0,
                                                width: isActive('/dashboard/student/my-courses') ? '100%' : 0,
                                                height: '2px',
                                                backgroundColor: '#07a698',
                                                transition: 'width 0.3s ease',
                                            },
                                            '&:hover::after': {
                                                width: '100%',
                                            },
                                        }}
                                    >
                                        <span className='pr-1'><BookIcon /> </span>My Learning
                                    </Box>
                                </Link>}
                        </Box>
                    ) : (
                        <IconButton onClick={toggleDrawer}>
                            <MenuIcon sx={{ color: '#fff' }} />
                        </IconButton>
                    )}


                    {!isMobile && (
                        user ? (
                            <>
                                <IconButton onClick={handleAvatarClick}>
                                    <Avatar
                                        className='border-2 border-white/80'
                                        alt={user.name || 'User Avatar'}
                                        src={
                                            user.photo ||
                                            'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png'
                                        }
                                    />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 5,
                                        sx: {
                                            mt: 1.5,
                                            minWidth: 200,
                                            borderRadius: 2,
                                            backgroundColor: '#0e1523',
                                            color: 'white',
                                            backdropFilter: 'blur(10px)',
                                        },
                                    }}
                                >
                                    <MenuItem
                                        component={Link}
                                        href={`/dashboard/${user?.role}`}
                                        className="hover:bg-white/10"
                                    >
                                        <ListItemIcon>
                                            <DashboardIcon fontSize="small" sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        Dashboard
                                    </MenuItem>

                                    <MenuItem
                                        component={Link}
                                        href="/profile"
                                        className="hover:bg-white/10"
                                    >
                                        <ListItemIcon>
                                            <PersonIcon fontSize="small" sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        Profile
                                    </MenuItem>

                                    <Divider sx={{ borderColor: 'white', opacity: 0.1 }} />

                                    <MenuItem onClick={handleLogout} className="hover:bg-white/10">
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" sx={{ color: 'white' }} />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Link href="/login" passHref>
                                <Typography variant="h6" color="#fff" sx={{ cursor: 'pointer' }}>
                                    Login
                                </Typography>
                            </Link>
                        )
                    )}

                </Toolbar>
            </div>

            {/* Mobile Drawer */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer}
                PaperProps={{
                    sx: {
                        width: '100vw',
                        maxWidth: 320,
                        backgroundColor: '#0e1523',
                    },
                }}
            >
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    {user && <Avatar
                        className='border-2 border-white/80'
                        alt={user?.name || 'User Avatar'}
                        src={
                            user?.photo ||
                            'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png'
                        }
                    />}
                    <Typography variant="h6" color="#fff">Welcome</Typography>
                </Box>
                <Divider sx={{ bgcolor: '#374151', mb: 1 }} />

                <List>
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} passHref>
                            <ListItemButton
                                onClick={toggleDrawer}
                                sx={{
                                    color: isActive(link.href) ? '#07a698' : '#ffffffcc',
                                    fontWeight: isActive(link.href) ? 600 : 400,
                                    '&:hover': {
                                        backgroundColor: '#374151',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: '#07a698' }}>
                                    {link.icon}
                                </ListItemIcon>
                                <ListItemText primary={link.title} />
                            </ListItemButton>
                        </Link>
                    ))}

                    <Link key="dashboard" href={`/dashboard/${user?.role}`} passHref>
                        <ListItemButton
                            onClick={toggleDrawer}
                            sx={{
                                color: isActive(`/dashboard/${user?.role}`) ? '#07a698' : '#ffffffcc',
                                fontWeight: isActive(`/dashboard/${user?.role}`) ? 600 : 400,
                                '&:hover': {
                                    backgroundColor: '#374151',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: '#07a698' }}>
                                <DashboardIcon fontSize="small" sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </Link>
                    <Box
                        onClick={() => {
                            handleLogout();
                            toggleDrawer();
                        }}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 2,
                            py: 1,
                            cursor: 'pointer',
                            color: '#ffffffcc',
                            fontWeight: 500,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: '#374151',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 32, marginRight: '17px' }}>
                            <LogoutIcon fontSize="small" sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <Typography variant="body1" sx={{ color: '#ffffffcc' }}>
                            Logout
                        </Typography>
                    </Box>


                </List>
            </Drawer>
        </>
    );
};

export default Navbar;
