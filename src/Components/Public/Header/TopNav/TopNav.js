import styles from "../../../../styles/topNav.module.css"
import {Fragment, useContext, useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Image} from "react-bootstrap";
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import BedtimeRoundedIcon from '@mui/icons-material/BedtimeRounded';
import {Fab} from "@mui/material";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Link from "next/link";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import LoginIcon from '@mui/icons-material/Login';
import AuthContext from "@/Contexts/AuthContext";
export default function TopNav() {
    const [anchorEl, setAnchorEl] = useState();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.target);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const {userData,logOut,getUserData} = useContext(AuthContext)
    const [isLogin , setIsLogin] = useState(false)

    useEffect(()=>{
        getUserData()
        console.log(userData)
        userData.firstname.length ? setIsLogin(true) : setIsLogin(false)
    },[])

    return (
        <Fragment>
            <Navbar sticky={"top"} bg={"white"} className={`shadow-sm ${styles.dirSmLtr}`}>
                <Container fluid={true} className={"mx-md-5 mx-2"}>
                    <Navbar.Brand>
                        <Link href={"/"}>
                            <Image className={styles.mainLogo} src={"/img/main-paya360-logo.webp"}/>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                    <div className={"d-none d-md-flex justify-content-end gap-3"}>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', gap: "10px" }}>
                            <Fab size={"small"} className={"bg-white shadow-sm"}>
                                <BedtimeRoundedIcon color="action"/>
                            </Fab>
                            <Link href={"/search"}>
                                <Fab color="text" className={"bg-white shadow-sm"} size={"small"}>
                                    <SearchIcon color="action"/>
                                </Fab>
                            </Link>
                            {isLogin ?
                                <Fragment>
                                    <Tooltip title="منوی کاربری">
                                            <Fab color="text" className={"bg-white shadow-sm"} size={"small"}
                                                 onClick={handleClick}
                                                 aria-controls={open ? 'account-menu' : undefined}
                                                 aria-haspopup="true"
                                                 aria-expanded={open ? 'true' : undefined}>
                                                <PersonIcon color="action"/>
                                            </Fab>
                                    </Tooltip>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 2,
                                                '& .MuiAvatar-root': {
                                                    width: 42,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 60,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        {

                                               userData.companies ?
                                                   <Link href={"/user-panel"}>
                                                       <MenuItem onClick={handleClose}>
                                                           <ListItemIcon>
                                                               <LoginIcon/>
                                                           </ListItemIcon>
                                                           ورود به پنل کاربری
                                                       </MenuItem>
                                                       <Divider />
                                                   </Link>
                                                   :
                                                   <Link href={"/admin"}>
                                                       <MenuItem onClick={handleClose}>
                                                           <ListItemIcon>
                                                               <LoginIcon/>
                                                           </ListItemIcon>
                                                           ورود به پنل ادمین
                                                       </MenuItem>
                                                       <Divider />
                                                   </Link>

                                        }
                                        <Link href={"/my-news"}>
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <WysiwygIcon color={"primary"} />
                                                </ListItemIcon>
                                                اخبار من
                                            </MenuItem>
                                            <Divider />
                                        </Link>
                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <Settings color={"info"} fontSize="small" />
                                            </ListItemIcon>
                                            تنظیمات اکانت
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem onClick={()=>{
                                            logOut()
                                            setIsLogin(!isLogin)
                                        }
                                        }>
                                            <ListItemIcon>
                                                <Logout color={"error"} fontSize="small" />
                                            </ListItemIcon>
                                            خروج از حساب
                                        </MenuItem>
                                    </Menu>
                                </Fragment>
                                :
                                <Link href={"/login"}>
                                    <Fab color="text" className={"bg-white shadow-sm"} size={"small"}>
                                        <PersonIcon color="action"/>
                                    </Fab>
                                </Link>
                            }
                        </Box>
                    </div>
                </Container>
            </Navbar>
        </Fragment>
    )
}

