import {createContext} from "react";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {


    // register

    const login = async (otp , mobile) => {
        let massage
        await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                type: "login2",
                mobile: mobile,
                otp : otp
            })
        }).then(res => res.json()).then(data => massage = data.status)
        console.log(massage)
        return massage
    }

    //login
    const SendCode = async (user) => {
        let isMassageSent;
        await fetch("http://localhost:3000/api/auth/login", {
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
        await fetch("http://localhost:3000/api/auth/logout", {
            method: "POST",
        }).then(res => res.json()).then(data => massage = data)
        console.log(massage)
        return massage
    }
    //check if user logged in

    const isLoggedIn = async (user) => {
        return true
    }


    return (

        <AuthContext.Provider value={{login, SendCode, logOut, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )

}
export default AuthContext