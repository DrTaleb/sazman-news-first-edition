import Container from "react-bootstrap/Container";
import {Button} from "@mui/material";
import {useRouter} from "next/router";

export default function slideView({data}){
    console.log(data)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    const returnLastPage = ()=> {
        router.push("/admin/sliders/1")
    }

    return(
        <Container>
            <div className={"w-100"}>
                <Button variant={"outlined"} onClick={returnLastPage}>بازگشت به صفحه قبل</Button>
                <div className={"mt-4 d-flex flex-row gap-2 align-items-center"}>
                    <span>
                    تایتل :
                </span>
                    <span className={"fw-bold my-3"}>
                    {data.data.title}
                </span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={""} className={"w-100 rounded mt-3"} src={`https://newsapi.deltagroup.ir/${data.data.image}`}/>
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