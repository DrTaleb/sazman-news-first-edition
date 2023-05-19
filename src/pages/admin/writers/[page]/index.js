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
import {Button, Pagination, PaginationItem, styled} from "@mui/material";
import Swal from "sweetalert2";
import Link from "next/link";
import {useRouter} from "next/router";
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import Tooltip from "@mui/material/Tooltip";
import AddTaskIcon from '@mui/icons-material/AddTask';
import {Badge} from "react-bootstrap";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const columns = [
    {id: 'id', label: 'آیدی', minWidth: 170},
    // {id: 'photo', label: 'عکس پروفایل', minWidth: 170},
    {id: 'firstName', label: 'نام', minWidth: 170, align: "left"},
    {id: 'lastName', label: 'نام خانوادگی', minWidth: 170, align: 'left',},
    {id: 'mobile', label: 'موبایل', minWidth: 170, align: 'left',},
    {id: 'status', label: 'وضعیت', minWidth: 170, align: 'left',},
];

export default function Writers({data}) {
    const rows = []
    const router = useRouter()
    const [DATA, setDATA] = useState(data.data.data)
    const dataFetch = async () => {
        const res = await fetch(`http://localhost:3000/api/admin/writers/${router.query.page}`)
        const data = await res.json()
        await setDATA(data.data.data)
    }
    useEffect(() => {
        dataFetch()
    }, [router.query.page])

    function createData(id, photo, firstName, lastName, mobile, status, options) {
        return {id, photo, firstName, lastName, mobile, status, options};
    }

    console.log(DATA)
    DATA.map(item => rows.push(createData(`${item.id}`, `${item.photo}`, `${item.firstname}`, `${item.lastname}`, `${item.user.mobile}`, `${item.user.status == 1 ? "فعال" : "غیر فعال"}`)))

    const editHandler = async (id, firstName, lastName, mobile, status) => {
        console.log(status)
        Swal.fire({
            text: `آیا از ${status === "فعال" ? "" : "رفع"} مسدودسازی کاربر مورد نظر اطمینان دارید؟`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "خیر",
            confirmButtonColor: 'var(--main-purple)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(id, firstName, lastName, mobile)
                try {
                    fetch(`http://localhost:3000/api/admin/writers/${id}`, {
                        method: "PUT",
                        body: JSON.stringify({
                            _method: "PUT",
                            mobile: mobile,
                            firstname: firstName,
                            lastname: lastName,
                            status: status == "فعال" ? 0 : 1
                        })
                    }).then(res => res.json()).then(data => {
                        if (data.massage.status) {
                            dataFetch()
                            Swal.fire(
                                '',
                                ` کاربر ${status === "فعال" ? " به طور موقت مسدود شد" : " رفع مسدودیت شد"}`,
                                'success'
                            )
                        } else {
                            Swal.fire(
                                '',
                                "مشکلی در مسدودسازی  پیش آمده !",
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
                    fetch(`http://localhost:3000/api/admin/writers/${id}`, {
                        method: "DELETE"
                    }).then(res => res.json()).then(data => {
                        if (data.massage.status) {
                            dataFetch()
                            Swal.fire(
                                '',
                                "حذف با موفقیت انجام شد !",
                                'success'
                            )
                        } else {
                            Swal.fire(
                                '',
                                "مشکلی در حذف دسته پیش آمده !",
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
        router.push(`/admin/categories/subcategories/${id}`)
    }

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
            backgroundColor: "#f7f7f7",

        },
    }));
    return (
        <div className={"px-4"}>
            <Paper className={"pb-3 rounded-4"}
                   sx={{width: '100%', overflow: 'hidden', boxShadow: "0 0 1rem rgba(0, 0, 0, .1)"}}>
                <TableContainer sx={{maxHeight: 600}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <StyledTableRow sx={{background: "#000"}}>
                                <TableCell>
                                    پروفایل
                                </TableCell>
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
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        <TableCell sx={{width: "100px"}}>
                                            <img alt={""} className={"w-100"}
                                                 src={`https://newsapi.deltagroup.ir/${row.photo}`}/>
                                        </TableCell>
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
                                        <TableCell>
                                            {
                                                row.status == "فعال" ?
                                                    <Badge bg={"success"}>فعال</Badge>
                                                    :
                                                    <Badge bg={"danger"}>غیر فعال</Badge>
                                            }
                                        </TableCell>
                                        <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                            <Tooltip title={"مشاهده جزئیات اکانت"}>
                                                <IconButton color={"primary"}
                                                            onClick={() => deleteHandler(row.id)}
                                                >
                                                    <RemoveRedEyeIcon></RemoveRedEyeIcon>
                                                </IconButton>
                                            </Tooltip>
                                            {
                                                row.status == "فعال" ?
                                                    <Tooltip title={"مسدود سازی موقت"}>
                                                        <IconButton color={"warning"}
                                                                    onClick={() => editHandler(row.id, row.firstName, row.lastName, row.mobile, row.status)}
                                                        >
                                                            <DoNotDisturbAltIcon></DoNotDisturbAltIcon>
                                                        </IconButton>
                                                    </Tooltip>

                                                    :
                                                    <Tooltip title={"رفع مسدود سازی"}>
                                                        <IconButton color={"success"}
                                                                    onClick={() => editHandler(row.id, row.firstName, row.lastName, row.mobile, row.status)}
                                                        >
                                                            <AddTaskIcon></AddTaskIcon>
                                                        </IconButton>
                                                    </Tooltip>

                                            }
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
}


export async function getServerSideProps(context) {

    const {req, params} = context

    const dataResponse = await fetch(`https://newsapi.deltagroup.ir/panel/writers?page=${params.page}&limit=15`, {
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