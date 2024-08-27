'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const Navbar = () => {
    const pathname = usePathname(); // use to get the pathname from the url
    return (
        // Design of the navigation bar
        <nav>
            <ul className='flex bg-gray-700 p-2 md:p-4 items-center flex-wrap'>
                {/* Home page link with shadow effects */}
                <Link href='/' className={`mr-5 ${pathname === '/' ? 'py-2.5 bg-yellow-300 rounded-full shadow-lg shadow-yellow-500/75 px-3 flex items-center' : 'flex flex-col items-center hover:bg-blue-300 hover:rounded-lg px-2 py-1 hover:shadow-lg hover:shadow-blue-500/75 text-white hover:text-black'}`}>
                    <i className={`fa-solid fa-house fa-lg md:fa-xl mx-1 ${pathname !== '/' && 'my-3'}`}></i>
                    <li className='text-base md:text-xl mx-1'>Home</li>
                </Link>

                {/* About page link with shadow effects */}
                <Link href='/about' className={`ml-5 ${pathname === '/about' ? 'py-2.5 bg-yellow-300 rounded-full shadow-lg shadow-yellow-500/75 px-3 flex items-center' : 'flex flex-col items-center hover:bg-blue-300 hover:rounded-lg px-2 py-1 hover:shadow-lg hover:shadow-blue-500/75 text-white hover:text-black'}`}>
                    <i className={`fa-solid fa-user-group fa-lg md:fa-xl mx-1 ${pathname !== '/about' && 'my-3'}`}></i>
                    <li className='text-base md:text-xl mx-1'>About</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Navbar;