"use client";
import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@heroui/react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

function Header() {
    const { user, isSignedIn } = useUser();

    const MenuList = [
        { name: "Home", path: "/" },
        { name: "Create Story", path: "/create-story" },
        { name: "Explore Stories", path: "/explore" },
        { name: "Contact Us", path: "/about-us" },
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        //console.log("handleMenuToggle called");
        setIsMenuOpen(!isMenuOpen);
        //console.log("isMenuOpen set to:", !isMenuOpen);
    };

    return (
        <Navbar maxWidth="full">
            <NavbarContent justify="start" className="flex items-center p-2">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                    className="sm:hidden"
                    onPress={handleMenuToggle} //removed the !isMenuOpen from here.
                />
                <NavbarBrand className="flex items-center">
                    <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
                    <h2 className="font-noto_serif_bengali font-bold text-primary ml-3 text-xl sm:text-2xl md:text-2xl lg:text-3xl">
                        বইয়ের বিদ্বান
                    </h2>
                </NavbarBrand>
            </NavbarContent>

            {/* Desktop Menu */}
            <NavbarContent justify="center" className="hidden md:flex">
                {MenuList.map((item, index) => (
                    <NavbarItem
                        key={index}
                        className="text-xl font-medium text-primary hover:text-blue-50 mx-2"
                    >
                        <Link href={item.path}>{item.name}</Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            {/* Right-aligned Button and User Button */}
            <NavbarContent justify="end" className="flex items-center">
                <Link href={"/dashboard"}>
                    <Button color="primary">
                        {isSignedIn ? "Dashboard" : "Get Started"}
                    </Button>
                </Link>
                <UserButton />
            </NavbarContent>

            {/* Mobile Menu - Only visible when menu is open */}
            {isMenuOpen && (
                <NavbarMenu className="sm:block">
                    {MenuList.map((item, index) => (
                        <NavbarMenuItem key={index}>
                            <Link href={item.path}>{item.name}</Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            )}
        </Navbar>
    );
}

export default Header;