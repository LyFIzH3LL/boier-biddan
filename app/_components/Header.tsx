"use client"
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@heroui/react'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'
function Header() {



    const { user, isSignedIn } = useUser();


    const MenuList = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Create Story',
            path: '/create-story'
        },
        {
            name: 'Explore Stories',
            path: '/explore'
        },
        {
            name: 'Contact Us',
            path: '/about-us'
        }
    ]


    const [isMenuOpen, setIsMenuOpen] = useState(false);








    return (
        <Navbar maxWidth='full' onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
                    className='sm:hidden'
                />


                <NavbarBrand>
                    <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
                    <h2 className='font-noto_serif_bengali font-bold text-primary ml-3 '>
                        বইয়ের বিদ্বান
                    </h2>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent justify='center' className='hidden sm:flex'>
                {MenuList.map((item, index) => (
                    <NavbarItem key={index} className='text-xl font-medium text-primary hover:underline mx-2'>
                        <Link key={index} href={item.path}>
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify='end'>
                <Link href={'/dashboard'}>
                    <Button color='primary'>
                        {isSignedIn ? 'Dashboard' :
                            'Get Started'}

                    </Button>
                </Link>
                <UserButton />

            </NavbarContent>
            <NavbarMenu>
                {MenuList.map((item, index) => (
                    <NavbarMenuItem key={index}>
                        <Link href={item.path}>
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}

export default Header