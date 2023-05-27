import PublicLayout from "@/Components/PublicLayout";
import {AuthProvider} from "@/Contexts/AuthContext";
import {Router, useRouter} from "next/router";
import PanelLayout from "@/Components/panel/PanelLayout/PanelLayout";
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import "../styles/globals.css"
import "../styles/megaMenu.css"
import "../styles/Panel.css"
import {createTheme, ThemeProvider} from "@mui/material";
import {CacheProvider} from "@emotion/react";
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import MenuContext from "@/Contexts/MenuContext";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import Nprogress from "nprogress";
import axios from "axios";


axios.defaults.baseURL = 'https://newsapi.deltagroup.ir';
Router.events.on('routeChangeStart', ()=>{
    Nprogress.start();
})
Router.events.on('routeChangeComplete', ()=>{
    Nprogress.done();
})
export default function App({Component, pageProps, props}) {
    const routerName = useRouter()
    const userAdminRoute = routerName.pathname.includes("user-panel")
    const adminRoute = routerName.pathname.includes("admin")
    const notFoundRoute = routerName.pathname.includes("/404")

    const theme = createTheme({
        direction: 'rtl',
        typography: {
            "fontFamily": `YekanBakh`
        }
    });
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });


    return (
        <AuthProvider>
            <MenuContext.Provider value={props.data}>
                <>
                    {
                        notFoundRoute &&
                        <Component {...pageProps} />
                    }
                    {
                        routerName.pathname.includes("/login")  &&
                        <CacheProvider value={cacheRtl}>
                            <ThemeProvider theme={theme}>
                                <Component {...pageProps} />
                            </ThemeProvider>
                        </CacheProvider>
                    }
                    {
                        userAdminRoute || adminRoute &&
                        <CacheProvider value={cacheRtl}>
                            <ThemeProvider theme={theme}>
                                <PanelLayout>
                                    <ToastContainer></ToastContainer>
                                    <Component {...pageProps} />
                                </PanelLayout>
                            </ThemeProvider>
                        </CacheProvider>
                    }
                    {
                        !userAdminRoute && !adminRoute && !notFoundRoute &&

                        <CacheProvider value={cacheRtl}>
                            <ThemeProvider theme={theme}>
                                <PublicLayout>
                                    <ToastContainer></ToastContainer>
                                    <Component {...pageProps} />
                                </PublicLayout>
                            </ThemeProvider>
                        </CacheProvider>
                    }
                </>
            </MenuContext.Provider>
        </AuthProvider>
    )
}

App.getInitialProps = async () => {
    const dataResponse = await fetch(`https://newsapi.deltagroup.ir/front/settings`)
    const data = await dataResponse.json()
    if (data.status === false) {
        return {
            notFound: true
        }
    }
    return {props: {data}};
}
