import {Fragment, useEffect, useState} from "react";
import {Button, Fab} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from '@mui/icons-material/Share';
import {toast} from "react-toastify";
import ReplyIcon from '@mui/icons-material/Reply';
export default function SingleNewsPage({
                                           data,
                                           companyInfo,
                                           otherDataTopFive,
                                           commentList,
                                           otherPostOfCategoryListTopFour
                                       }) {
    const [commentInput, setCommentInput] = useState("")
    const commentInputHandler = (event) => {
        setCommentInput(event.target.value)
    }
    const commentSubmitHandler = async (event) => {
        event.preventDefault()
        await fetch("http://localhost:4000/postComments", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postID: data.ID,
                userID: 2,
                text: commentInput,
                parentID: 0,
                status: "active"
            })
        }).then(res => {
            if (res.status === 200 || res.status === 201) {
                toast.success("کامنت شما با موفقیت ثبت شد")
            } else {
                toast.error("مشکلی در ثبت کامنت شما پیش آمده لطفا دوباره تلاش کنید")
                console.log(res.statusText)
            }
        })

    }
    useEffect(()=>{
        console.log("hi")
    }, [data, companyInfo, otherDataTopFive, commentList, otherPostOfCategoryListTopFour])

    return (
        <Fragment>
            <div className="parent d-flex flex-row justify-content-end">
                <div className="content-div w-100  px-md-4">
                    <div className="content mx-xl-4">
                        <div
                            className="mt-4 px-lg-3 pt-4 d-flex flex-row flex-wrap justify-content-between px-xl-4 px-2">
                            <div
                                className="col-lg-6 col-md-6 col-12 pe-md-2 pe-lg-0 d-flex flex-column justify-content-between">
                                <div className="writer-profile-section d-flex flex-column p-xl-2 gap-xl-3">
                                    <div
                                        className="writer-profile-inner-section d-flex flex-row align-items-center gap-3">
                                        <img className="writer-profile-img rounded-circle"
                                             src={`${companyInfo.logo}`}/>
                                        <div className="writer-user-name">
                                                <span className="fw-bolder text-secondary px-2">
                                                    {companyInfo.companyTitle}
                                                </span>
                                            <span className="border-start border-1 border-secondary px-2">
                                                    {data.publishAt}
                                                </span>
                                            <span className="border-start border-1 border-secondary px-2">
                                                    {/*18:42*/}
                                                </span>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="news-main-title mt-md-3 px-xl-3">
                                    {data.title}
                                </h1>
                                <h5 className="mt-lg-2 mt-xl-0 px-xl-3">
                                    {data.subtitle}
                                </h5>
                                <div className="d-flex flex-row gap-4 justify-content-end pe-3">
                                    <div className="d-flex flex-column align-items-center">
                                        <Fab size={"small"} color={"secondary"} aria-label="like">
                                            <FavoriteIcon fontSize={"small"}/>
                                        </Fab>
                                    </div>
                                    <div className="d-flex flex-column align-items-center">
                                        <Fab size={"medium"} color={"primary"} aria-label="like">
                                            <ShareIcon fontSize={"small"}/>
                                        </Fab>
                                    </div>
                                    <div className="d-flex flex-column align-items-center">
                                        <Fab size={"medium"} color={"secondary"} aria-label="like">
                                            <FavoriteIcon fontSize={"small"}/>
                                        </Fab>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="news-main-img-section">
                                    <img className="w-100 rounded-3" src={data.image}/>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 d-flex flex-row justify-content-between">
                            <div className="col-lg-7 col-12 mt-5">
                                <div className={"content-section px-4 w-100"}>
                                    {data.text}
                                </div>
                                <div className={"blog-tags-place w-100"}></div>
                                <div className="block">
                                    <div className="block-header">
                                        <div className="title">
                                            <h4>نظرات کاربران</h4>
                                            <div
                                                className="tag">{commentList.filter(item => item.parentID === 0).length}</div>
                                        </div>
                                    </div>
                                    <div className="writing col-lg-10 col-12">
                                        <form>
                                            <textarea className="textarea" value={commentInput}
                                                      onInput={(e) => commentInputHandler(e)}/>
                                            <div className="border-1 border-top ">
                                                <div className="d-flex flex-column align-items-end pt-3">
                                                    <Button type={"submit"} onClick={commentSubmitHandler}
                                                            size={"large"}>ارسال</Button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {commentList.reverse().filter(item => item.parentID === 0).map(item =>
                                    <div key={item.ID} className="comment">
                                        <div className="user-banner">
                                            <div className="user">
                                                <div className="avatar">
                                                    <img src={"/img/20220322_155430.jpg"}/>
                                                    <span className="stat grey"></span>
                                                </div>
                                                <span className={"fw-bold"}>محمد جواد طالب</span>
                                                <Button variant="outlined" size={"small"} startIcon={<ReplyIcon />}>
                                                    پاسخ
                                                </Button>
                                                <div
                                                    className="d-flex flex-row gap-2 justify-content-end pe-3 ms-4">
                                                    <div className="d-flex flex-column align-items-center">
                                                        <span>
                                                            <i className="fa fa-reply small text-secondary">
                                                            </i>
                                                        </span>
                                                    </div>
                                                    <div className="d-flex flex-column align-items-center">
                                                        <span>
                                                            <i className="fa fa-thumbs-up small text-secondary">
                                                            </i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn dropdown"><i className="ri-more-line"></i>
                                            </button>
                                        </div>
                                        <div className="ps-4">
                                            <p>
                                                {item.text}
                                            </p>
                                        </div>
                                        {commentList.filter(x => x.parentID === item.ID).map(i =>
                                            <div key={i.ID} className="reply-section offset-1 ps-3">
                                                <div className="reply">
                                                    <div className="user-banner">
                                                        <div className="user">
                                                            <div className="avatar">
                                                                <img src={companyInfo.logo}/>
                                                                <span className="stat green"></span>
                                                            </div>
                                                            <span className={"fw-bold"}>{companyInfo.companyTitle}</span>
                                                        </div>
                                                        <button className="btn dropdown"><i
                                                            className="ri-more-line"></i>
                                                        </button>
                                                    </div>
                                                    <div className="ps-5">
                                                        <div className="d-flex flex-row">
                                                            <a className="tagged-user px-2 py-1">
                                                                پاسخ :
                                                            </a>
                                                        </div>
                                                        <p className="mt-2">
                                                            {i.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="news-chart-parent col-4 px-3 mt-4 d-none d-xl-block">
                                <div className="news-chart px-2 d-flex flex-column gap-3">
                                    <div
                                        className="news-chart-icon d-flex flex-column justify-content-center align-items-center">
                                        <i className="fa fa-angle-down"></i>
                                    </div>
                                    {otherDataTopFive.map(item =>
                                        <div key={item.ID} className="news-chart-item col-12 px-1">
                                            <div className="news-chart-item-inner d-flex flex-column">
                                                <div className="d-flex flex-column gap-2">
                                            <span className="news-chart-item-title">
                                                {item.publishAt}
                                            </span>
                                                    <span className="news-chart-item-text fw-bolder">
                                                {item.title}
                                            </span>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row">
                                                <img className="news-chart-img" src={item.image}/>
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-div px-4">
                <div className="content mx-4">
                    <div className="d-flex flex-row mt-4 px-4 pt-4">
                        <div className="title-parent w-100">
                            <h5 className="main-title- text-capitalize header-title">
                                مطالب مرتبط
                            </h5>
                        </div>
                        <div className="d-flex flex-row justify-content-end col-lg-2 col-md-3 col-5 align-items-center">
                            <a href="#" className="btn btn-outline-secondary border-3">مشاهده همه</a>
                        </div>
                    </div>
                    <div className="suggestion-section w-100 px-4 py-3 gap-3 justify-content-between flex-wrap">
                        {otherPostOfCategoryListTopFour.length ?
                            otherPostOfCategoryListTopFour.map(item =>
                                <div key={item.ID}
                                     className="suggestion-card card d-flex flex-column align-items-center mt-5">
                                    <img src={item.image} className="card-img" alt={""}/>
                                    <div className="card-body">
                                        <h5 className="card-title text-center my-3">
                                            {item.title}
                                        </h5>
                                    </div>
                                </div>
                            ) : <p>هیچ موردی برای نمایش وجود ندارد</p>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export async function getServerSideProps(context) {
    const {params} = context
    // the details of post
    const dataResponse = await fetch(`http://localhost:4000/posts?title=${params.postTitle}`)
    const dataList = await dataResponse.json()
    const data = await dataList[0]
    // ------------------
    // the info of publisher company
    const companyResponse = await fetch(`http://localhost:4000/companies?ID=${data.companyID}`)
    const companyList = await companyResponse.json()
    const companyInfo = {companyTitle: companyList[0].title, logo: companyList[0].logo}
    // ------------------
    // the top 5 other posts of the publisher company
    const otherDataByPublisherResponse = await fetch(`http://localhost:4000/posts?companyID=${data.companyID}`)
    const otherDataByPublisherList = await otherDataByPublisherResponse.json()
    const otherDataTopFive = await otherDataByPublisherList.sort(item => item.viewCount).slice(5)
    //-------------------
    // the comments
    const postCommentsResponse = await fetch(`http://localhost:4000/postComments?postID=${data.ID}`)
    const commentList = await postCommentsResponse.json()
    //-------------------
    // the comments
    const otherPostOfCategoryResponse = await fetch(`http://localhost:4000/posts?categoryID=${data.categoryID}`)
    const otherPostOfCategoryList = await otherPostOfCategoryResponse.json()
    const otherPostOfCategoryListTopFour = otherPostOfCategoryList.sort(item => item.viewCount).slice(4)
    //-------------------
    //the same category posts
    if (!data) {
        return {
            notFound: true
        }
    } else {
        return {
            props: {data, companyInfo, otherDataTopFive, commentList, otherPostOfCategoryListTopFour}
        }
    }
}