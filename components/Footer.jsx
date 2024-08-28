import React from 'react';
import Link from 'next/link';
const Footer = () => {
    return (
        <>
            {/* footer to display the developer name and other details */}
            <div className='bg-black w-full pt-4'>
                <h2 className='text-white text-2xl lg:text-3xl text-center tracking-widest'>Developed by</h2>
                {/* developer name */}
                <p className='text-xl lg:text-2xl text-white text-center font-bold mt-4 tracking-wider'>Hitesh Eknath Bhosale</p>
                <div className='flex flex-col items-center md:flex-row md:justify-around'>
                    <div className='details flex flex-col text-sm md:text-base mt-3 md:my-5'>
                        <div className='location text-white flex justify-start items-center p-2 border-2 border-white rounded-full my-2 md:border-none'>
                            {/* Location */}
                            <i className="fa-solid fa-location-dot text-xl mx-2"></i>
                            <span className='mx-2 tracking-widest'>Mumbai, India</span>
                        </div>
                        <div className='email text-white flex justify-start items-center p-2 border-2 border-white rounded-full my-2 md:border-none'>
                            {/* Mail address */}
                            <i className="fa-solid fa-envelope text-xl mx-2"></i>
                            <Link href='mailto: hiteshbhosle37906@gmail.com' className='hover:underline'><span className='mx-2 tracking-widest'>hiteshbhosle37906@gmail.com</span></Link>
                        </div>
                    </div>
                    <div className='socialMedia flex flex-col text-sm md:text-base mt-3 md:my-5'>
                        <h2 className='text-xl lg:text-2xl text-white text-center px-2'>Connect on Social Media Platforms</h2>
                        <div className='instagram text-white flex justify-center items-center my-4'>
                            {/* Instagram id */}
                            <Link href='https://www.instagram.com/hitesh.e.bhosale/'><i className="fa-brands fa-instagram text-xl p-2 border-2 border-white rounded-full mx-2"></i></Link>

                            {/* LinkedIn id */}
                            <Link href='https://www.linkedin.com/in/hitesh-bhosale-46882b215/'><i className="fa-brands fa-linkedin text-xl p-2 border-2 border-white rounded-full mx-2"></i></Link>

                            {/* GitHub id */}
                            <Link href='https://github.com/Hitesh3009'><i className="fa-brands fa-github text-xl p-2 border-2 border-white rounded-full mx-2"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;