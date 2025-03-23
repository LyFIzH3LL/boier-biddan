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

    const handleMenuToggle = (isOpen: boolean) => {
        setIsMenuOpen(isOpen);
    };

    return (
        <Navbar maxWidth="full" className="relative z-50">
            {/* Left: Logo & Hamburger */}
            <NavbarContent justify="start" className="flex items-center p-2">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                    className="sm:hidden"
                    onClick={() => handleMenuToggle(!isMenuOpen)}
                />
                <NavbarBrand className="flex items-center">
                    <Image src="/logo.svg" alt="logo" width={40} height={40} />
                    <h2 className="font-noto_serif_bengali font-bold text-primary ml-3 text-xl sm:text-2xl md:text-2xl lg:text-3xl">
                        বইয়ের বিদ্বান
                    </h2>
                </NavbarBrand>
            </NavbarContent>

            {/* Center: Desktop Menu */}
            <NavbarContent justify="center" className="hidden sm:flex">
                {MenuList.map((item, index) => (
                    <NavbarItem
                        key={index}
                        className="text-xl font-medium text-primary hover:text-blue-50 mx-2"
                    >
                        <Link href={item.path}>{item.name}</Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            {/* Right: Button + Clerk User Button */}
            <NavbarContent justify="end" className="flex items-center">
                <Link href="/dashboard">
                    <Button color="primary" className="mr-2">
                        {isSignedIn ? "Dashboard" : "Get Started"}
                    </Button>
                </Link>
                <UserButton />
            </NavbarContent>

            {/* Mobile Menu: Always Mounted, visibility toggled */}
            <NavbarMenu
                className={`sm:hidden absolute top-full left-0 w-full bg-white shadow-md transition-all duration-300 ${isMenuOpen ? "block" : "hidden"
                    }`}
            >
                {MenuList.map((item, index) => (
                    <NavbarMenuItem key={index} className="p-2 border-b border-gray-100">
                        <Link href={item.path} onClick={() => setIsMenuOpen(false)}>
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}

export default Header;
