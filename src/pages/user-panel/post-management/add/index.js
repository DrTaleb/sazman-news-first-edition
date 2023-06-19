import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import React, {useEffect, useRef, useState} from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Breadcrumbs, Button} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import axios from "axios";
import Nprogress from "nprogress";
import {useRouter} from "next/router";
import persian from "react-date-object/calendars/persian";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import transition from "react-element-popper/animations/transition"
import opacity from "react-element-popper/animations/opacity";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";
import persian_fa from "react-date-object/locales/persian_fa";
import CloseIcon from '@mui/icons-material/Close';
import {Toast} from 'primereact/toast';
import {FileUpload} from 'primereact/fileupload';
import {ProgressBar} from 'primereact/progressbar';
import {UploadFile} from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import {Editor} from '@tinymce/tinymce-react';



// Initialize the app

export default function AddAds() {

    const router = useRouter()
    const breadcrumbs = [
        <Link className={"text-decoration-none"} underline="hover" key="1" color="inherit"
              href={"/user-panel/gallery/1"}>
            مدیریت پست ها
        </Link>,
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            افزودن پست
        </Typography>,
    ];


    // form input -----------------------------------
    const formData = new FormData();

    const [title, setTitle] = useState("")

    const [titleError, setTitleError] = useState(true)

    const [status, setStatus] = useState("")

    const [statusError, setStatusError] = useState(true)

    const fileTypes = ["JPG", "JPEG", "PNG", "WEBP"];

    const [file, setFile] = useState(null);

    const [date, setDate] = useState("")


    const statusList = [
        {
            value: 1,
            label: "فعال"
        },
        {
            value: 0,
            label: "غیر فعال"
        }
    ]


    const handleChange = (file) => {
        setFile(file);
    };


    const titleHandler = (event) => {
        setTitle(event.target.value)
        event.target.value.length ? setTitleError(false) : setTitleError(true)
    }
    const statusHandler = (event) => {
        setStatus(event.target.value)
        event.target.value === 0 || event.target.value === 1 ? setStatusError(false) : setStatusError(true)
    };


    const submitHandler = async (event) => {
        event.preventDefault()
        Nprogress.start()
        if (titleError || statusError) {
            await Swal.fire({
                icon: 'error',
                text: "لطفا تمام فیلد ها را پر کنید",
            })
            Nprogress.done()
        } else if (!file) {
            await Swal.fire({
                icon: 'error',
                text: "لطفا فایل ها را وارد کنید",
            })
            Nprogress.done()
        } else {
            await formData.append("title", title);

            await formData.append("status", status)

            await formData.append("file", file)

            try {
                const res = await axios.post(`${process.env.LOCAL_URL}/api/user-panel/gallery/add`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                )
                if (res.data.status) {
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'success',
                        text: "عکس آپلود شد",
                    })
                    await router.push("/user-panel/gallery/1")
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
            Nprogress.done()

        }

    }


    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;
        setFile(e.files[0])

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };


    const onTemplateClear = () => {
        setTotalSize(0);
        setFile(null)
    };

    const headerTemplate = (options) => {
        const {chooseButton, cancelButton} = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0';

        return (
            <div className={"d-flex flex-row align-items-center justify-content-between mb-3"}
                 style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                <div className={"d-flex flex-row gap-2"}>
                    <Tooltip title={"انتخاب عکس"}>
                        {chooseButton}
                    </Tooltip>
                    <Tooltip title={"حذف عکس"}>
                        {cancelButton}
                    </Tooltip>
                </div>
                <div className="flex align-items-center gap-3">
                    <small>{formatedValue} / 1 MB</small>
                    <ProgressBar value={value} showValue={false} style={{width: '10rem', height: '8px'}}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="d-flex flex-row align-items-center gap-2" style={{width: '100%'}}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100}/>
                    <small className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </small>
                </div>
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="d-flex flex-column align-items-center">
                <span style={{fontSize: '.8em', fontFamily: "YekanBakh", color: 'var(--text-color-secondary)'}}>
                    در صورت تمایل عکس را بکشید و در این بخش رها کنید
                </span>
            </div>
        );
    };

    const chooseOptions = {
        icon: <UploadFile/>,
        iconOnly: true,
        className: 'custom-choose-btn p-button-rounded p-button-outlined'
    };
    const cancelOptions = {
        icon: <CloseIcon/>,
        iconOnly: true,
        className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'
    };


    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    return (
        <>
            <Container>
                <Breadcrumbs className={"ms-md-4"} separator="›" aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
                <div className={"d-flex flex-column align-items-center gap-3 mt-4"}>
                    <Col xs={12} sm={11} md={8} lg={6} xl={5} className={"shadow-sm bg-white px-3 py-5"}>
                        <form>
                            <div className={"d-flex flex-column flex-wrap align-items-center gap-3"}>
                            <span>
                               اطلاعات اولیه پست
                            </span>
                                <TextField
                                    className={"col-md-11 col-11"}
                                    label="عنوان پست"
                                    variant="outlined"
                                    error={titleError}
                                    value={title}
                                    onInput={(event) => titleHandler(event)}/>
                                <TextField
                                    className={"col-md col-11"}
                                    label="توضیح در مورد پست"
                                    variant="outlined"
                                    error={titleError}
                                    value={title}
                                    onInput={(event) => titleHandler(event)}/>
                                <div className={"col-11 bg-light rounded p-1"}>
                                    <Toast ref={toast}></Toast>
                                    <FileUpload
                                        ref={fileUploadRef}
                                        className={"w-100"}
                                        name="demo[]"
                                        accept="image/*"
                                        maxFileSize={1000000}
                                        onSelect={onTemplateSelect}
                                        onError={onTemplateClear}
                                        onClear={onTemplateClear}
                                        headerTemplate={headerTemplate}
                                        itemTemplate={itemTemplate}
                                        emptyTemplate={emptyTemplate}
                                        chooseOptions={chooseOptions}
                                        cancelOptions={cancelOptions}
                                    />
                                </div>
                                <div className={"d-flex flex-row align-items-center gap-4 "}>
                                <span>
                                    انتخاب تاریخ و ساعت انتشار :
                                </span>
                                    <DatePicker
                                        className={"col-12"}
                                        render={<Button variant={"contained"}
                                                        className={"py-2 col-12 bg-my-purple"}>{date ? date.format("YYYY-MM-DD HH:mm").replaceAll("-", "/") : "انتخاب تاریخ انتشار پست"}</Button>}
                                        calendar={persian}
                                        animations={[
                                            transition({duration: 400, from: 35}),
                                            opacity({duration: 400, from: 0})
                                        ]}
                                        zIndex={2000}
                                        locale={persian_fa}
                                        value={date}
                                        onChange={setDate}
                                        format={"YYYY-MM-DD HH:mm"}
                                        plugins={[
                                            <TimePicker key={1} position={"bottom"}></TimePicker>,
                                            <DatePanel key={2} markFocused></DatePanel>,
                                            <DatePickerHeader
                                                key={3}
                                                position="top"
                                                size="medium"
                                                className={"bg-my-purple"}
                                            />
                                        ]}
                                    >
                                    </DatePicker>
                                </div>
                            </div>
                            <div className={"d-flex flex-row flex-wrap mt-3"}>


                                {/*<TextField*/}
                                {/*    select*/}
                                {/*    label="وضعیت"*/}
                                {/*    error={statusError}*/}
                                {/*    className={"col-md-9 col-11"}*/}
                                {/*    onChange={statusHandler}*/}
                                {/*    value={status}*/}
                                {/*>*/}
                                {/*    {statusList.map((option) => (*/}
                                {/*        <MenuItem key={option.value} value={option.value}>*/}
                                {/*            {option.label}*/}
                                {/*        </MenuItem>*/}
                                {/*    ))}*/}
                                {/*</TextField>*/}

                                {/*<label>عکس  مورد نظر را وارد کنید</label>*/}

                                {/*<FileUploader*/}
                                {/*    handleChange={handleFileChange}*/}
                                {/*    name="file"*/}
                                {/*    types={fileTypes}*/}
                                {/*    label={`فایل را وارد کنید`}*/}
                                {/*/>*/}

                                {/*<Button onClick={submitHandler} className={"col-8 mt-5"} variant={"contained"}*/}
                                {/*        color={"success"}>افزودن</Button>*/}
                            </div>
                        </form>
                    </Col>
                    <div className={"w-100"}>
                        <div className="d-flex flex-row align-items-center mt-4 mt-md-0">
                            <div className="panel-title-parent w-100">
                                <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                                    محتوای پست
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className={"d-flex flex-row w-100"}>
                        <Editor
                            tinymce-script-src="tinymce/tinymce.min.js"
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue=""
                            init={{
                                height: 500,
                                width: "100%",
                                language : "fa",
                                directionality : "rtl",
                                menubar: true,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter | image |' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help' ,
                                content_style: 'body { font-family:"YekanBakh",sans-serif; font-size:14px }'
                            }}
                        />
                    </div>
                </div>
            </Container>
        </>
    )
}