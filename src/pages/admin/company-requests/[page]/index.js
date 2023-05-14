import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Fragment, useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import {Button, Pagination, PaginationItem} from "@mui/material";
import Swal from "sweetalert2";
import Link from "next/link";
import {useRouter} from "next/router";
import {Badge} from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";

const columns = [
    {id: 'id', label: 'آیدی', minWidth: 170},
    {id: 'brand_name', label: 'نام برند', minWidth: 170, align: "left"},
    {id: 'company_name', label: 'نام شرکت', minWidth: 170, align: 'left',},
    {id: 'activity_type', label: 'نوع فعالیت', minWidth: 170, align: 'left',},
    {id: 'verify_status', label: 'وضعیت احراز هویت', minWidth: 170, align: 'left',},
    {id: 'status', label: 'وضعیت', minWidth: 170, align: 'left',},
];

export default function Companies({data}) {
    const rows = []
    const router = useRouter()
    const [DATA, setDATA] = useState(data.data.data)
    const dataFetch = async () => {
        const res = await fetch(`http://localhost:3000/api/admin/company-requests/${router.query.page}`)
        const data = await res.json()
        await setDATA(data.data.data)
    }
    useEffect(() => {
        dataFetch()
    }, [router.query.page])

    function createData(id, brand_name, company_name, activity_type, verify_status, status, options) {
        return {id, brand_name, company_name, activity_type, verify_status, status, options};
    }

    DATA.map(item => rows.push(createData(`${item.id}`, `${item.brand_name}`, `${item.company_name}`, `${item.activity_type}`, `${item.verify_status == 1 ? "فعال" : "غیر فعال"}`, `${item.status == 1 ? "فعال" : "غیر فعال"}`)))

    const editHandler = (id) => {
        router.push(`/admin/companies/edit-company/${id}`)
    }
    const deleteHandler = async (id) => {
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
                try {
                    fetch(`http://localhost:3000/api/admin/companies/delete/${id}`, {
                        method: "DELETE"
                    }).then(res => res.json()).then(data => {
                        if (data.status) {
                            dataFetch()
                            Swal.fire(
                                '',
                                "حذف با موفقیت انجام شد !",
                                'success'
                            )
                        } else {
                            console.log(data)
                            Swal.fire(
                                '',
                                "مشکلی در حذف شرکت پیش آمده !",
                                'error'
                            )
                        }
                    })
                } catch (err) {
                    console.log(err)
                    Swal.fire(
                        '',
                        "مشکلی در سرور پیش آمده !",
                        'error'
                    )
                }
            }
        })
    }

    const [page, setPage] = useState(data.data.current_page);
    const [rowsPerPage, setRowsPerPage] = useState(data.data.per_page);
    const [pageCount, setPageCount] = useState(data.data.last_page);
    const clickHandler = (event, value) => {
        router.replace(`/admin/menus/header/${value}`)
    }
    const seeChildren = (id) => {
        router.push(`/admin/menus/header/submenus/${id}`)
    }

    return (
        <div className={"px-4"}>
            <Paper className={"p-3"} sx={{width: '100%', overflow: 'hidden', boxShadow: "0 0 1rem rgba(0, 0, 0, .1)"}}>
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
                            {rows.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align} className={"fw-bold"}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                            <Tooltip title="ویزایش">
                                                <IconButton color={"warning"}
                                                            onClick={() => editHandler(row.id)}
                                                >
                                                    <ModeEditOutlineRoundedIcon></ModeEditOutlineRoundedIcon>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="حذف شرکت">
                                                <IconButton color={"error"}
                                                            onClick={() => deleteHandler(row.id)}
                                                >
                                                    <DeleteIcon></DeleteIcon>
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
    );
}


    export async function getServerSideProps(context) {

        const {req, params} = context

        const dataResponse = await fetch(`https://newsapi.deltagroup.ir/panel/companies?page=${params.page}&limit=10&verify_status=0`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${req.cookies.authToken}`
            }
        })
        const data = await dataResponse.json()

        return {
            props: {data}
        }
    }