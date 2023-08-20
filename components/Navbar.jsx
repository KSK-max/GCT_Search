import React from "react";
import { Navbar, NavbarBrand, Image, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function Nav() {
    return (
        <Navbar className="dark text-foreground bg-background">
            <NavbarBrand>
        <p className="font-serif font-extrabold text-inherit mx-auto text-xl">Grand Circle Travel AI enabled Prototype GCT by BI Solutions</p>
                <div className="flex items-center justify-between">
                    {/* <div className="flex items-center gap-4">
                        <Image
                            src="/gct.jpg"
                            width={300}
                            height={300}
                            alt="icon changed"
                        />
                    </div> */}
                </div>
            </NavbarBrand>
        </Navbar>
    );

}


