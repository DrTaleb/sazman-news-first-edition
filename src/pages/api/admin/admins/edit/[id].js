export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "PUT") {
        await fetch(`${process.env.SERVER_URL}/panel/admins/${req.query.id}`,{
            method : "PUT",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            },
            body : req.body
        }).then(res => res.json()).then(data =>{
            res.status(200).json(data)
        })

    }else {
        res.setHeader("Allow", ["PUT"]);
        res.status(405).json({massage: "not allowed"})
    }
}
