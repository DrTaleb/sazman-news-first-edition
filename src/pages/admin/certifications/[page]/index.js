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
import {Alert, Pagination, PaginationItem, styled} from "@mui/material";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import {Badge, Col, Row} from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import axios from "axios";
import Nprogress from "nprogress";
import AddTaskIcon from '@mui/icons-material/AddTask';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import {ErrorOutline} from "@mui/icons-material";

const columns = [
    {id: 'id', label: 'آیدی', minWidth: 170},
    {id: 'title', label: 'عنوان', minWidth: 170, align: "left"},
    {id: 'brand_name', label: 'نام برند', minWidth: 170, align: "left"},
];


export default function Companies({data}) {
    const rows = []
    const router = useRouter()
    const [DATA, setDATA] = useState(data.data.data)
    const [loading, setLoading] = useState(!data)
    const dataFetch = async () => {
        const res = await fetch(`${process.env.LOCAL_URL}/api/admin/companies/${router.query.page}`)
        const data = await res.json()
        await setDATA(data.data.data)
    }
    useEffect(() => {
        dataFetch()
    }, [router.query.page])

    function createData(id, title, brand_name, status) {
        return {id, title, brand_name, status};
    }

    DATA.map(item => rows.push(createData(`${item.id}`, `${item.title}`, `${item.brand_name}`, `${item.status == 1 ? "فعال" : "غیر فعال"}`)))

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
                    const res = await axios.put(`${process.env.LOCAL_URL}/api/admin/companies/add-edit/${id}`, formData, {
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
    const ownerHandler = (id) => {
        const selectedCompany = DATA.find(item => item.id == id)
        console.log(selectedCompany)
        Swal.fire({
            html: `<table class="table table-responsive">
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

    const writersList = (id) => {
        router.push(`/admin/companies/company-writer/${id}`)
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
    const [limit] = useState([1, 2, 3, 4, 5, 6, 7])
    if (!data.status) {
        return (
            <div className={"d-flex flex-column align-items-center justify-content-center"}>
                <Alert color={"error"} icon={<ErrorOutline/>}>
                    دیتایی از سمت سرور یافت نشد( در صورت دیدن این خطا کارفرما را در جریان قرار دهید)
                </Alert>
            </div>
        )
    } else return (
        <div className={"px-4"}>
            <div className={"panel-search-bar rounded-3 mb-3 gap-2"}>
                <Col xl={3} className={"bg-white"}>
                    <TextField
                        className={"w-100"}
                        id="filled-search"
                        label="جستجو"
                        type="search"
                    />
                </Col>
                <Col xl={2} className={"bg-white"}>
                    <TextField
                        select
                        label="جستجو بر اساس"
                        // error={statusError}
                        className={"w-100"}
                        // onChange={statusHandler}
                        // value={status}
                    >

                        <MenuItem value={"title"}>
                            عنوان
                        </MenuItem>
                        <MenuItem value={"brand_name"}>
                            نام برند
                        </MenuItem>
                    </TextField>
                </Col>
            </div>
            <Paper className={"pb-3 rounded-4 shadow-sm"}
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
                                            <Tooltip title="مشاهده عکس">
                                                <IconButton color={"info"}
                                                            onClick={() => editHandler(row.id)}
                                                >
                                                    <RemoveRedEyeIcon></RemoveRedEyeIcon>
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

    try {
        const {req, params} = context

        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/companies?page=${params.page}&limit=10`, {
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
    } catch {
        const data = {status: false,data : {data : []}}
        return {
            props: {data}
        }
    }
}