import React, { useState } from "react";
import Head from "next/head";
import Script from "next/script";
import Image from 'next/image';
import { navLinks } from "../../utils/navlink";
import Link from "next/link";
import logo from '../../images/logo.png';
import menu from '../../images/menu.png';
import { useRouter } from 'next/router';
import { findInObjArr } from "../../helpers/UtilityHelper";

export default function Layout({ currentPage, children }) {
    const router = useRouter();
    const [isActive, setActive] = useState(false);
    const { asPath } = router;
    const seo_result = findInObjArr(navLinks, asPath, "path");

    const toggleClass = () => {
        setActive(!isActive);
    };
    return (
        <>
            <Head>
                <title>
                    {(seo_result && seo_result.title) ? seo_result.title : "EDI Sales"}
                </title>
                <meta name="description" content={(seo_result && seo_result.description) ? seo_result.description : "EDI Sales"} />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet" />
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
                    crossOrigin="anonymous"
                />
            </Head>

            <Script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
                crossOrigin="anonymous"
            />

            <section className={isActive ? 'container-wrapper open' : 'container-wrapper'} >

                <aside>
                    <div className="logo">
                        <a href="#">
                            <Image src={logo} alt="" width={170} height={54} />
                        </a>
                    </div>
                    <ul className="menus">
                        {navLinks.map((link, index) => {
                            return (
                                <li key={index}><Link href={link.path} className={`${(asPath === link.path) ? "active" : ""}`}>{link.name}</Link></li>
                            );
                        })}
                    </ul>
                </aside>

                <main>

                    <header>
                        <div className="container-fluid h-100">
                            <div className="row h-100">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="left-wrapper d-flex align-items-center">
                                        <Image onClick={toggleClass} src={menu} alt="" width={28} height={28} className="hamburger" />
                                        <div className="logo-and-title d-flex align-items-center">
                                            <h1>{currentPage}</h1>
                                        </div>
                                    </div>
                                    <div className="right-wrapper d-flex align-items-center justify-content-end">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div>{children}</div>
                </main>
            </section>
        </>
    )
}