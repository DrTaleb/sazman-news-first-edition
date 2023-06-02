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
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import {Alert, Button, Pagination, PaginationItem, Skeleton} from "@mui/material";
import Swal from "sweetalert2";
import Link from "next/link";
import {useRouter} from "next/router";
import Nprogress from "nprogress";
import {Badge} from "react-bootstrap";

const columns = [
    {id: 'id', label: 'آیدی', minWidth: 170},
    {id: 'name', label: 'عنوان', minWidth: 170, align: "left"},
    {
        id: 'link', label: 'لینک', minWidth: 170, align: 'left',
    },
    {
        id: 'link_type', label: 'نوع لینک', minWidth: 170, align: 'left',
    },
    {
        id: 'start_at', label: 'تاریخ شروع', minWidth: 170, align: 'left',
    },
    {
        id: "end_at", label: 'تاریخ پایان', minWidth: 170, align: 'left',
    },
];


export default function Posts() {


    const router = useRouter()

    const [DATA, setDATA] = useState({status : false})

    const [page, setPage] = useState("");

    const [rowsPerPage, setRowsPerPage] = useState("");

    const [pageCount, setPageCount] = useState("");

    const [getData, setGetData] = useState(false)

    const dataFetch = async () => {
        const companyItem = localStorage.getItem('selectedCompany')
        if (companyItem != null) {
            const res = await fetch(`${process.env.LOCAL_URL}/api/user-panel/posts/${companyItem}/${router.query.page}`)
            const data = await res.json()
            await setDATA(data)
            await setPage(data.data.current_page)
            await setRowsPerPage(data.data.per_page)
            await setPageCount(data.data.last_page)
        } else setDATA({status: null})

    }


    function createData(id, name, status, link, link_type, start_at, end_at, options) {
        return {id, name, status, link, link_type, start_at, end_at, options};
    }

    const rows = [];

    useEffect(() => {
        dataFetch()
    }, [])

    if (DATA.status) {
        DATA.status && DATA.data.data.map(item => rows.push(createData(`${item.id}`, `${item.title}`, `${item.status == 1 ? "فعال" : "غیر فعال"}`, `${item.link}`, `${item.link_type == 1 ? "داخلی" : "خارجی"}`, `${item.start_at}`, `${item.end_at}`,)))
    }


    const viewHandler = (id) => {
        router.push(`/admin/sliders/view/${id}`)
    }
    const editHandler = (id) => {
        router.replace(`/admin/sliders/edit-slider/${id}`)
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
                    fetch(`${process.env.LOCAL_URL}/api/admin/sliders/delete/${id}`, {
                        method: "DELETE"
                    }).then(res => res.json()).then(data => {
                        if (data.status) {
                            setGetData(prev => !prev)
                            Nprogress.done()
                            Swal.fire(
                                '',
                                "حذف با موفقیت انجام شد !",
                                'success'
                            )
                            dataFetch()
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


    const clickHandler = (event, value) => {
        router.push(`/admin/sliders/${value}`)
        dataFetch()
    }


    if (DATA.status) {
        return (
            <div className={"px-md-4"}>
                <Paper className={"p-3 rounded-4"}
                       sx={{width: '100%', overflow: 'hidden', boxShadow: "0 0 .3rem rgba(0, 0, 0, .1)"}}>
                    <Link href={"/admin/sliders/add-slider"}>
                        <Button className={"ps-2"} variant={"contained"} color={"success"}>افزودن پست</Button>
                    </Link>
                    <TableContainer sx={{maxHeight: 600}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        وضعیت
                                    </TableCell>
                                    <TableCell>
                                        گزینه ها
                                    </TableCell>
                                </TableRow>
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
                                                    row.status === "فعال" ?
                                                        <Badge bg={"success"} className={"py-2 px-3"}>منتشر
                                                            شده</Badge> :
                                                        <Badge bg={"warning"}>در صف انتشار</Badge>
                                                }
                                            </TableCell>
                                            <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                                <IconButton color={"info"}
                                                            onClick={() => viewHandler(row.id)}
                                                ><RemoveRedEyeRoundedIcon/>
                                                </IconButton>
                                                <IconButton color={"warning"}
                                                            onClick={() => editHandler(row.id)}
                                                >
                                                    <ModeEditOutlineRoundedIcon></ModeEditOutlineRoundedIcon>
                                                </IconButton>
                                                <IconButton color={"error"}
                                                            onClick={() => deleteHandler(row.id)}
                                                >
                                                    <DeleteIcon></DeleteIcon>
                                                </IconButton>
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
        );
    } else if (DATA.status === false) {
        return (
            <div className={"px-md-4"}>
                <Paper className={"p-3"}
                       sx={{width: '100%', overflow: 'hidden', boxShadow: "0 0 1rem rgba(0, 0, 0, .1)"}}>
                    <Link href={"/admin/sliders/add-slider"}>
                        <Button className={"ps-2"} variant={"contained"} color={"success"}>افزودن پست</Button>
                    </Link>
                    <TableContainer sx={{maxHeight: 600}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        گزینه ها
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Skeleton animation={"wave"} variant="circular" height={30}
                                                  width={30}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Skeleton animation={"wave"} variant="circular" height={30}
                                                  width={30}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Skeleton animation={"wave"} variant="circular" height={30}
                                                  width={30}></Skeleton> </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Skeleton animation={"wave"} variant="circular" height={30}
                                                  width={30}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Skeleton animation={"wave"} variant="circular" height={30}
                                                  width={30}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Skeleton animation={"wave"} variant="circular" height={30}
                                                  width={30}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Skeleton animation={"wave"} variant="circular" height={30}
                                                  width={30}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Skeleton animation={"wave"} variant="circular" height={30}
                                                  width={30}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton animation={"wave"} height={30} width={100}></Skeleton>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        );
    } else if (DATA.status === null) {
        return (
            <div className={"px-md-4"}>
                <Paper className={"p-3"}
                       sx={{width: '100%', overflow: 'hidden', boxShadow: "0 0 1rem rgba(0, 0, 0, .1)"}}>
                    <Alert color={"error"}>
                        لطفا شرکت مورد نظر خود را از نوار بالا انتخاب کنید ...
                    </Alert>
                </Paper>
            </div>
        );
    }

}


