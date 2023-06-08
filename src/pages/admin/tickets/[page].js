import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState} from "react";
import {Button, styled} from "@mui/material";
import {useRouter} from "next/router";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {Badge} from "react-bootstrap";

const columns = [
    {id: 'id', label: 'آیدی', minWidth: 170},
    {id: 'name', label: 'نام فرستنده', minWidth: 170, align: "left"},
    {id: 'email', label: 'ایمیل', minWidth: 170, align: 'left',},
    {id: 'mobile', label: 'شماره', minWidth: 170, align: 'left',},
];

export default function Tickets({data}) {


    const router = useRouter()
    const [DATA, setDATA] = useState(data.data.data)
    const [getData, setGetData] = useState(false)

    useEffect(() => {
        fetch(`${process.env.LOCAL_URL}/api/admin/tickets/${router.query.page}`)
            .then(res => res.json())
            .then(data => setDATA(data.data.data))
    }, [getData])

    function createData(id, name, email, mobile, is_answer) {
        return {id, name, email, mobile, is_answer};
    }

    const rows = [];
    DATA.map(item => rows.push(createData(`${item.id}`, `${item.name}`, `${item.email}`, `${item.mobile}`, `${item.is_answer}`)))


    const viewHandler = (id) => {
        router.push(`/admin/tickets/answer/${id}`)
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

    return (
        <div className={"px-md-4"}>
            <Paper className={"mt-3  rounded-3 overflow-hidden"} sx={{width: '100%', overflow: 'hidden', boxShadow: "0 0 1rem rgba(0, 0, 0, .1)"}}>
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
                                            {row.is_answer === "true" ?
                                                <Badge bg={"success"}>
                                                    پاسخ داده شده
                                                </Badge> :
                                                <Badge bg={"danger"}>
                                                    بدون پاسخ
                                                </Badge>}
                                        </TableCell>
                                        <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                            {
                                                row.is_answer === "true" ?
                                                    <Button variant="outlined" color={"success"} startIcon={<CheckCircleOutlineIcon/>}
                                                            onClick={() => viewHandler(row.id)}>
                                                        مشاهده
                                                    </Button>
                                                    :
                                                    <Button variant="outlined" color={"warning"} startIcon={<CheckCircleOutlineIcon/>}
                                                            onClick={() => viewHandler(row.id)}>
                                                        مشاهده و پاسخ
                                                    </Button>
                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                                    ;
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export async function getServerSideProps(context){

    const {params ,req} = context

    const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/tickets?page=${params.page}&limit=10`,{
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