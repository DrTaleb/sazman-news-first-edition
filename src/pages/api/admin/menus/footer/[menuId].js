export default async function Handler(req, res) {
    const authToken = req.cookies.authToken
    if (req.method === "GET"){
        const dataResponse = await fetch(`https://newsapi.deltagroup.ir/panel/menus?type=footer&page=${req.query.menuId}&limit=10`,{
            method : "GET",
            headers : {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            }
        })
        const data = await dataResponse.json()
        res.status(200).json(data)
    }else if (req.method === "PUT") {
        await fetch(`https://newsapi.deltagroup.ir/panel/menus/${req.query.menuId}?type=footer`,{
            method : "PUT",
            credentials : 'include',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            },
            body : req.body
        }).then(res => res.json()).then(data =>{
            res.status(200).json({massage : data})
        })
    } else if (req.method === "DELETE") {
        await fetch(`https://newsapi.deltagroup.ir/panel/menus/${req.query.menuId}?type=footer`,{
            method : "DELETE",
            credentials : 'include',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization' : `Bearer ${authToken}`
            }
        }).then(res => res.json()).then(data =>{
            res.status(200).json({massage : data})
        })

    }else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}
