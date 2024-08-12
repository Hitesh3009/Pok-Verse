import React from 'react'
import Link from 'next/link'
const Footer = () => {
    return (
        <div className='bg-black p-3'>
            <h2 className='text-white text-center text-2xl'>Developed By <em className='font-bold'>Hitesh Eknath Bhosale</em></h2>
            <div className='h-auto w-full flex md: justify-center py-5'>
                <div className="w-[70vw] h-44 items-center flex lg:justify-around">
                    <div className='text-white flex flex-col justify-center'>
                        <div className="flex my-1">
                            <i className="fa-solid fa-location-dot text-xl border-2 p-2 border-white rounded-full"></i>
                            <span className='text-lg mx-2 tracking-widest'>Mumbai, India</span>
                        </div>
                        <div className="flex my-1">
                            <i className="fa-solid fa-phone text-xl border-2 p-2 border-white rounded-full"></i>
                            <span className='text-lg mx-2 tracking-widest'>+91 8286043188</span>
                        </div>
                        <div className="flex my-1">
                            <i className="fa-solid fa-envelope text-xl border-2 p-2 border-white rounded-full"></i>
                            <Link href='mailto:hiteshbhosle37906@gmail.com'><span className='text-lg mx-2 tracking-widest'>hiteshbhosle37906@gmail.com</span></Link>
                        </div>
                    </div>
                    <div className='text-white'>
                        <p className='text-2xl font-bold'>Social Media Handles:</p>
                        <div className='flex mt-4'>
                        <Link href='https://www.instagram.com/hitesh.e.bhosale/'><i class="fa-brands fa-instagram text-2xl border-2 border-white p-2 rounded-full mx-4"></i></Link>
                        <Link href='https://www.linkedin.com/in/hitesh-bhosale-46882b215/'><i class="fa-brands fa-linkedin text-2xl border-2 border-white p-2 rounded-full mx-4"></i></Link>
                        <Link href='https://github.com/Hitesh3009'><i class="fa-brands fa-github text-2xl border-2 border-white p-2 rounded-full mx-4"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer