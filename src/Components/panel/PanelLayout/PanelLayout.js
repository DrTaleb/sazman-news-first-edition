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

export default function PanelLayout({children}) {



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
                        <a className="navbar-brand text-white" href="#">اخبار رسمی</a>
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
                        {/*<Tooltip title="منوی کاربری">*/}
                        {/*    <IconButton*/}
                        {/*        onClick={handleClick}*/}
                        {/*        size="small"*/}
                        {/*        aria-controls={open ? 'account-menu' : undefined}*/}
                        {/*        aria-haspopup="true"*/}
                        {/*        aria-expanded={open ? 'true' : undefined}*/}
                        {/*    >*/}
                        {/*        <Fab color="text" className={"bg-white shadow-sm"} size={"small"}>*/}
                        {/*            <PersonIcon color="action"/>*/}
                        {/*        </Fab>*/}
                        {/*    </IconButton>*/}
                        {/*</Tooltip>*/}
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
                                <Link href={"/admin"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.length === 6 && "active"}`}>
                                        <GridViewIcon
                                            className={`${routerPath.length === 6 && "color-my-purple"}`}></GridViewIcon>
                                        <span className="text-secondary">داشبورد</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/admins"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("admins") && "active"}`}>
                                        <AdminPanelSettingsIcon
                                            className={`${routerPath.includes("admins") && "color-my-purple"}`}></AdminPanelSettingsIcon>
                                        <span className="text-secondary">لیست ادمین ها</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/sliders/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("sliders") && "active"}`}>
                                        <LinearScaleIcon
                                            className={`${routerPath.includes("sliders") && "color-my-purple"}`}
                                        ></LinearScaleIcon>
                                        <span className="text-secondary">اسلایدر ها</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/menus/header/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("menus/header") && "active"}`}>
                                        <MenuIcon
                                            className={`${routerPath.includes("menus/header") && "color-my-purple"}`}
                                        ></MenuIcon>
                                        <span className="text-secondary">منوی هدر</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/menus/footer/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("menus/footer") && "active"}`}>
                                        <MenuIcon
                                            className={`${routerPath.includes("menus/footer") && "color-my-purple"}`}
                                        ></MenuIcon>
                                        <span className="text-secondary">منوی فوتر</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/categories/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("categories") && "active"}`}>
                                        <ReceiptLongIcon
                                            className={`${routerPath.includes("categories") && "color-my-purple"}`}
                                        ></ReceiptLongIcon>
                                        <span className="text-secondary">دسته بندی ها</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/company-requests/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("company-requests") && "active"}`}>
                                        <AddTaskIcon
                                            className={`${routerPath.includes("company-requests") && "color-my-purple"}`}
                                        ></AddTaskIcon>
                                        <span className="text-secondary">درخواست های ثبت شرکت</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/companies/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("companies") && "active"}`}>
                                        <ListAltIcon
                                            className={`${routerPath.includes("companies") && "color-my-purple"}`}
                                        ></ListAltIcon>
                                        <span className="text-secondary">لیست شرکت ها</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/certifications/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item ripple-effect ripple-dark rounded gap-4 ps-3 ${routerPath.includes("certifications") && "active"}`}>
                                        <ListAltIcon
                                            className={`${routerPath.includes("certifications") && "color-my-purple"}`}
                                        ></ListAltIcon>
                                        <span className="text-secondary">لیست گواهینامه ها</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/writers/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("writers") && "active"}`}>
                                        <ListAltIcon
                                            className={`${routerPath.includes("writers") && "color-my-purple"}`}
                                        ></ListAltIcon>
                                        <span className="text-secondary">لیست نویسندگان</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/ads/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("ads") && "active"}`}>
                                        <ListAltIcon
                                            className={`${routerPath.includes("ads") && "color-my-purple"}`}
                                        ></ListAltIcon>
                                        <span className="text-secondary"> لیست تبلیغات فعال</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/ads-requests/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("ads-requests") && "active"}`}>
                                        <ListAltIcon
                                            className={`${routerPath.includes("ads-requests") && "color-my-purple"}`}
                                        ></ListAltIcon>
                                        <span className="text-secondary"> لیست درخواست تبلیغات</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/selected-posts"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("selected-posts") && "active"}`}>
                                        <WysiwygIcon
                                            className={`${routerPath.includes("selected-posts") && "color-my-purple"}`}
                                        ></WysiwygIcon>
                                        <span className="text-secondary">پست های منتخب</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/reports"}>
                                    <MenuItem
                                        className={`panel-side-bar-item ripple-effect ripple-dark rounded gap-4 ps-3 ${routerPath.includes("reports") && "active"}`}>
                                        <RemoveModeratorIcon
                                            className={`${routerPath.includes("reports") && "color-my-purple"}`}
                                        ></RemoveModeratorIcon>
                                        <span className="text-secondary">گزارشات تخلف</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/tickets"}>
                                    <MenuItem
                                        className={`panel-side-bar-item ripple-effect ripple-dark rounded gap-4 ps-3 ${routerPath.includes("tickets") && "active"}`}>
                                        <ConnectWithoutContactIcon
                                            className={`${routerPath.includes("tickets") && "color-my-purple"}`}
                                        ></ConnectWithoutContactIcon>
                                        <span className="text-secondary">تیکت ها</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/admin/setting"}>
                                    <MenuItem
                                        className={`panel-side-bar-item ripple-effect ripple-dark rounded gap-4 ps-3 ${routerPath.includes("setting") && "active"}`}>
                                        <SettingsIcon
                                            className={`${routerPath.includes("setting") && "color-my-purple"}`}
                                        ></SettingsIcon>
                                        <span className="text-secondary">تنظیمات اصلی</span>
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