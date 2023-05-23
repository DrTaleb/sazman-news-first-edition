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
import Nprogress from "nprogress";

const columns = [
    {id: 'id', label: 'آیدی', minWidth: 170},
    {id: 'name', label: 'نام', minWidth: 170, align: "left"},
    {
        id: 'status', label: 'وضعیت', minWidth: 170, align: 'left',
    },
    {
        id: 'position_id', label: 'آیدی محل قرارگیری', minWidth: 200, align: 'left',
    },
    {
        id: 'type', label: 'نوع فایل', minWidth: 200, align: 'left',
    },
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


export default function Ads({data}) {


    const router = useRouter()
    const [DATA,setDATA] = useState(data)
    const [page, setPage] = useState(data.data.current_page);
    const [rowsPerPage, setRowsPerPage] = useState(data.data.per_page);
    const [pageCount, setPageCount] = useState(data.data.last_page);
    const [getData, setGetData] = useState(false)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dataFetch = async ()=>{
        const res = await fetch(`http://localhost:3000/api/admin/ads/${router.query.page}`)
        const data = await res.json()
        await setDATA(data)
    }
    // // eslint-disable-next-line react-hooks/rules-of-hooks,react-hooks/exhaustive-deps
    // useEffect( () => {
    //     dataFetch()
    // }, [getData])

    useEffect(()=>{
        setDATA(data)
    },[data])

    function createData(id, name, status,position_id,type,link, link_type,start_at,end_at, options) {
        return {id, name, status,link,position_id,type, link_type,start_at,end_at, options};
    }

    const rows = [];
    DATA.data.data.map(item => rows.push(createData(`${item.id}`, `${item.title}`, `${item.status == 1 ? "فعال" : "غیر فعال"}`,`${item.position_id}`,`${item.type}`, `${item.link}`, `${item.link_type == 1 ?  "داخلی" : "خارجی" }`,`${item.start_at}`,`${item.end_at}`,)))



    const viewHandler = (id) => {
        router.push(`/admin/ads/view/${id}`)
    }
    const editHandler = (id) => {
       router.replace(`/admin/ads/edit-slider/${id}`)
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
                    fetch(`http://localhost:3000/api/admin/ads/delete/${id}`, {
                        method : "DELETE"
                    }).then(res => res.json()).then(data => {
                        if (data.status){
                            setGetData(prev => !prev)
                            Nprogress.done()
                            Swal.fire(
                                '',
                                "حذف با موفقیت انجام شد !",
                                'success'
                            )
                            dataFetch()
                        }else {
                            Nprogress.done()
                            Swal.fire(
                                '',
                                "مشکلی وجود دارد دوباره تلاش کنید",
                                'success'
                            )
                        }
                    })
                }catch {
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


    const clickHandler =  (event, value) => {
         router.push(`/admin/sliders/${value}`)
        dataFetch()
    }


    return (
        <div className={"px-4"}>
            <Paper className={"p-3"} sx={{width: '100%', overflow: 'hidden' , boxShadow: "0 0 1rem rgba(0, 0, 0, .1)"}}>
                <Link href={"/admin/ads/add-ads"}>
                    <Button className={"ps-2"} variant={"contained"} color={"success"}>افزودن تبلیغ</Button>
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
                            {rows.map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}  className={"fw-bold"}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell align={"left"} sx={{minWidth : "200px"}}>
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
                                                            onClick={()=> deleteHandler( row.id)}
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


export async function getServerSideProps(context){

    const {params ,req} = context

    const dataResponse = await fetch(`https://newsapi.deltagroup.ir/panel/ads?page=${params.page}&limit=10`,{
        method : "GET",
        headers : {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization' : `Bearer ${req.cookies.authToken}`
        }
    })
    const data = await dataResponse.json()

    return {
        props : {data}
    }
}