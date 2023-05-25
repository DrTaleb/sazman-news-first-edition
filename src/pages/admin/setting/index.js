import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import {Button} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import axios from "axios";
import Nprogress from "nprogress";

export default function MainSetting({data}) {
    console.log(data)
    const [getData, setGetData] = useState(false)
    const [DATA, setDATA] = useState(data.data)
    // useEffect( ()=>{
    //     fetch(`${process.env.LOCAL_URL}/api/admin/setting`)
    //         .then(res => res.json())
    //         .then(data => setDATA(data))
    // }, [getData])


    // form input -----------------------------------
    const [title, setTitle] = useState(DATA.title)
    const [titleError, setTitleError] = useState(false)
    const [address, setAddress] = useState(DATA.address)
    const [addressError, setAddressError] = useState(false)
    const [copyright, setCopyright] = useState(DATA.copyright)
    const [copyrightError, setCopyrightError] = useState(false)
    const [number, setNumber] = useState(DATA.phone)
    const [numberError, setNumberError] = useState(false)
    const [desc, setDesc] = useState(DATA.description)
    const [descError, setDescError] = useState(false)
    const titleHandler = (event) => {
        setTitle(event.target.value)
        event.target.value.length ? setTitleError(false) : setTitleError(true)
    }
    const addressHandler = (event) => {
        setAddress(event.target.value)
        event.target.value.length ? setAddressError(false) : setAddressError(true)
    }
    const copyrightHandler = (event) => {
        setCopyright(event.target.value)
        event.target.value.length ? setCopyrightError(false) : setCopyrightError(true)
    };
    const numberHandler = (event) => {
        setNumber(event.target.value)
        event.target.value.length === 11 && event.target.value[0] == 0 ? setNumberError(false) : setNumberError(true)
    };
    const descHandler = (event) => {
        setDesc(event.target.value)
        event.target.value.length ? setDescError(false) : setDescError(true)
    }
    const [file, setFile] = useState(null);
    const formData = new FormData();
    const handleChange = (file) => {
        setFile(file);
    };

    const submitHandler = async (event) => {
        event.preventDefault()
        Nprogress.start()
        if (titleError || descError || addressError || numberError || emailError) {
            await Swal.fire({
                icon: 'error',
                text: "لطفا تمام فیلد ها را به درستی پر کنید",
            })
        } else {

            await formData.append("name", title);
            await formData.append("description", desc)
            await formData.append("number", number)
            await formData.append("address", address)
            await formData.append("email", email)
            if (file){
                await formData.append("image", file)
            }
            try {
                const res = await axios.post(`${process.env.LOCAL_URL}/api/admin/setting`,formData,{headers : {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                )
                console.log(res.data)
                if (res.data.message === "information updated"){
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'success',
                        text: "اطلاعات به روز شد",
                    })
                    setGetData(prevState => !prevState)
                }else {
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'error',
                        text: "مشکلی ایجاد شده دوباره تلاش کنید",
                    })
                }
                Nprogress.done()
            }catch{
                Nprogress.done()
                await Swal.fire({
                    icon: 'error',
                    text: "مشکلی در سرور ایجاد شده",
                })
            }

        }

    }
    const fileTypes = ["PNG", "WEBP"];
    return (
        <Container>
            <div className={"d-flex flex-row justify-content-center mt-4"}>

                <Col xs={11} sm={11} md={8} lg={6} xl={5} className={"shadow rounded-4 bg-white"}>
                    <form>
                        <div className={"d-flex flex-column align-items-center gap-3 py-5"}>
                            <picture>
                                <source className={"panel-writer-img"} srcSet={`https://newsapi.deltagroup.ir/${data.data.logo}`}/>
                                <img className={"panel-writer-img"} src={"/img/1.webp"}/>
                            </picture>
                            <TextField
                                className={"w-75"}
                                label="نام شرکت"
                                variant="outlined"
                                error={titleError}
                                value={title}
                                onInput={(event) => titleHandler(event)}/>
                            <TextField
                                className={"w-75"}
                                label="آدرس"
                                variant="outlined"
                                multiline
                                error={addressError}
                                value={address}
                                onInput={(event) => addressHandler(event)}/>
                            <TextField
                                className={"w-75"}
                                label="کپی رایت"
                                variant="outlined"
                                type={"text"}
                                multiline={true}
                                error={copyrightError}
                                value={copyright}
                                onInput={(event) => copyrightHandler(event)}/>
                            <TextField
                                className={"w-75"}
                                label="توضیحات"
                                variant="outlined"
                                multiline
                                error={descError}
                                value={desc}
                                onInput={(event) => descHandler(event)}/>

                            <div className={"w-75 d-flex flex-column gap-3 p-1 bg-light align-items-center rounded-3"}>
                                <span>
                                    آدرس های شبکه های اجتماعی
                                </span>
                                <TextField
                                    className={"w-100"}
                                    label="لیکندین"
                                    variant="outlined"
                                    multiline
                                    error={descError}
                                    value={desc}
                                    onInput={(event) => descHandler(event)}/>
                                <TextField
                                    className={"w-100"}
                                    label="اینستاگرام"
                                    variant="outlined"
                                    multiline
                                    error={descError}
                                    value={desc}
                                    onInput={(event) => descHandler(event)}/>
                                <TextField
                                    className={"w-100"}
                                    label="تلگرام"
                                    variant="outlined"
                                    multiline
                                    error={descError}
                                    value={desc}
                                    onInput={(event) => descHandler(event)}/>
                                <TextField
                                    className={"w-100"}
                                    label="آپارات"
                                    variant="outlined"
                                    multiline
                                    error={descError}
                                    value={desc}
                                    onInput={(event) => descHandler(event)}/>
                            </div>
                            <TextField
                                className={"w-75"}
                                label="تلفن"
                                variant="outlined"
                                error={numberError}
                                type={"number"}
                                value={number}
                                onInput={(event) => numberHandler(event)}/>


                            <label>عکس مورد نظر را وارد کنید</label>
                            <FileUploader handleChange={handleChange} name="file" types={fileTypes}
                                          label={"بکشید و در این نقطه رها کنید"}/>
                            <Button onClick={submitHandler} className={"col-8 mt-5"} variant={"contained"}
                                    color={"success"}>ثبت</Button>
                        </div>
                    </form>
                </Col>
            </div>
        </Container>
    )
}
export async function getServerSideProps (context){
    const {req} = context
    const authToken = req.cookies.authToken
    const response = await fetch(`https://newsapi.deltagroup.ir/panel/settings`,{
        method : "GET",
        credentials : 'include',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization' : `Bearer ${authToken}`
        },
    })
    const data = await response.json()
    return{
        props : {data}
    }

}