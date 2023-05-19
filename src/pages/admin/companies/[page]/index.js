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
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import {Button, Pagination, PaginationItem, styled} from "@mui/material";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import {Badge} from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import axios from "axios";
import Nprogress from "nprogress";
import AddTaskIcon from '@mui/icons-material/AddTask';

const columns = [
    {id: 'id', label: 'آیدی', minWidth: 170},
    {id: 'brand_name', label: 'نام برند', minWidth: 170, align: "left"},
    {id: 'company_name', label: 'نام شرکت', minWidth: 170, align: 'left',},
    {id: 'activity_type', label: 'نوع فعالیت', minWidth: 250, align: 'left',},
    {id: 'verify_status', label: 'وضعیت احراز هویت', minWidth: 170, align: 'left',},
];


export default function Companies({data}) {
    const rows = []
    const router = useRouter()
    const [DATA, setDATA] = useState(data.data.data)
    const dataFetch = async () => {
        const res = await fetch(`http://localhost:3000/api/admin/companies/${router.query.page}`)
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
    const formData = new FormData();
    const blockHandler = async (id) => {
        const selectedCompany = DATA.find(item => item.id == id)
        Swal.fire({
            text: `آیا از ${selectedCompany.status == "0" ? "رفع" : ""} مسدودسازی شرکت مورد نظر اطمینان دارید؟`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "خیر",
            confirmButtonColor: 'var(--main-purple)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await formData.append("brand_name", selectedCompany.brand_name)
                await formData.append("company_name", selectedCompany.company_name)
                await formData.append("activity_type", selectedCompany.activity_type)
                await formData.append("title", selectedCompany.title)
                await formData.append("subtitle", selectedCompany.subtitle)
                await formData.append("phone", selectedCompany.phone)
                await formData.append("city", selectedCompany.city)
                await formData.append("state", selectedCompany.state)
                await formData.append("address", selectedCompany.address)
                await formData.append("status", selectedCompany.status == "1" ? 0 : 1)
                await formData.append("verify_status", selectedCompany.verify_status)
                await formData.append("selected_status", selectedCompany.selected_status)
                await formData.append("owner_id", selectedCompany.owner.id)
                try {
                    const res = await axios.put(`http://localhost:3000/api/admin/companies/add-edit/${id}`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            }
                        }
                    )
                    if (res.data.status) {
                        Nprogress.done()
                        await Swal.fire({
                            icon: 'success',
                            text: ` شرکت ${selectedCompany.brand_name}${selectedCompany.status === "1" ? " به طور موقت مسدود شد" : " رفع مسدودیت شد"}`,
                        })
                        await dataFetch()
                    } else {
                        Nprogress.done()
                        await Swal.fire({
                            icon: 'error',
                            text: "مشکلی در سرور ایجاد شده",
                        })
                    }
                } catch {
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'error',
                        text: "مشکلی در سرور ایجاد شده",
                    })
                }
            }
        })
    }
    const ownerHandler = (id)=>{
        const selectedCompany = DATA.find(item => item.id == id )
        console.log(selectedCompany)
        Swal.fire({
            html : `<table class="table table-responsive">
                      <tr>
                         <td>
نام و نام خانوادگی :                           
                         </td>
                         <td>
                           ${selectedCompany.owner.firstname} ${selectedCompany.owner.lastname}
                         </td>
                       </tr>
                    </table>`
           ,

            showCancelButton: true,
            cancelButtonText: "بستن",
            confirmButtonColor: 'var(--main-purple)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'مشاهده و تغییر جزيیات'
        }).then((result) => {
            if (result.isConfirmed) {
                router.replace(`/admin/writers/view/${selectedCompany.owner_id}`)
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
        <div className={"px-4"}>
            <Paper className={"pb-3 rounded-4"}
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
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    وضعیت
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    مالک شرکت
                                </TableCell>
                                <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                    نویسندگان شرکت
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
                                                <TableCell key={column.id} align={column.align} className={"fw-bold"}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                            {
                                                row.status === "فعال" ?
                                                    <Badge bg={"success"} className={"px-3 py-2"}>
                                                        فعال
                                                    </Badge>
                                                    :
                                                    <Badge bg={"danger"} className={"px-3 py-2"}>
                                                        غیر فعال
                                                    </Badge>
                                            }
                                        </TableCell>
                                        <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                           <Button variant={"outlined"} onClick={()=>ownerHandler(row.id)}>
                                               جزئیات اکانت
                                           </Button>
                                        </TableCell>
                                        <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                            <Button variant={"outlined"}>
                                                مشاهده لیست
                                            </Button>
                                        </TableCell>
                                        <TableCell align={"left"} sx={{minWidth: "200px"}}>
                                            <Tooltip title="ویزایش">
                                                <IconButton color={"warning"}
                                                            onClick={() => editHandler(row.id)}
                                                >
                                                    <ModeEditOutlineRoundedIcon></ModeEditOutlineRoundedIcon>
                                                </IconButton>
                                            </Tooltip>
                                            {
                                                row.status === "فعال" ?
                                                    <Tooltip title={"مسدود سازی موقت"}>
                                                        <IconButton color={"error"}
                                                                    onClick={() => blockHandler(row.id)}
                                                        >
                                                            <DoNotDisturbAltIcon></DoNotDisturbAltIcon>
                                                        </IconButton>
                                                    </Tooltip> :
                                                    <Tooltip title={"رفع مسدود سازی"}>
                                                        <IconButton color={"success"}
                                                                    onClick={() => blockHandler(row.id)}
                                                        >
                                                            <AddTaskIcon></AddTaskIcon>
                                                        </IconButton>
                                                    </Tooltip>
                                            }
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

    const dataResponse = await fetch(`https://newsapi.deltagroup.ir/panel/companies?page=${params.page}&limit=10`, {
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