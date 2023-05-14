export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "GET"){
        const dataResponse = await fetch(`https://newsapi.deltagroup.ir/panel/companies?page=${req.query.companyId}&limit=10&verify_status=0`,{
            method : "GET",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            }
        })
        const data = await dataResponse.json()
        res.status(200).json(data)
    }else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}
