import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import {SendSharp} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {useEffect, useRef, useState} from "react";

export default function Answer() {
    const chatBox = useRef()
    const answerSection = `
                   `
    const textSection = (text, time) => {
        return (<div className={"d-flex flex-row gap-3 justify-content-end"}>
                <div className={"chat-item d-flex flex-column bg-white rounded-3 px-3 shadow-sm"}>
                            <span className={"text-justify py-3"}>
                                ${text}
                            </span>
                    <small className={"align-self-end"}>
                        ${time}
                    </small>
                </div>
                <Tooltip title={"پشتیبانی وبسایت"}>
                    <div className={"company-profile-img align-self-end"}>
                        <img alt={""} src={"/img/consulting.svg"} className={"w-100"}/>
                    </div>
                </Tooltip>
            </div>)

    }

    const [reply, setReply] = useState("")
    const replyHandler = (event) => {
        setReply(event.target.value)
    }
    const sendHandler = () => {
        chatBox.current.innerHTML += textSection(reply,"10 : 41")
        console.log(textSection(reply,"10 : 41"))
    }
    return (
        <>
            <div className={"container mb-5"}>
                <div ref={chatBox} className={"chat-box d-flex flex-column gap-3 mb-5"}>
                    <div className={"d-flex flex-row gap-3 justify-content-end"}>
                        <div className={"chat-item d-flex flex-column bg-white rounded-3 px-3 shadow-sm"}>
                            <span className={"text-justify py-3"}>
                                سلام چطور میتونم کمکتون کنم ؟
                            </span>
                            <small className={"align-self-end"}>
                                10:41
                            </small>
                        </div>
                        <Tooltip title={"پشتیبانی وبسایت"}>
                            <div className={"company-profile-img align-self-end"}>
                                <img alt={""} src={"/img/consulting.svg"} className={"w-100"}/>
                            </div>
                        </Tooltip>
                    </div>
                    <div className={"d-flex flex-row gap-2"}>
                        <Tooltip title={"کاربر"}>
                            <div className={"company-profile-img bg-transparent align-self-end"}>
                                <img src={"/img/1.webp"} className={"w-100"}/>
                            </div>
                        </Tooltip>
                        <div className={"chat-item d-flex flex-column bg-white rounded-3 px-3 shadow-sm"}>
                            <span className={"text-justify py-3"}>
                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک
                            است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                            تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
                            در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم
                            افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
                            فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و
                            شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                            </span>
                            <small className={"align-self-end"}>
                                10:41
                            </small>
                        </div>
                    </div>

                </div>
            </div>
            <div className={"chat-text-input-section shadow-lg justify-content-between"}>
                <div className={"d-flex flex-row h-100"}>
                    <Tooltip title={"پشتیبانی وبسایت"}>
                        <div className={" align-self-center mx-4"}>
                            <img alt={""} src={"/img/consulting.svg"} className={"company-profile-img"}/>
                        </div>
                    </Tooltip>
                    <TextField
                        multiline={true}
                        value={reply}
                        onChange={(event) => replyHandler(event)}
                        className={"chat-text-input"}
                        label="پیام خود را بنویسید ..."
                        variant="outlined"
                        sx={{
                            "& fieldset": {border: 'none'},
                        }}/>
                    <IconButton onClick={sendHandler}>
                        <SendSharp className={"rotate-180"}></SendSharp>
                    </IconButton>
                </div>
            </div>
        </>
    )
}