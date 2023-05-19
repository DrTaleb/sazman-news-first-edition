import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Breadcrumbs, Button} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import BlockIcon from '@mui/icons-material/Block';
import MenuItem from "@mui/material/MenuItem";


export default function UserView({data}) {
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href={"/admin/writers/1"}>
            کاربران
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
             مشاهده کاربر {data.data.firstname} {data.data.lastname}
        </Typography>,
    ];

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

    // form input ---------------------------------------

    const [status, setStatus] = useState(data.data.status)
    const [firstname, setFirstname] = useState(data.data.firstname)
    const [lastname, setLastname] = useState(data.data.lastname)
    const [mobile, setMobile] = useState(data.data.mobile)

    const statusHandler = (event) => {
        setStatus(event.target.value)
    };
    const firstnameHandler = (event) => {
        setFirstname(event.target.value)
    };
    const lastnameHandler = (event) => {
        setLastname(event.target.value)
    };
    const mobileHandler = (event) => {
        setMobile(event.target.value)
    };
    console.log(data.data)


    const editHandler = async () => {
        console.log(status)
        Swal.fire({
            text: `آیا از ${data.data.status == "1" ? "" : "رفع"} مسدودسازی کاربر مورد نظر اطمینان دارید؟`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "خیر",
            confirmButtonColor: 'var(--main-purple)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    fetch(`http://localhost:3000/api/admin/writers/${data.data.id}`, {
                        method: "PUT",
                        body: JSON.stringify({
                            _method: "PUT",
                            mobile: data.data.mobile,
                            firstname: data.data.firstName,
                            lastname: data.data.lastName,
                            status: data.data.status == "1" ? "0" : "1"
                        })
                    }).then(res => res.json()).then(data => {
                        if (data.massage.status) {
                            Swal.fire(
                                '',
                                ` کاربر ${data.data.status == "1" ? " به طور موقت مسدود شد" : " رفع مسدودیت شد"}`,
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
    if (data.status) {
        return (
            <Container>
                <Breadcrumbs className={"ms-4 py-3"} separator="›" aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
                <div className={"d-flex flex-row justify-content-center"}>
                    <Col xs={12} sm={11} md={8} lg={8} xl={7} className={"bg-white rounded-3 shadow"}>
                        <form>
                            <div className={"d-flex flex-column align-items-center gap-3 py-5"}>
                                <div className={"w-75 d-flex flex-column align-items-center align-items-sm-start gap-4 border border-1 border-light p-2"}>
                                    <picture>
                                        <source className={"panel-writer-img"} src={`https://newsapi.deltagroup.ir/${data.data.photo}`}/>
                                        <img className={"panel-writer-img"} src={"/img/1.webp"}/>
                                    </picture>
                                    <TextField className={"w-100"}
                                               label="نام"
                                               variant="outlined"
                                               value={firstname}
                                               onChange={firstnameHandler}
                                               InputLabelProps={{shrink: true}}
                                               disabled={true}
                                    />
                                    <TextField className={"w-100"}
                                               label="نام خانوادگی"
                                               variant="outlined"
                                               value={lastname}
                                               onChange={lastnameHandler}
                                               InputLabelProps={{shrink: true}}
                                               disabled={true}
                                    />
                                    <TextField className={"w-100"}
                                               label="شماره"
                                               variant="outlined"
                                               value={mobile}
                                               onChange={mobileHandler}
                                               InputLabelProps={{shrink: true}}
                                               disabled={true}
                                    />
                                    <TextField
                                        select
                                        label="وضعیت"
                                        className={"w-100"}
                                        disabled={true}
                                        value={status}
                                        onChange={statusHandler}
                                    >
                                        {statusOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <Button onClick={editHandler} variant="outlined" color={"error"} endIcon={<BlockIcon />}>
                                        مسدود سازی
                                    </Button>
                                </div>
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

    const dataResponse = await fetch(`https://newsapi.deltagroup.ir/panel/writers/${params.writerId}`, {
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
