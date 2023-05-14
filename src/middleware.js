import {NextResponse} from "next/server";
import  { NextRequest } from 'next/server'
export function middleware(req,res){
        const authToken = req.cookies.get("authToken")
        if (req.nextUrl.pathname.startsWith("/admin")){
                if (!authToken){
                        return NextResponse.redirect("http://localhost:3000/login")
                }
        }
        if (authToken){
                if (req.nextUrl.pathname.startsWith("/login")){
                        return NextResponse.redirect("http://localhost:3000/")
                }
        }
}