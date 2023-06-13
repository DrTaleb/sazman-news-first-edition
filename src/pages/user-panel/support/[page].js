import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState} from "react";
import {Button, Pagination, PaginationItem, Skeleton, styled} from "@mui/material";
import {useRouter} from "next/router";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {Badge} from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import Nprogress from "nprogress";

const columns = [
    {id: 'id', label: '#', minWidth: 170},
    {id: 'subject', label: 'موضوع', minWidth: 170, align: "left"},
];

export default function Tickets() {

    const router = useRouter()
    const [DATA, setDATA] = useState({})
    const [getData, setGetData] = useState(false)
    const [page,setPage] = useState("");
    const [pageCount,setPageCount] = useState("");

    const dataFetch = async () => {
        const dataRes = await fetch(`${process.env.LOCAL_URL}/api/user-panel/tickets/${localStorage.getItem("selectedCompany")}/${router.query.page}`)
        const data = await dataRes.json()
        setDATA(data)
        setPageCount(data.data.last_page)
        setPage(data.data.current_page)
    }

    useEffect(() => {
        dataFetch()
    }, [getData])

    function createData(id, subject, status) {
        return {id, subject, status};
    }

    const rows = [];
    if (DATA.status) {
        console.log(DATA)
        DATA.data.data.map(item => rows.push(createData(`${item.id}`, `${item.subject}`, `${item.status}`)))
    }

    const viewHandler = (id) => {
        router.push(`/user-panel/support/chat/${id}`)
    }

    const goToAddTicket = () => {
        router.push((`/user-panel/support/add-ticket`))
    }

    // head row style ---------
    const StyledTableRow = styled(TableRow)(({theme}) => ({
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
            backgroundColor: "#f7f7f7",

        },
    }));
    // end head row style-----------

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
                    fetch(`${process.env.LOCAL_URL}/api/user-panel/tickets/delete/${id}`, {
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
                            setGetData(!getData)
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
        await router.push(`/user-panel/support/${value}`)
        await setGetData(!getData)
    }
    if (DATA.status) {
        return (
            <div className={"px-md-4"}>
                <Button variant={"contained"} onClick={goToAddTicket} className={"bg-my-purple"}>
                    برای ثبت درخواست جدید کلیک کنید
                </Button>
                <Paper className={"mt-3  rounded-3 overflow-hidden"}
                       sx={{width: '100%', overflow: 'hidden', boxShadow: "0 0 1rem rgba(0, 0, 0, .1)"}}>
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
                                    <TableCell>
                                        وضعیت پاسخدهی
                                    </TableCell>
                                    <TableCell>
                                        گزینه های دسترسی
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
                                                {row.status === "2" ?
                                                    <Badge bg={"success"} className={"px-3 py-2"}>
                                                        پاسخ داده شده
                                                    </Badge> :
                                                    <Badge bg={"danger"} className={"px-3 py-2"}>
                                                        بدون پاسخ
                                                    </Badge>}
                                            </TableCell>
                                            <TableCell align={"left"} sx={{
                                                minWidth: "200px",
                                                display: "flex",
                                                flexDirection: "row",
                                                gap: "5px"
                                            }}>
                                                <Button variant="outlined" color={"info"}
                                                        startIcon={<CheckCircleOutlineIcon/>}
                                                        onClick={() => viewHandler(row.id)}>
                                                    باز کردن چت
                                                </Button>
                                                <Tooltip title={"حذف تیکت"}>
                                                    <Button variant="outlined" color={"error"}
                                                            startIcon={<DeleteIcon></DeleteIcon>}
                                                            onClick={() => deleteHandler(row.id)}>
                                                        حذف تیکت
                                                    </Button>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    )
                                        ;
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className={"d-flex flex-row justify-content-center mt-5 mb-3"}>
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
    } else {
        return (
            <div className={"px-md-4"}>
                <Button variant={"contained"} onClick={goToAddTicket} className={"bg-my-purple"}>
                    برای ثبت درخواست جدید کلیک کنید
                </Button>
                <Paper className={"mt-3  rounded-3 overflow-hidden"}
                       sx={{width: '100%', overflow: 'hidden', boxShadow: "0 0 1rem rgba(0, 0, 0, .1)"}}>
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
                                    <TableCell>
                                        وضعیت پاسخدهی
                                    </TableCell>
                                    <TableCell>
                                        گزینه های دسترسی
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
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        );
    }
}

