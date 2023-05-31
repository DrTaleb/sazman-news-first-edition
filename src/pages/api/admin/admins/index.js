export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "GET"){
        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/admins?page=1&limit=15`,{
            method : "GET",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            }
        })
        const data = await dataResponse.json()
        res.status(200).json(data)
    }else if (req.method === "POST") {
        await fetch(`${process.env.SERVER_URL}/panel/admins`,{
            method : "POST",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            },
            body : req.body
        }).then(res => res.json()).then(data =>{
            console.log(data)
            res.status(200).json(data)
        })

    }else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}
