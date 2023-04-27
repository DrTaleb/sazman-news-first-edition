import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Fragment, useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import {Button} from "@mui/material";
import Swal from "sweetalert2";
import Link from "next/link";
import {useRouter} from "next/router";

const columns = [
    {id: 'id', label: 'آیدی', minWidth: 170},
    {id: 'title', label: 'نام', minWidth: 170, align: "left"},
    {id: 'type', label: 'نوع', minWidth: 170, align: 'left',},
    {id: 'link', label: 'لینک', minWidth: 170, align: 'left',},
    {id: 'childrenCount', label: 'تعداد زیرمنو ها', minWidth: 170, align: 'left',},
    {id: 'status', label: 'وضعیت', minWidth: 170, align: 'left',},
];

export default function sliders({data}) {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [DATA,setDATA] = useState([])
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [page, setPage] = useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [getData, setGetData] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        setDATA(data.data.data)
    },[data])
    console.log(DATA)
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // useEffect( ()=>{
    //     fetch(`https://newsapi.deltagroup.ir/panel/menus`)
    //         .then(res => res.json())
    //         .then(data => setDATA(data))
    // }, [getData])

    function createData(id, title, type,link, childrenCount , status,subMenus, options) {
        return {id, title,type,link, childrenCount, status,subMenus, options};
    }


    const rows = [];
    DATA.map(item => rows.push(createData(`${item.id}`, `${item.title}`,`${item.type}`,`${item.link}`, `${item.children.length}`,  `${item.status === 1 ? "فعال" : "غیر فعال"}`),))


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target);
        setPage(0);
    };
    const viewHandler = (id) => {
        console.log(id)
    }
    const editHandler = (id,type) => {
        router.push(`/admin/menus/edit-menu/${type}/${id}`)
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
                fetch(`http://localhost:4000/menu/${id}`, {
                    method : "DELETE"
                }).then(res => console.log(res))
                setGetData(prev => !prev)
                Swal.fire(
                    '',
                    "حذف با موفقیت انجام شد !",
                    'success'
                )
            }
        })
    }


    return (
        <div className={"px-4"}>
            <Paper className={"p-3"} sx={{width: '100%', overflow: 'hidden' , boxShadow: "0 0 1rem rgba(0, 0, 0, .1)"}}>
                <Link href={"/admin/menus/add-menu"}>
                    <Button className={"ps-2"} variant={"contained"} >افزودن منو</Button>
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
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
                                                <IconButton color={"warning"}
                                                            onClick={() => editHandler(row.id,row.type)}
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


export async function getServerSideProps(context){

    const {req} = context

    const dataResponse = await fetch(`https://newsapi.deltagroup.ir/panel/menus?type=header&page=1&limit=10`,{
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