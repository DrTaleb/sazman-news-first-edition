import AddTaskIcon from "@mui/icons-material/AddTask";
import RemoveModeratorIcon from "@mui/icons-material/RemoveModerator";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import {useEffect} from "react";
import * as React from "react";
import {ArrowLeft, ForkLeft, Lightbulb} from "@mui/icons-material";
import {Button} from "@mui/material";


export default function UserPanel() {


    return (
        <div className="panel-content-sec-one flex-wrap px-md-4 px-1 container">
            <div className="panel-content-sec-one-right gap-4 panel-w-right-content pe-md-4 order-1 order-md-0">
                <div className="d-flex flex-row align-items-center mt-4 mt-md-0">
                    <div className="panel-title-parent w-100">
                        <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                            داشبورد مدیریت اکانت
                        </h5>
                    </div>
                    <span className=" ms-2">
                            <i className="fa fa-angle-down text-secondary"></i>
                        </span>
                </div>
                <div
                    className="panel-statistic-card-section d-flex flex-row flex-wrap gap-3 gap-lg-0 px-md-4 px-1">
                    <div className="panel-statistic-card col-lg col-sm-5 col-12 panel-statistic-card-main">
                            <span className="text-secondary">
                                تعداد دنبال کننده
                            </span>
                        <span className="fw-bolder">
                                456
                            </span>
                    </div>
                    <div className="panel-statistic-card col-lg col-sm-5 col-12  panel-statistic-card-warning">
                            <span className="text-secondary">
                                تعداد پست
                            </span>
                        <span className="fw-bolder">
                                456
                            </span>
                    </div>
                    <div className="panel-statistic-card col-lg col-sm-5 col-12  panel-statistic-card-danger">
                            <span className="text-secondary">
                                تعداد شرکت ها
                            </span>
                        <span className="fw-bolder">
                                456
                            </span>
                    </div>
                    <div className="panel-statistic-card col-lg col-sm-5 col-12  panel-statistic-card-main">
                            <span className="text-secondary">
                                تعداد نویسندگان فعال
                            </span>
                        <span className="fw-bolder">
                                456
                            </span>
                    </div>
                </div>
                <div className="d-flex flex-row flex-wrap gap-3">
                    <div className="col d-flex flex-column gap-3">
                        <div className="col d-flex flex-row flex-wrap gap-3">
                            <div
                                className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            شرکت های در انتظار تایید
                                        </span>
                                    <span className={"panel-card-icon p-2 rounded"}>
                                       <AddTaskIcon></AddTaskIcon>
                                    </span>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <h4 className="fw-bold mt-4">
                                        34
                                    </h4>
                                </div>
                            </div>
                            <div
                                className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            گزارشات تخلف
                                        </span>
                                    <span className={"panel-card-icon p-2 rounded"}>
                                       <RemoveModeratorIcon></RemoveModeratorIcon>
                                    </span>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <h4 className="fw-bold mt-4">
                                        2
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="col d-flex flex-row flex-wrap gap-3">
                            <div
                                className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            درخواست های پست منتخب
                                        </span>
                                    <span className={"panel-card-icon p-2 rounded"}>
                                       <WysiwygIcon></WysiwygIcon>
                                    </span>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <h4 className="fw-bold mt-4">
                                        23
                                    </h4>
                                </div>
                            </div>
                            <div
                                className="panel-table-card col-sm col-12 d-flex flex-column justify-content-around p-3">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                        <span className="fw-bolder text-secondary">
                                            تیکت ها
                                        </span>

                                    <span className={"panel-card-icon p-2 rounded"}>
                                       <ConnectWithoutContactIcon></ConnectWithoutContactIcon>
                                    </span>
                                </div>
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                    <h4 className="fw-bold mt-4">
                                        56
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-table-card card border-0 col-lg-7 col-12">
                        <div className="card-body">
                            <div
                                className="d-flex flex-row align-items-center mt-4 mt-md-0">
                                <div className="title-parent w-100">
                                    <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize header-title text-secondary">
                                        نمودار ارزیابی پست ها به تفکیک هر پست
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center mt-4 mt-md-0">
                    <div className="panel-title-parent w-100">
                        <h5 className="panel-main-title fw-bold panel-main-title- text-capitalize panel-header-title text-secondary">
                            پلن های خرید
                        </h5>
                    </div>
                    <span className=" ms-2">
                            <i className="fa fa-angle-down text-secondary"></i>
                        </span>
                </div>
                <div className="container mt-100 mt-60 mb-5">
                    <div className="row align-items-md-end align-items-center justify-content-center">
                        <div className="row align-items-md-end align-items-center justify-content-center">
                            <div className="col-xl col-lg-6 col-md-6 col-12 mt-4 pt-2">
                                <div className="pricing text-center rounded overflow-hidden">
                                    <div className="price-header border-bottom pt-5 pb-5">
                                        <h1 className="color-blue">
                                            <Lightbulb fontSize={"large"} className={"color-my-purple"}></Lightbulb>
                                        </h1>
                                        <h5 className="price-title">
                                            برای شروع
                                        </h5>
                                    </div>
                                    <div className="border-bottom py-4">
                                        <h3 className="fw-bold text-capitalize">۱۰۰ هزار تومان</h3>
                                        <h5 className="text-muted mb-0 fw-normal">
                                            ۵ پست
                                        </h5>
                                        <Button variant={"contained"} className={"bg-my-purple mt-4"}>
                                            خرید اشتراک
                                        </Button>
                                    </div>
                                    <div className="pricing-features text-start p-4">
                                        <h5 className={"mb-2"}>مزایای این پلن :</h5>
                                        <ul className="d-flex flex-column gap-2 list-unstyled mt-3 mb-0">
                                            <li className="text-muted">
                                                <ForkLeft className={"me-2"}></ForkLeft>
                                                توانایی انتشار ۵ پست
                                            </li>
                                            <li className="text-muted">
                                                <ForkLeft className={"me-2"}></ForkLeft>
                                                توانایی استخدام نویسندگان
                                            </li>
                                            <li className="text-muted">
                                                <ForkLeft className={"me-2"}></ForkLeft>
                                                توانایی فلان
                                            </li>
                                            <li className="text-muted">
                                                <ForkLeft className={"me-2"}></ForkLeft>
                                                توانایی انتشار ۵ پست
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl col-lg-6 col-md-6 col-12 mt-4 pt-2">
                                <div className="pricing text-center rounded overflow-hidden">
                                    <div className="price-header border-bottom pt-5 pb-5">
                                        <h1 className="color-blue">
                                            <Lightbulb fontSize={"large"} className={"color-my-purple"}></Lightbulb>
                                        </h1>
                                        <h5 className="price-title">
                                            برای شروع
                                        </h5>
                                    </div>
                                    <div className="border-bottom py-4">
                                        <h3 className="fw-bold text-capitalize">۱۰۰ هزار تومان</h3>
                                        <h5 className="text-muted mb-0 fw-normal">
                                            ۵ پست
                                        </h5>
                                        <Button variant={"contained"} className={"bg-my-purple mt-4"}>
                                            خرید اشتراک
                                        </Button>
                                    </div>
                                    <div className="pricing-features text-start p-4">
                                        <h5 className={"mb-2"}>مزایای این پلن :</h5>
                                        <ul className="d-flex flex-column gap-2 list-unstyled mt-3 mb-0">
                                            <li className="text-muted">
                                                <ForkLeft className={"me-2"}></ForkLeft>
                                                توانایی انتشار ۵ پست
                                            </li>
                                            <li className="text-muted">
                                                <ForkLeft className={"me-2"}></ForkLeft>
                                                توانایی استخدام نویسندگان
                                            </li>
                                            <li className="text-muted">
                                                <ForkLeft className={"me-2"}></ForkLeft>
                                                توانایی فلان
                                            </li>
                                            <li className="text-muted">
                                                <ForkLeft className={"me-2"}></ForkLeft>
                                                توانایی انتشار ۵ پست
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl col-lg-6 col-md-6 col-12 mt-4 pt-2">
                                <div className="pricing text-center rounded overflow-hidden">
                                    <div className="price-header border-bottom pt-5 pb-5">
                                        <h1 className="color-blue">
                                            <Lightbulb fontSize={"large"} className={"color-my-purple"}></Lightbulb>
                                        </h1>
                                        <h5 className="price-title">
                                            برای شروع
                                        </h5>
                                    </div>
                                    <div className="border-bottom py-4">
                                        <h3 className="fw-bold text-capitalize">۱۰۰ هزار تومان</h3>
                                        <h5 className="text-muted mb-0 fw-normal">
                                            ۵ پست
                                        </h5>
                                        <Button variant={"contained"} className={"bg-my-purple mt-4"}>
                                            خرید اشتراک
                                        </Button>
                                    </div>
                                    <div className="pricing-features text-start p-4">
                                        <h5 className={"mb-2"}>مزایای این پلن :</h5>
                                        <ul className="d-flex flex-column gap-2 list-unstyled mt-3 mb-0">
                                            <li className="text-muted">
                                                <ForkLeft className={"me-2"}></ForkLeft>
                                                توانایی انتشار ۵ پست
                                            </li>
                                            <li className="text-muted">
                                                <ForkLeft className={"me-2"}></ForkLeft>
                                                توانایی استخدام نویسندگان
                                            </li>
                                            <li className="text-muted">
                                                <ForkLeft className={"me-2"}></ForkLeft>
                                                توانایی فلان
                                            </li>
                                            <li className="text-muted">
                                                <ForkLeft className={"me-2"}></ForkLeft>
                                                توانایی انتشار ۵ پست
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl col-lg-6 col-md-6 col-12 mt-4 pt-2">
                                <div className="pricing text-center rounded overflow-hidden">
                                    <div className="price-header border-bottom pt-5 pb-5">
                                        <h1 className="color-blue">
                                            <Lightbulb fontSize={"large"} className={"color-my-purple"}></Lightbulb>
                                        </h1>
                                        <h5 className="price-title">
                                            برای شروع
                                        </h5>
                                    </div>
                                    <div className="border-bottom py-4">
                                        <h3 className="fw-bold text-capitalize">۱۰۰ هزار تومان</h3>
                                        <h5 className="text-muted mb-0 fw-normal">
                                            ۵ پست
                                        </h5>
                                        <Button variant={"contained"} className={"bg-my-purple mt-4"}>
                                            خرید اشتراک
                                        </Button>
                                    </div>
                                    <div className="pricing-features text-start p-4">
                                        <h5 className={"mb-2"}>مزایای این پلن :</h5>
                                        <ul className="d-flex flex-column gap-2 list-unstyled mt-3 mb-0">
                                            <li className="text-muted">
                                                <ForkLeft className={"me-2"}></ForkLeft>
                                                توانایی انتشار ۵ پست
                                            </li>
                                            <li className="text-muted">
                                                <ForkLeft className={"me-2"}></ForkLeft>
                                                توانایی استخدام نویسندگان
                                            </li>
                                            <li className="text-muted">
                                                <ForkLeft className={"me-2"}></ForkLeft>
                                                توانایی فلان
                                            </li>
                                            <li className="text-muted">
                                                <ForkLeft className={"me-2"}></ForkLeft>
                                                توانایی انتشار ۵ پست
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}