'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
const Navbar = () => {
    const pathname = usePathname(); // use to get the pathname from the url
    return (
        // Design of the navigation bar
        <nav>
            <ul className='flex p-2 md:p-4 items-center flex-wrap'>
                {/* Home page link with shadow effects */}
                <li className={`text-lg md:text-xl mx-1`}>
                    <Link href='/' className={`mr-5 ${pathname === '/' ? 'py-2.5 bg-yellow-300 rounded-full shadow-lg shadow-yellow-500/75 px-3 flex' : 'flex flex-col items-center hover:bg-blue-300 hover:rounded-lg px-2 py-1 hover:shadow-lg hover:shadow-blue-500/75 text-white hover:text-black'}`}>
                        <div className={`w-6 h-6 relative ${pathname==='/'&&'mr-2'}`}>
                            <Image src={`${pathname==='/'?'/home1.svg':'/home2.svg'}`} fill sizes='auto' alt='Home Icon' loading='eager'/>
                        </div>
                            Home
                    </Link>
                </li>

                {/* About page link with shadow effects */}
                <li className={`text-lg md:text-xl mx-1`}>
                    <Link href='/about' className={`mr-5 ${pathname === '/about' ? 'py-2.5 bg-yellow-300 rounded-full shadow-lg shadow-yellow-500/75 px-3 flex' : 'flex flex-col items-center hover:bg-blue-300 hover:rounded-lg px-2 py-1 hover:shadow-lg hover:shadow-blue-500/75 text-white hover:text-black'}`}>
                        <div className={`w-6 h-6 relative ${pathname==='/about'&&'mr-2'}`}>
                            <Image src={`${pathname==='/about'?'/about1.svg':'/about2.svg'}`} fill sizes='auto' alt='About Icon' loading='eager'/>
                        </div>
                            About
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;