import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import {SendSharp} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {useCallback, useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {Button, Skeleton} from "@mui/material";

function TextSection({text, time}) {
    return (
        <>
            <div className={"d-flex flex-row gap-3 justify-content-end"}>
                <div className={"chat-item d-flex flex-column bg-white rounded-3 px-2 shadow-sm"}>
                            <pre className={"text-justify mt-2"}>
                                {text}
                            </pre>
                    <small className={"align-self-end"}>
                        {time}
                    </small>
                </div>
                <Tooltip title={"پشتیبانی وبسایت"}>
                    <div className={"company-profile-img align-self-end  bg-transparent"}>
                        <img alt={""} src={"/img/consulting.svg"} className={"w-100 bg-transparent"}/>
                    </div>
                </Tooltip>
            </div>
        </>
    );
}


export default function Answer() {
    const router = useRouter()
    const scrollRef = useRef()
    const [DATA, setDATA] = useState({})
    const [getData, setGetData] = useState(false)

    useEffect(() => {
        fetch(`${process.env.LOCAL_URL}/api/admin/tickets/single-ticket/${router.query.ticketId}`)
            .then(res => res.json())
            .then(data => {
                setDATA(data)
                console.log(data)
            })

    }, [getData])


    const [reply, setReply] = useState("")
    const replyHandler = (event) => {
        setReply(event.target.value)
    }
    const [massageList, setMassageList] = useState([])

    const sendHandler = () => {
        if (reply.replaceAll(" ", "").length > 0){
            setMassageList([...massageList, {text : reply, time : "10"}])
            setReply("")
            scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const goToWriter = (id) => {
        router.push(`/admin/writers/view/${id}`)
    }

    if (DATA.status) {
        return (
            <>
                <div className={"container mb-5"}>
                    <div className={"chat-box d-flex flex-column gap-3 mb-5"}>
                        <div className={"align-self-center mb-3"}>
                            <div className={"bg-white shadow-sm rounded-3 p-2"}>
                            <span>
                            موضوع : {DATA.data.subject}
                        </span>
                            </div>
                        </div>
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
                                <div className={"company-profile-img align-self-end  bg-transparent"}>
                                    <img alt={""} src={"/img/consulting.svg"} className={"w-100  bg-transparent"}/>
                                </div>
                            </Tooltip>
                        </div>
                        {
                            DATA.data.replies.map(item =>
                                item.user.type === "writer" ?
                                    <div key={item.id} className={"d-flex flex-row gap-2"}>
                                        <Tooltip title={"کاربر"}>
                                            <div
                                                className={"company-profile-img bg-transparent align-self-end  bg-transparent"}>
                                                <img alt={""} src={"/img/1.webp"} className={"w-100  bg-transparent"}/>
                                            </div>
                                        </Tooltip>
                                        <div
                                            className={"chat-item d-flex flex-column bg-white rounded-3 px-2 shadow-sm"}>
                                            <Tooltip title={"مشاهده اکانت"}>
                                                <Button onClick={() => goToWriter(item.user.id)} size={"small"}
                                                        className={"align-self-start mt-2"}>
                                                    {item.user.firstname} {item.user.lastname}
                                                </Button>
                                            </Tooltip>
                                            <pre className={"text-justify py-2"}>
                                                           {item.text}
                                            </pre>
                                            <small className={"align-self-end"}>
                                                10:41
                                            </small>
                                        </div>
                                    </div>
                                    :
                                    <div key={item.id} className={"d-flex flex-row gap-3 justify-content-end"}>
                                        <div
                                            className={"chat-item d-flex flex-column bg-white rounded-3 px-3 shadow-sm"}>
                                                <pre className={"text-justify pt-3"}>
                                                    {item.text}
                                                </pre>
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
                            )
                        }
                        {
                            massageList.map(item =>
                                <TextSection key={item.text} text={item.text} time={item.time}></TextSection>
                            )
                        }
                    </div>
                    <div className={"py-5"} ref={scrollRef}></div>
                </div>
                <div className={"chat-text-input-section shadow-lg justify-content-between"}>
                    <div className={"d-flex flex-row h-100 py-2"}>
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
                        <IconButton onClick={sendHandler} className={"align-self-center"}>
                            <SendSharp className={"rotate-180"}></SendSharp>
                        </IconButton>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className={"container mb-5"}>
                    <div className={"chat-box d-flex flex-column gap-3 mb-5"}>
                        <div className={"align-self-center mb-3"}>
                            <Skeleton animation={"wave"} height={30} width={200}></Skeleton>
                        </div>
                        <div className={"d-flex flex-row gap-3 justify-content-end"}>
                            <div className={"chat-item d-flex flex-column bg-white rounded-3 px-3 shadow-sm"}>
                            <span className={"text-justify py-3"}>
                                  <Skeleton animation={"wave"} height={30} width={200}></Skeleton>
                            </span>
                            </div>
                            <Tooltip title={"پشتیبانی وبسایت"}>
                                <div className={"company-profile-img align-self-end"}>
                                    <Skeleton variant={"circular"} animation={"wave"} height={30} width={30}></Skeleton>
                                </div>
                            </Tooltip>
                        </div>
                        <div className={"d-flex flex-row gap-2"}>
                            <Tooltip title={"کاربر"}>
                                <div className={"company-profile-img bg-transparent align-self-end"}>
                                    <Skeleton variant={"circular"} animation={"wave"} height={30} width={30}></Skeleton>
                                </div>
                            </Tooltip>
                            <div className={"chat-item d-flex flex-column bg-white rounded-3 px-3 shadow-sm"}>
                            <span className={"text-justify py-3"}>
                                  <Skeleton animation={"wave"} height={20} width={250}></Skeleton>
                                  <Skeleton animation={"wave"} height={20} width={250}></Skeleton>
                                  <Skeleton animation={"wave"} height={20} width={250}></Skeleton>
                                  <Skeleton animation={"wave"} height={20} width={250}></Skeleton>
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
}