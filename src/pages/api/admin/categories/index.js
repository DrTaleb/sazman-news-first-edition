export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "POST") {
        console.log(req.body)
        await fetch(`https://newsapi.deltagroup.ir/panel/categories`,{
            method : "POST",
            credentials : 'include',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            },
            body : req.body
        }).then(res => res.json()).then(data =>{
            res.status(200).json({massage : data})
        })

    }else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}
