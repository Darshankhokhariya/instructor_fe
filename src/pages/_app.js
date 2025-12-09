import React from 'react'
import Head from 'next/head'
import '../app/globals.css'
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from 'react-hot-toast';

export default function MyApp({ Component, pageProps }) {

    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         const authToken = localStorage.getItem("token");
    //         if (!authToken) {
    //             router.push("/login");
    //         }
    //         // else {
    //         //     router.push("/superadmin/dashboard");
    //         // }
    //     }
    // }, [router.pathname]);

    return (
        <>
            <Head>
                {/* PWA & App Metadata */}
                <meta name="application-name" content="DVN Finance" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="DVN Finance" />
                <meta name="description" content="Smart Finance and Loan Management Platform" />
                <meta name="theme-color" content="#0d9488" />
                <link rel="manifest" href="/manifest.json" />
                {/* Icons */}
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                {/* Optional: Default Android icons */}
                <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
                <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
                {/* Fonts */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <Provider store={store}>
                <Toaster position="top-right" reverseOrder={false} />
                <Component {...pageProps} />
            </Provider>
        </>
    )
}