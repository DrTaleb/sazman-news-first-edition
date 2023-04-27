import {Fragment, useContext, useEffect} from "react";
import $ from "jquery"
import MegaMenuItem from "./MegaMenuItem";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "@mui/icons-material/Search";
import BedtimeRoundedIcon from "@mui/icons-material/BedtimeRounded";
import SideBarItem from "./SideBarItem";
import PersonIcon from "@mui/icons-material/Person";
import {Fab} from "@mui/material";
import MenuContext from "@/Contexts/MenuContext";


function megaMenuHandler() {
    const megaItems = document.querySelectorAll(".mega-parent > a").length
    for (let i = 1; i <= megaItems;) {
        let megaOpenerId = "mega" + i, megaMenuId = "megaMenu" + i;
        $(".mega-menu-opener:nth-of-type(" + i + ")").attr({"id": megaOpenerId})
        $(".mega-menu:nth-of-type(" + i + ")").attr({"id": megaMenuId})
        i++
    }
    $(".mega-menu-opener").mouseenter(function () {
        $(".mega-menu").hide()
        let thisId = Number($(this).attr("id")[4])
        $(".mega-menu:nth-of-type(" + thisId + ")").fadeIn(100)
    })
    $(".parent").mouseenter(function () {
        $(".mega-menu").hide()
    })
    $(".my-nav").mouseenter(function () {
        $(".mega-menu").hide()
    })
    for (let i = 1; i <= megaItems;) {
        let isMegaHave = document.querySelectorAll(".mega-menu:nth-of-type(" + i + ") div.mega-menu-ul > a").length;
        if (isMegaHave === 0) {
            $(".mega-menu:nth-of-type(" + i + ")").addClass("d-none")
        }
        i++
    }
}

export default function MegaMenu() {
    function smMenuHandler() {
        const element = document.getElementById("menuIcon")
        const navigationMenu = document.getElementById("navigationMenu")
        element.classList.toggle("active")
        navigationMenu.classList.toggle("active")
    }

    const contextData = useContext(MenuContext)
    const megaMenuItems = contextData.data.headers.sort(item => item.order)
    // const categoryItems = menu.categories.filter(item => item.parentID === 0)
    // const subCategoryItems = menu.categories.filter(item => item.parentID != 0)
    //
   useEffect(() => {
        $(".mega-menu").hide()
        megaMenuHandler()
    }, [megaMenuItems])


    return (
        <Fragment>
            {/*md menu*/}
            <nav
                className="d-none d-md-block mega-nav navbar position-relative shadow-sm navbar-expand navbar-light bg-white px-5">
                <div className="my-mega-menu collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="mega-parent navbar-nav gap-3">
                        {/*{categoryItems.map((item) => <MegaMenuItem key={item.ID} menuID={item.ID} menuTitle={item.title} type={"category"}*/}
                        {/*                                           menuLink={item.title}*/}
                        {/*                                           subMenus={subCategoryItems}></MegaMenuItem>)}*/}
                        {megaMenuItems.map((item) => <MegaMenuItem key={item.id} menuID={item.id} menuTitle={item.title} type={"menu"}
                                                                   menuLink={item.link}
                                                                   subMenus={item.children}></MegaMenuItem>)}
                    </div>
                </div>
            </nav>
            {/*end md menu*/}
            {/*sm menu*/}
            <div
                onClick={smMenuHandler} id={"menuIcon"}
                className="menu-icon d-md-none nav-item-style fixed-top- d-flex flex-column justify-content-center rounded">
                <MenuIcon className={"text-secondary"}></MenuIcon>
            </div>
            <nav className="navigation-menu col-lg-3 col-md-5 col-7 shadow d-md-none" id={"navigationMenu"}>
                <div className="col-12 layout has-sidebar fixed-sidebar fixed-header">
                    <aside id="sidebar" className="sidebar break-point-lg has-bg-image">
                        <div className="sidebar-layout">
                            <div className="sidebar-header">
                                <div className="d-flex flex-row px-2 justify-content-around">
                                    <div className="mb-lg-0 gap-3 gap-sm-1 d-flex flex-row ">
                                        <Fab size={"small"} className={"bg-white shadow-sm"}>
                                            <BedtimeRoundedIcon color="action"/>
                                        </Fab>
                                        <Fab color="text" className={"bg-white shadow-sm"} size={"small"}>
                                            <SearchIcon color="action"/>
                                        </Fab>
                                        <Fab color="text" className={"bg-white shadow-sm"} size={"small"}>
                                            <PersonIcon color="action"/>
                                        </Fab>
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar-content">
                                <nav className="menu open-current-submenu">
                                    <ul className="side-ul">
                                        {megaMenuItems.map((item) =>
                                            <SideBarItem key={item.id} menuID={item.id} menuTitle={item.title}
                                                         menuLink={item.link}
                                                         subMenus={item.children}></SideBarItem>
                                        )}
                                        {/*{categoryItems.map((item) =>*/}
                                        {/*    <SideBarItem key={item.ID} menuID={item.ID} menuTitle={item.title}*/}
                                        {/*                 menuLink={item.link}*/}
                                        {/*                 subMenus={subCategoryItems}></SideBarItem>*/}
                                        {/*)}*/}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </aside>
                </div>
            </nav>
            {/*end sm menu*/}
        </Fragment>
    )
}
