import cookie from "cookie";

export default async function Handler(req, res) {
    if (req.method === "POST") {
        await fetch("https://newsapi.deltagroup.ir/panel/auth",{
            method : "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body : req.body
        }).then(response => response.json()).then(data =>{
            if (data.status && data.token){
                res.setHeader('Set-Cookie', cookie.serialize('authToken', data.token, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 7 ,// 1 week
                    path : "/"
                }));
            }
            res.status(200).json(data)
        })

    } else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage: "not allowed"})
    }
}
