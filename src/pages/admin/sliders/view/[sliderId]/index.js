import Container from "react-bootstrap/Container";
import {Alert, Breadcrumbs, Button} from "@mui/material";
import {useRouter} from "next/router";
import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import {FileUploader} from "react-drag-drop-files";

export default function SliderId({data}){
    const router = useRouter()
    const returnLastPage = ()=> {
        router.push("/admin/sliders/1")
    }
    return(
        <Container className={"rounded-4"}>
            <div className={"d-flex flex-row justify-content-center mt-4"}>
                <Col xs={11} sm={11} md={8} lg={7} xl={7} className={"shadow-sm bg-white rounded-4"}>
                    <form>
                        <div className={"d-flex flex-column align-items-center gap-3 py-5 px-sm-3"}>
                            <TextField
                                className={"w-75"}
                                label="عنوان"
                                variant="outlined"
                                value={data.data.title}>
                            </TextField>
                            <img alt={""} className={"w-100 rounded mt-3"} src={`https://newsapi.deltagroup.ir/${data.data.image}`}/>
                        </div>
                    </form>
                </Col>
            </div>
        </Container>
    )
}

export async function getServerSideProps (context){
    const {params,req} = context
    const authToken = req.cookies.authToken
    console.log(params.sliderId)
    const response = await fetch(`https://newsapi.deltagroup.ir/panel/sliders/${params.sliderId}`,{
        method : "GET",
        credentials : 'include',
        headers: {
            // 'Content-Type': 'application/json; charset=UTF-8',
            'Authorization' : `Bearer ${authToken}`
        },
    })
    const data = await response.json()
    return{
        props : {data}
    }

}