import {Badge} from "@mui/material";
import {useContext, useEffect, useRef, useState} from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import GridViewIcon from '@mui/icons-material/GridView';
import Link from "next/link";
import MenuIcon from '@mui/icons-material/Menu';
import {useRouter} from "next/router";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ListAltIcon from '@mui/icons-material/ListAlt';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import SettingsIcon from '@mui/icons-material/Settings';
import authContext from "@/Contexts/AuthContext";
import AuthContext from "@/Contexts/AuthContext";

export default function UserPanelLayout({children}) {



    const [anchorEl, setAnchorEl] = useState();
    const open = Boolean(anchorEl);
    const [profileOpener, setProfileOpener] = useState();
    const opener = Boolean(profileOpener);
    const handleClick = (event) => {
        setAnchorEl(event.target);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const profileClickHandler = (event) => {
        setProfileOpener(event.target);
    };
    const profileClose = () => {
        setProfileOpener(null);
    };

    const toggleElement = useRef()
    const responsiveMenu = useRef()
    const menuClick = () => {
        toggleElement.current.classList.toggle("active");
        responsiveMenu.current.classList.toggle("active");
    }


    const router = useRouter()
    const routerPath = router.pathname
    useEffect(()=>{
        toggleElement.current.classList.remove("active");
        responsiveMenu.current.classList.remove("active");
    },[routerPath])

    const {userData,logOut} = useContext(AuthContext)
    console.log(userData)
    return (
        <main>
            <nav className="navbar navbar-expand bg-main-blue py-1 fixed-top">
                <div className="container-fluid">
                    <div className="d-flex flex-row align-items-center gap-3">
                        <div className="panel-menu-icon active d-flex flex-column justify-content-center rounded"
                             onClick={menuClick}
                             ref={toggleElement}>
                            <MenuIcon sx={{color: "var(--white)"}}></MenuIcon>
                        </div>
                        <span className="navbar-brand text-white">سازمان نیوز</span>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-4">
                        <div className="d-inline-block">
                            <div className="panel-switch-holder">
                                <div className="panel-switch-toggle">
                                    <input type="checkbox" id="dark-mode-switch"/>
                                    <label htmlFor="dark-mode-switch"></label>
                                </div>
                                <div className="panel-switch-holder-back"></div>
                            </div>
                        </div>
                        <Menu
                            anchorEl={profileOpener}
                            id="account-menu"
                            open={opener}
                            onClose={profileClose}
                            onClick={profileClickHandler}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 2,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                },
                            }}
                            transformOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        >
                            <MenuItem onClick={handleClose}>
                                <Avatar/> ورود به پنل کاربری
                            </MenuItem>
                            <Divider/>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Settings fontSize="small"/>
                                </ListItemIcon>
                                تنظیمات اکانت
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Logout fontSize="small"/>
                                </ListItemIcon>
                                خروج از حساب
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </nav>
            <div className="parent d-flex flex-row flex-wrap">
                <div className="panel-navigation-menu panel-w-sidebar panel-w-sidebar-sm" ref={responsiveMenu}>
                    <div className="panel-side-bar col-12 position-relative d-lg-flex">
                        <div className="panel-nav-item-parent col-12 d-flex flex-column ps-3 mt-5  pt-md-0 mt-md-0">
                            <div className="panel-menu-items-parent col-12">
                                <div className="service-section-opener d-flex flex-row">
                                    <div className="panel-title-parent w-100">
                                        <span
                                            className="panel-main-title- text-capitalize panel-header-title text-secondary">
                                           گزینه های دسترسی
                                        </span>
                                    </div>
                                    <span className="mt-1 ms-2">
                                   <i className="fa fa-angle-down text-secondary"></i>
                                </span>
                                </div>
                                <Link href={"/user-panel"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.length === 11 && "active"}`}>
                                        <GridViewIcon
                                            className={`${routerPath.length === 11 && "color-my-purple"}`}></GridViewIcon>
                                        <span className="text-secondary">داشبورد</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/monitoring"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("/monitoring") && "active"}`}>
                                        <GridViewIcon
                                            className={`${routerPath.includes("/monitoring") && "color-my-purple"}`}></GridViewIcon>
                                        <span className="text-secondary">مانیتورینگ</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/post-management"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("/post-management") && "active"}`}>
                                        <GridViewIcon
                                            className={`${routerPath.includes("/post-management") && "color-my-purple"}`}></GridViewIcon>
                                        <span className="text-secondary">مدیریت پست ها</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/ads"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("/ads") && "active"}`}>
                                        <GridViewIcon
                                            className={`${routerPath.includes("/ads") && "color-my-purple"}`}></GridViewIcon>
                                        <span className="text-secondary">تبلیغات شما</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/setting"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("/ads") && "active"}`}>
                                        <GridViewIcon
                                            className={`${routerPath.includes("/ads") && "color-my-purple"}`}></GridViewIcon>
                                        <span className="text-secondary">تنظیمات اکانت</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/setting"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("/ads") && "active"}`}>
                                        <GridViewIcon
                                            className={`${routerPath.includes("/ads") && "color-my-purple"}`}></GridViewIcon>
                                        <span className="text-secondary">پشتیبانی</span>
                                    </MenuItem>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-content panel-w-content">
                    <nav className="bg-white py-3 shadow-sm">
                        <div className="container">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <div>
                                    <Tooltip title="منوی کاربری">
                                        <IconButton aria-label="delete" size="small"
                                                    onClick={handleClick}
                                                    aria-controls={open ? 'account-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}>
                                            <Badge color="success" variant="dot">
                                                <Avatar></Avatar>
                                            </Badge>
                                        </IconButton>
                                    </Tooltip>
                                    <span className={"ms-2"}>
                                                {userData.userable.firstname} {userData.userable.lastname}
                                    </span>
                                </div>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="company-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            minWidth : "200px",
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 2,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 2,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                left: 10,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                >
                                    <Link href={"/user-panel/register"}>
                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <SettingsIcon fontSize="small"/>
                                            </ListItemIcon>
                                            تنظیمات اکانت
                                        </MenuItem>
                                    </Link>
                                    <Divider/>
                                    <MenuItem onClick={logOut}>
                                        <ListItemIcon>
                                            <Logout fontSize="small"/>
                                        </ListItemIcon>
                                        خروج از حساب
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </nav>
                    {children}
                </div>
            </div>
        </main>
    )
}