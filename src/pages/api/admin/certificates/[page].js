export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "GET"){
        const dataResponse = await fetch(`${process.env.SERVER_URL}/panel/certificates?page=${req.query.page}&limit=10&verify_status=1`,{
            method : "GET",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            }
        })
        const data = await dataResponse.json()
        res.status(200).json(data)
    }else {
        res.setHeader("Allow", ["get"]);
        res.status(405).json({massage: "not allowed"})
    }
}
