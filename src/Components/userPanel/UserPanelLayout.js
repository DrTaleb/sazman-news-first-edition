import {Badge, Button, Skeleton} from "@mui/material";
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
import MonitorIcon from '@mui/icons-material/Monitor';
import SettingsIcon from '@mui/icons-material/Settings';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CollectionsIcon from '@mui/icons-material/Collections';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AuthContext from "@/Contexts/AuthContext";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Check} from "@mui/icons-material";
import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
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


    const [anchorEl2, setAnchorEl2] = useState();
    const open2 = Boolean(anchorEl2);
    const [profileOpener2, setProfileOpener2] = useState();
    const opener2 = Boolean(profileOpener2);
    const handleClick2 = (event) => {
        setAnchorEl2(event.target);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };
    const profileClickHandler2 = (event) => {
        setProfileOpener2(event.target);
    };
    const profileClose2 = () => {
        setProfileOpener2(null);
    };

    const toggleElement = useRef()
    const responsiveMenu = useRef()
    const menuClick = () => {
        toggleElement.current.classList.toggle("active");
        responsiveMenu.current.classList.toggle("active");
    }


    const router = useRouter()
    const routerPath = router.pathname
    useEffect(() => {
        toggleElement.current.classList.remove("active");
        responsiveMenu.current.classList.remove("active");
    }, [routerPath])

    const {userData, logOut} = useContext(AuthContext)
    const [selectedCompany, setSelectedCompany] = useState("")
    useEffect(() => {
        userData.companies &&  setSelectedCompany(userData.companies.length && userData.companies.find(item => item.id == localStorage.getItem("selectedCompany")).title)

    }, [userData])
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
                                <Link href={"/user-panel/monitoring"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("/monitoring") && "active"}`}>
                                        <MonitorIcon
                                            className={`${routerPath.includes("/monitoring") && "color-my-purple"}`}></MonitorIcon>
                                        <span className="text-secondary">مانیتورینگ</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/user-panel/post-management/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("/post-management") && "active"}`}>
                                        <FormatListBulletedIcon
                                            className={`${routerPath.includes("/post-management") && "color-my-purple"}`}></FormatListBulletedIcon>
                                        <span className="text-secondary">مدیریت پست ها</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/user-panel/certifications"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("/certifications") && "active"}`}>
                                        <WorkspacePremiumIcon
                                            className={`${routerPath.includes("/certifications") && "color-my-purple"}`}></WorkspacePremiumIcon>
                                        <span className="text-secondary">گواهینامه ها</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/user-panel/gallery"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("/gallery") && "active"}`}>
                                        <CollectionsIcon
                                            className={`${routerPath.includes("/gallery") && "color-my-purple"}`}></CollectionsIcon>
                                        <span className="text-secondary">گالری عکس ها</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/user-panel/catalogs"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("/catalogs") && "active"}`}>
                                        <CollectionsBookmarkIcon
                                            className={`${routerPath.includes("/catalogs") && "color-my-purple"}`}></CollectionsBookmarkIcon>
                                        <span className="text-secondary">کاتالوگ ها</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/user-panel/ads"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("/ads") && "active"}`}>
                                        <AdsClickIcon
                                            className={`${routerPath.includes("/ads") && "color-my-purple"}`}></AdsClickIcon>
                                        <span className="text-secondary">تبلیغات شما</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/user-panel/setting"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("/setting") && "active"}`}>
                                        <SettingsIcon
                                            className={`${routerPath.includes("/setting") && "color-my-purple"}`}></SettingsIcon>
                                        <span className="text-secondary">تنظیمات شرکت</span>
                                    </MenuItem>
                                </Link>
                                <Link href={"/user-panel/support/1"}>
                                    <MenuItem
                                        className={`panel-side-bar-item rounded gap-4 ps-3 ${routerPath.includes("/support") && "active"}`}>
                                        <SupportAgentIcon
                                            className={`${routerPath.includes("/support") && "color-my-purple"}`}></SupportAgentIcon>
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
                                {
                                    userData.companies.length ?
                                        <>
                                            <div>
                                                <Tooltip title="تنظیمات اکانت شرکت">
                                                    <Button
                                                        aria-label="delete"
                                                        onClick={handleClick2}
                                                        aria-controls={open2 ? 'account-menu' : undefined}
                                                        aria-haspopup="true"
                                                        size={"large"}
                                                        aria-expanded={open2 ? 'true' : undefined}
                                                        className={"text-dark"}
                                                        endIcon={<ExpandMoreIcon/>}>
                                                        {selectedCompany.length ?
                                                            selectedCompany
                                                            : <Skeleton height={20} width={60}></Skeleton>
                                                        }
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                            <Menu
                                                anchorEl={anchorEl2}
                                                id="company-menu"
                                                open={open2}
                                                onClose={handleClose2}
                                                onClick={handleClose2}
                                                PaperProps={{
                                                    elevation: 0,
                                                    sx: {
                                                        minWidth: "200px",
                                                        overflow: 'visible',
                                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                        mt: 2,
                                                        '& .MuiAvatar-root': {
                                                            width: 52,
                                                            height: 32,
                                                            ml: -0.5,
                                                            mr: 2,
                                                        },

                                                    },
                                                }}
                                                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                            >
                                                {
                                                    userData.companies.map(item =>
                                                        <MenuItem key={item.id} onClick={handleClose}>
                                                            {
                                                                item.title === selectedCompany ?
                                                                    <ListItemIcon>
                                                                        <Check fontSize={"small"}/>
                                                                    </ListItemIcon>
                                                                    :
                                                                    <ListItemIcon>
                                                                        <CheckBoxOutlineBlankIcon fontSize={"small"}/>
                                                                    </ListItemIcon>
                                                            }
                                                            {item.title}
                                                        </MenuItem>
                                                    )
                                                }
                                            </Menu>
                                        </>
                                 :
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <AddTaskIcon className={"color-my-purple"} fontSize={"small"}/>
                                    </ListItemIcon>
                                    ثبت شرکت جدید
                                </MenuItem>
                                }
                                <div>
                                    <Tooltip title="منوی کاربری">
                                        <IconButton aria-label="delete" size="small"
                                                    className={"me-4"}
                                                    onClick={handleClick}
                                                    aria-controls={open ? 'account-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}>
                                            <Badge color="success" variant="dot">
                                                <Avatar></Avatar>
                                            </Badge>
                                        </IconButton>
                                    </Tooltip>
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
                                            minWidth: "200px",
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 3,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 2,
                                            },

                                        },
                                    }}
                                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <Avatar fontSize="small"/>
                                        </ListItemIcon>
                                        {userData.firstname} {userData.lastname}
                                    </MenuItem>
                                    <Divider/>
                                    <Link href={"/user-panel/register"}>
                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <SettingsIcon fontSize="small"/>
                                            </ListItemIcon>
                                            تنظیمات اکانت
                                        </MenuItem>
                                    </Link>
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
                    {
                        userData.companies &&
                        userData.companies.length ?
                            children
                            :
                            <div className={"d-flex flex-row justify-content-center"}>

                                <Col xs={11} sm={11} md={8} lg={6} xl={7} className={"content bg-white shadow-sm mt-3"}>
                                    <form>
                                        <div className={"d-flex flex-column align-items-center gap-3 py-5"}>
                                            <Button className={"col-5 mt-5"} variant={"contained"}
                                                    color={"success"}>افزودن</Button>
                                        </div>
                                    </form>
                                </Col>
                            </div>
                    }
                </div>
            </div>
        </main>
    )
}