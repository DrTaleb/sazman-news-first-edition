import {createContext, useEffect, useState} from "react";
import {useRouter} from "next/router";




const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const router = useRouter()

    const [userData , setUserData] = useState({
            firstname : "",
            lastname : "",
            companies : [],
    });

    const getUserData = async () => {
        let massage;
        try {
            await fetch(`${process.env.LOCAL_URL}/api/auth/useinfo`, {
                method: "GET",
            }).then(res => res.json()).then(data =>{
                if (data.status){
                    massage = data.data.userable
                }else {
                    massage = {
                            firstname : "",
                            lastname : "",
                            companies : [],
                    }
                }
            })
            await setUserData(massage)
        }catch {
            setUserData(userData)
        }
    }
    useEffect(()=>{
       getUserData()
    },[])
    // register
    const login = async (otp , mobile) => {
        let massage
        await fetch(`${process.env.LOCAL_URL}/api/auth/login`, {
            method: "POST",
            body: JSON.stringify({
                type: "login2",
                mobile: mobile,
                otp : otp
            })
        }).then(res => res.json()).then(data => massage = data.status)
        return massage
    }

    //login
    const SendCode = async (user) => {
        let isMassageSent;
        await fetch(`${process.env.LOCAL_URL}/api/auth/login`, {
            method: "POST",
            body: JSON.stringify({
                type: "login1",
                mobile: user
            })
        }).then(res => res.json()).then(data => isMassageSent = data.status)
        return isMassageSent
    }

    //logOut

    const logOut = async () => {
        let massage
        await fetch(`${process.env.LOCAL_URL}/api/auth/logout`, {
            method: "POST",
        }).then(res => res.json()).then(data => massage = data)
        router.push("/")
    }
    //check if user logged in

    const isLoggedIn = async (user) => {
        return true
    }

    return (

        <AuthContext.Provider value={{login, SendCode, logOut, userData}}>
            {children}
        </AuthContext.Provider>
    )

}
export default AuthContext