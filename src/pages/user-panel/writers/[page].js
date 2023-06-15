import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import {Button, Pagination, PaginationItem, Skeleton, styled} from "@mui/material";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import {Badge} from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";
import Nprogress from "nprogress";
import {DeleteForever,} from "@mui/icons-material";
import Link from "next/link";

const columns = [
    {id: 'id', label: '#', minWidth: 170},
    {id: 'name', label: 'نام', minWidth: 170, align: "left"},
    {id: 'mobile', label: 'موبایل', minWidth: 170, align: "left"},
];


export default function Companies() {
    const rows = []
    const router = useRouter()
    const [DATA, setDATA] = useState({})
    const [getData, setGeData] = useState(false)
    const [page, setPage] = useState("");
    const [pageCount, setPageCount] = useState("");
    const dataFetch = async () => {
        const res = await fetch(`${process.env.LOCAL_URL}/api/user-panel/writers/${router.query.page}/${localStorage.getItem("selectedCompany")}`)
        const data = await res.json()
        await setDATA(data)
        await setPage(data.data.current_page)
        await setPageCount(data.data.last_page)
    }
    useEffect(() => {
        dataFetch()
    }, [getData])

    function createData(id, name, mobile, type) {
        return {id, name, mobile, type};
    }

    if (DATA.status) {
        DATA.data.data.map(item => rows.push(createData(`${item.id}`, `${item.firstname} ${item.lastname}`, `${item.user.mobile}`,`${item.pivot.type}`)))
    }

    const deleteHandler = async (id) => {
        Swal.fire({
            text: "آیا از حذف آیتم مورد نظر اطمینان دارید؟",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "خیر",
            confirmButtonColor: 'red',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.isConfirmed) {
                Nprogress.start()
                try {
                    fetch(`${process.env.LOCAL_URL}/api/user-panel/writers/delete/${id}/${localStorage.getItem("selectedCompany")}`, {
                        method: "DELETE"
                    }).then(res => res.json()).then(data => {
                        if (data.status) {
                            Nprogress.done()
                            Swal.fire(
                                '',
                                "حذف با موفقیت انجام شد !",
                                'success'
                            )
                            setGeData(!getData)
                        } else {
                            Nprogress.done()
                            Swal.fire(
                                '',
                                "مشکلی وجود دارد دوباره تلاش کنید",
                                'success'
                            )
                        }
                    })
                } catch {
                    Nprogress.done()
                    Swal.fire(
                        '',
                        "مشکلی در سرور وجود دارد دوباره تلاش کنید",
                        'success'
                    )
                }
            }
        })
    }


    const clickHandler = async (event, value) => {
        await router.push(`/user-panel/writers/${value}`)
        await setGeData(!getData)
    }

    // head row style ---------
    const StyledTableRow = styled(TableRow)(({theme}) => ({
        // hide last border
        '&:last-child td, &:last-child th': {
            // border: 0,
            // backgroundColor: "#f9f9f9",

        },
    }));
    // end head row style-----------
    if (DATA.status) {
        return (
            <div className={"px-md-4"}>
                <div className="d-flex flex-row align-items-center mt-2 mt-md-0">
                    <div className="panel-title-parent w-100">
                        <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                            نویسنده های شرکت
                        </h5>
                    </div>
                    <div className={"col-5 col-sm-4 col-md-3 col-lg-2"}>
                        <div className={"d-flex flex-row justify-content-center"}>
                            <Link href={"/user-panel/writers/add"}>
                                <Button variant={"contained"} className={"bg-my-purple"}>افزودن نویسنده</Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Paper className={"pb-3 shadow-sm mt-3"}
                       sx={{width: '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{maxHeight: 600}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <StyledTableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                    <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                        وضعیت
                                    </TableCell>
                                    <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                        گزینه ها
                                    </TableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}
                                                               className={"fw-bold"}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                                {
                                                    row.type === "full" ?
                                                        <Badge bg={"success"} className={"px-3 py-2"}>
                                                            دسترسی کامل
                                                        </Badge>
                                                        :
                                                        <Badge bg={"warning"} className={"px-3 py-2"}>
                                                            غیر فعال
                                                        </Badge>
                                                }
                                            </TableCell>
                                            <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                                <Tooltip title={"حذف نویسنده"}>
                                                    <IconButton color={"error"}
                                                                onClick={() => deleteHandler(row.id)}
                                                    >
                                                        <DeleteForever></DeleteForever>
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    )
                                        ;
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className={"d-flex flex-row justify-content-center mt-5"}>
                        <Pagination
                            count={pageCount}
                            onChange={(event, value) => clickHandler(event, value)}
                            size="large"
                            defaultPage={page}
                            renderItem={(item) => (
                                <PaginationItem
                                    {...item}
                                />
                            )}
                        />
                    </div>
                </Paper>
            </div>
        )
    } else return (
        <div className={"px-md-4"}>
            <div className="d-flex flex-row align-items-center mt-2 mt-md-0">
                <div className="panel-title-parent w-100">
                    <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                        گواهینامه ها
                    </h5>
                </div>
                <div className={"col-5 col-sm-4 col-md-3 col-lg-2"}>
                    <div className={"d-flex flex-row justify-content-center"}>
                        <Link href={"/user-panel/certificates/add"}>
                            <Button variant={"contained"} className={"bg-my-purple"}>افزودن گواهینامه</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Paper className={"pb-3 rounded-4 shadow-sm mt-2"}
                   sx={{width: '100%', overflow: 'hidden'}}>
                <TableContainer sx={{maxHeight: 600}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <StyledTableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    وضعیت
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    گزینه ها
                                </TableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow hover role="checkbox" tabIndex={-1}>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                            </TableRow>
                            <TableRow hover role="checkbox" tabIndex={-1}>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                            </TableRow>
                            <TableRow hover role="checkbox" tabIndex={-1}>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    <Skeleton animation={"wave"} width={100} height={20}></Skeleton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}


