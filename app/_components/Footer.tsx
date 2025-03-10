import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4 text-center">
            <div className="container mx-auto">
                <p>
                    Made by:
                </p>
                <div className="flex justify-center space-x-4 mt-2">
                    {/* Profile 1 */}
                    <a
                        href="https://github.com/ShanaxRules" // Replace with Shahnawaz's GitHub profile link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-blue-400 hover:underline"
                    >
                        <Image src="/github-mark-white.png" alt="GitHub" width={20} height={20} /> {/* Replace with your image path */}
                        <span>S.M Shahnawaz Hossain</span>
                    </a>

                    {/* Profile 2 */}
                    <a
                        href="https://github.com/LyFIzH3LL" // Replace with Snahashis's GitHub profile link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-blue-400 hover:underline"
                    >
                        <Image src="/github-mark-white.png" alt="GitHub" width={20} height={20} /> {/* Replace with your image path */}
                        <span>Snahashis Sarker Arnob</span>
                    </a>
                </div>
                <p className="mt-4">
                    All rights reserved 2025.
                </p>
            </div>
        </footer>
    );
}

export default Footer;