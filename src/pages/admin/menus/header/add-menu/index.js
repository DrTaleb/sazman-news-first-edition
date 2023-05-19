import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
// import {FileUploader} from "react-drag-drop-files";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Breadcrumbs, Button} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import {headers} from "next/headers";

export default function AddMenu({data}) {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href={"/admin/menus/1"}>
            منو
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            افزودن منو
        </Typography>,
    ];
    const router = useRouter()
    const [menus, setMenus] = useState([])
    useEffect(() => {
        const menuList = [{label : "بدون والد" , value : 0}]
        data.data.data.map(item => menuList.push({label : item.title, value : item.id}))
        setMenus(menuList)
    }, [data])
    const [statusOptions, setStatusOptions] = useState([
        {
            label: "غیر فعال",
            value: 0
        },
        {
            label: "فعال",
            value: 1
        }
    ])
    const [linkTypeList, setLinkTypeList] = useState([
        {
            label: "درونی",
            value: 1
        },
        {
            label: "بیرونی",
            value: 2
        }
    ])
    const [status, setStatus] = useState(0)

    // form input -----------------------------------
    const [name, setName] = useState("")
    const [nameError, setNameError] = useState(true)
    const [linkType, setLinkType] = useState("")
    const [linkTypeError, setLinkTypeError] = useState(true)
    const [order, setOrder] = useState("")
    const [orderError, setOrderError] = useState(true)
    const [link, setLink] = useState("")
    const [linkError, setLinkError] = useState(true)
    const [linkDisable, setLinkDisable] = useState(true)
    const [parent, setParent] = useState(0)
    const [parentDisable] = useState(false)
    const nameHandler = (event) => {
        setName(event.target.value)
        event.target.value.length ? setNameError(false) : setNameError(true)
    }
    const orderHandler = (event) => {
        setOrder(event.target.value)
        event.target.value.length ? setOrderError(false) : setOrderError(true)
    }
    const linkHandler = (event) => {
        setLink(event.target.value)
        event.target.value.length ? setLinkError(false) : setLinkError(true)
    }
    const linkTypeHandler = (event) => {
        setLinkType(event.target.value)
        setLinkTypeError(false)
        setLinkDisable(false)
        if (event.target.value === 2) {
            setLink("https://")
        } else if (event.target.value === 1) {
            setLink("/")
        }

    }
    const statusHandler = (event) => {
        setStatus(event.target.value)

    };
    const parentHandler = (event) => {
        setParent(event.target.value)
    };

    const submitHandler = async (event) => {
        event.preventDefault()
        if (nameError || linkError) {
            Swal.fire({
                icon: 'error',
                text: "لطفا تمام فیلد ها را پر کنید",
            })
        } else {
            try {
                const res = await fetch(`http://localhost:3000/api/admin/menus/header`, {
                    method: "POST",
                    body: JSON.stringify({
                        type: "header",
                        parent_id: parent,
                        order: order,
                        link_type: `${linkType}`,
                        title: name,
                        link: link,
                        status: status
                    })
                })
                const data = await res.json()
                if (data.massage.status) {
                    Swal.fire({
                        icon: 'success',
                        text: "منو ایجاد شد",
                    })
                    router.push("/admin/menus/header/1")
                } else {
                    console.log(data.massage)
                    Swal.fire({
                        icon: 'error',
                        text: "مشکلی پیش آمده لطفا دوباره تلاش کنید",
                    })
                }
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    text: "مشکلی در سرور پیش آمده",
                })
            }
        }
    }
    if (data.status) {
        return (
            <Container>
                <Breadcrumbs className={"ms-4"} separator="›" aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
                <div className={"d-flex flex-row justify-content-center"}>

                    <Col xs={11} sm={11} md={8} lg={6} xl={5} className={"bg-white rounded-3 shadow"}>
                        <form>
                            <div className={"d-flex flex-column align-items-center gap-3 py-5"}>
                                <TextField className={"w-75"}
                                           label="نام منو"
                                           variant="outlined"
                                           value={name}
                                           error={nameError}
                                           InputLabelProps={{shrink: true}}
                                           onInput={(event) => nameHandler(event)}
                                />
                                <TextField
                                    select
                                    label="نوع لینک"
                                    className={"w-75"}
                                    error={linkTypeError}
                                    value={linkType}
                                    onChange={linkTypeHandler}
                                >
                                    {linkTypeList.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField className={"w-75"}
                                           label="لینک"
                                           variant="outlined"
                                           value={link}
                                           error={linkError}
                                           disabled={linkDisable}
                                           InputLabelProps={{shrink: true}}
                                           onInput={(event) => linkHandler(event)}
                                />
                                <TextField className={"w-75"}
                                           label="ترتیب قرارگیری"
                                           variant="outlined"
                                           value={order}
                                           type={"number"}
                                           error={orderError}
                                           InputLabelProps={{shrink: true}}
                                           onInput={(event) => orderHandler(event)}
                                />
                                <TextField
                                    select
                                    label="والد"
                                    className={"w-75"}
                                    value={parent}
                                    onChange={parentHandler}
                                    disabled={parentDisable}
                                >
                                    {menus.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    label="وضعیت"
                                    className={"w-75"}
                                    value={status}
                                    onChange={statusHandler}
                                >
                                    {statusOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Button onClick={submitHandler} className={"col-8 mt-5"} variant={"contained"}
                                        color={"success"}>افزودن</Button>
                            </div>
                        </form>
                    </Col>
                </div>
            </Container>
        )
    } else return (
        <div className={"d-flex flex-row align-items-center justify-content-center"}>
            <span>
                ارور سرور (لطفا از فعال بودن سرور بک اند اطمینان حاصل کنید)
            </span>
        </div>
    )
}

export async function getServerSideProps(context) {

    const {params, req} = context

    const dataResponse = await fetch(`https://newsapi.deltagroup.ir/panel/menus?type=header&page=1&limit=1000`, {
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