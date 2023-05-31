import AddTaskIcon from "@mui/icons-material/AddTask";
import RemoveModeratorIcon from "@mui/icons-material/RemoveModerator";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import {useEffect} from "react";




export default function UserPanel(){




    return(
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
                                    <span  className={"panel-card-icon p-2 rounded"}>
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
                                    <span  className={"panel-card-icon p-2 rounded"}>
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
                                    <span  className={"panel-card-icon p-2 rounded"}>
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

                                    <span  className={"panel-card-icon p-2 rounded"}>
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
            </div>
        </div>
    )
}