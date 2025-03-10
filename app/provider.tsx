
import { ClerkProvider } from "@clerk/nextjs";
import { HeroUIProvider } from "@heroui/react";
import { div } from "framer-motion/client";
import React from "react";
import Header from "./_components/Header";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./_components/Footer";
function Provider({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <HeroUIProvider>
                <Header />
                {children}
                <Footer />
                <ToastContainer />
            </HeroUIProvider>
        </ClerkProvider>
    )
}

export default Provider