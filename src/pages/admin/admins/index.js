import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Link from "next/link";
import {useRouter} from "next/router";
import {Badge} from "react-bootstrap";
import {Button} from "@mui/material";

const columns = [
    {id: 'id', label: 'آیدی', minWidth: 170},
    {id: 'name', label: 'نام', minWidth: 170, align: "left"},
    {id: 'mobile', label: 'موبایل', minWidth: 170, align: 'left',},
    {id: 'status', label: 'وضعیت', minWidth: 170, align: 'left',},
];

export default function admins({data}) {

    console.log(data)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [DATA, setDATA] = useState(data.data.data)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [page, setPage] = useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [getData, setGetData] = useState(false)
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const dataFetch = async () => {
        await fetch(`http://localhost:3000/api/admin/admins`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => setDATA(data))
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // useEffect( ()=> {
    //      dataFetch()
    // },[getData])

    function createData(id, name, mobile, status, options) {
        return {id, name, mobile, status, options};
    }

    const rows = [];
    DATA.map(item => rows.push(createData(`${item.id}`, `${item.firstname} ${item.lastname}`, `${item.user.mobile}`, `${item.user.status === "1" ? "فعال" : "غیر فعال"}`),))


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target);
        setPage(0);
    };
    const deleteHandler = async (mobile) => {
        Swal.fire({
            text: "آیا از حذف آیتم مورد نظر اطمینان دارید؟",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "خیر",
            confirmButtonColor: 'var(--main-purple)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/api/admin/admins`, {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        mobile: mobile
                    })
                }).then(res => res.json()).then(data => {
                    if (data.massage.message === "this user now is not staff") {
                        Swal.fire({
                            text: "کارمند حذف شد",
                            icon: 'success',
                        })
                        setGetData(!getData)
                    } else {
                        Swal.fire({
                            text: "مشکلی در حذف پیش آمده",
                            icon: 'error',
                        })
                    }
                })

            }
        })
    }


    return (
        <div className={"px-4"}>
            <Paper className={"p-3"} sx={{width: '100%', overflow: 'hidden', boxShadow: "0 0 1rem rgba(0, 0, 0, .1)"}}>
                <Link href={"/admin/admins/add-admin"}>
                    <Button className={"ps-2"} variant={"contained"} color={"success"}>افزودن ادمین</Button>
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
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
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
                                            <TableCell align={"left"}>
                                                <IconButton color={"error"}
                                                            onClick={() => deleteHandler(row.mobile)}
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
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelRowsPerPage={"تعداد آیتم در هر صفحه"}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}


export async function getServerSideProps(context) {
    try {
        const {req} = context
        const authToken = req.cookies.authToken
        // admins list
        const dataResponse = await fetch(`https://newsapi.deltagroup.ir/panel/admins?page=1&limit=15`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${authToken}`
            }
        })
        const data = await dataResponse.json()

        return {
            props: {data}
        }
    } catch {
        const data = {status: false, data: {data: []}}
        return {
            props: {data}
        }
    }
}