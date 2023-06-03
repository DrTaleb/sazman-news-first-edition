
import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
// import ApexLineChart from "@/Components/charts/ApexLineChart";
// import ApexMixedChart from "@/Components/charts/ApexMixedChart";

export default function Monitoring(){

    const postItems = [
        ""
    ]



    return(
        <div className={"px-md-4"}>
            <div className={"container"}>
                <div
                    className="panel-statistic-card-section d-flex flex-row flex-wrap gap-3 gap-lg-0 px-md-4 px-1">
                    <div className="panel-statistic-card col-lg col-sm-5 col-12 panel-statistic-card-main">
                            <span className="text-secondary">
                                تعداد فالوور
                            </span>
                        <span className="fw-bolder">
                                456
                            </span>
                    </div>
                    <div className="panel-statistic-card col-lg col-sm-5 col-12  panel-statistic-card-warning">
                            <span className="text-secondary">
                                میانگین بازدید هر پست
                            </span>
                        <span className="fw-bolder">
                                456
                            </span>
                    </div>
                    <div className="panel-statistic-card col-lg col-sm-5 col-12  panel-statistic-card-danger">
                            <span className="text-secondary">
                                میانگین لایک هر پست
                            </span>
                        <span className="fw-bolder">
                                456
                            </span>
                    </div>
                    <div className="panel-statistic-card col-lg col-sm-5 col-12  panel-statistic-card-main">
                            <span className="text-secondary">
                                میانکین کامنت هر پست
                            </span>
                        <span className="fw-bolder">
                                456
                            </span>
                    </div>
                </div>
                <div className={"panel-statistic-card mt-3 p-md-4"}>
                    <div className="service-section-opener d-flex flex-row">
                        <div className="panel-title-parent w-100 mb-4">
                            <h5 className="panel-main-title- text-capitalize panel-header-title text-secondary">
                                آمار لایک - بازدید - کامنت به تفکیک هر پست
                            </h5>
                        </div>
                        <span className="mt-1 ms-2">
                        <i className="fa fa-angle-down text-secondary"></i>
                    </span>
                    </div>
                    {/*<ApexMixedChart/>*/}
                </div>
                <div className={"mt-3"}>
                    <div className={"d-flex flex-row flex-wrap gap-3"}>
                        <div className="panel-table-card col-lg col-12 d-flex flex-column justify-content-around p-3">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                            <span className="fw-bolder text-secondary">
                                تعداد پست ها
                            </span>
                                <span  className={"panel-card-icon p-2 rounded"}>
                                <ArtTrackIcon fontSize={"small"}></ArtTrackIcon>
                            </span>
                            </div>
                            <div className="d-flex flex-row justify-content-between align-items-center mt-4">
                                <h4 className="fw-bold">
                                    56
                                </h4>
                            </div>
                        </div>
                        <div className="panel-table-card col-lg col-12 d-flex flex-column justify-content-around p-3">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                            <span className="fw-bolder text-secondary">
                                بازدید از پروفایل
                            </span>
                                <span  className={"panel-card-icon p-2 rounded"}>
                                <RemoveRedEyeIcon fontSize={"small"}></RemoveRedEyeIcon>
                            </span>
                            </div>
                            <div className="d-flex flex-row justify-content-between align-items-center mt-4">
                                <h4 className="fw-bold">
                                    56
                                </h4>
                            </div>
                        </div>
                        <div className="panel-table-card col-lg col-12 d-flex flex-column justify-content-around p-3">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                            <span className="fw-bolder text-secondary">
                                بازدید از پروفایل
                            </span>
                                <span  className={"panel-card-icon p-2 rounded"}>
                                <RemoveRedEyeIcon fontSize={"small"}></RemoveRedEyeIcon>
                            </span>
                            </div>
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <h4 className="fw-bold">
                                    56
                                </h4>
                                <span className="text-danger pe-2">
                                <KeyboardArrowDownIcon fontSize={"small"}></KeyboardArrowDownIcon>
                                ۲۳%
                            </span>
                            </div>
                        </div>
                        <div className="panel-table-card col-lg col-12 d-flex flex-column justify-content-around p-3">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                            <span className="fw-bolder text-secondary">
                                بازدید از پروفایل
                            </span>
                                <span  className={"panel-card-icon p-2 rounded"}>
                                <RemoveRedEyeIcon fontSize={"small"}></RemoveRedEyeIcon>
                            </span>
                            </div>
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <h4 className="fw-bold">
                                    56
                                </h4>
                                <span className="text-danger pe-2">
                                <KeyboardArrowDownIcon fontSize={"small"}></KeyboardArrowDownIcon>
                                ۲۳%
                            </span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={"panel-statistic-card mt-3 p-md-4"}>
                    <div className="service-section-opener d-flex flex-row">
                        <div className="panel-title-parent w-100 mb-4">
                            <h5 className="panel-main-title- text-capitalize panel-header-title text-secondary">
                                آمار نسبت لایک به بازدید به تفکیک هر پست
                            </h5>
                        </div>
                        <span className="mt-1 ms-2">
                        <i className="fa fa-angle-down text-secondary"></i>
                    </span>
                    </div>
                    {/*<ApexLineChart></ApexLineChart>*/}
                </div>
            </div>
        </div>
    )
}