import axios from "axios";

export default async function Handler(req,res){
    if (req.method === "GET"){
        const response = await fetch("http://localhost:4000/menu")
        res.status(200).json(response)
    }else {
        res.setHeader("Allow", ["post"]);
        res.status(405).json({massage : "not allowed"})
    }
}