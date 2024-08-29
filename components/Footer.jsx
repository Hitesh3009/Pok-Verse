import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
const Footer = () => {
    const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
    const linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL;
    const gitHubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
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
                            {/* <div className='w-6 h-6 md:w-7 md:h-7 relative'> */}
                                <Image src={`/location.svg`} width={4} height={3} alt='Location Logo' aria-label='Location' className='w-6 h-6 md:w-7 md:h-7' priority={true}/>
                            {/* </div> */}
                            <span className='mx-2 tracking-widest'>Mumbai, India</span>
                        </div>
                        <div className='email text-white flex justify-start items-center p-2 border-2 border-white rounded-full my-2 md:border-none'>
                            {/* Mail address */}
                            <Link href='mailto: hiteshbhosle37906@gmail.com' className='hover:underline flex items-center'>
                                {/* <div className='w-6 h-6 md:w-7 md:h-7 relative'> */}
                                    <Image src={`/mail.svg`} width={4} height={3} alt='Email Logo' aria-label='Email' className='w-6 h-6 md:w-7 md:h-7' priority={true}/>
                                {/* </div> */}
                                <span className='mx-2 tracking-widest'>hiteshbhosle37906@gmail.com</span>
                            </Link>
                        </div>
                    </div>
                    <div className='socialMedia flex flex-col text-sm md:text-base mt-3 md:my-5'>
                        <h2 className='text-xl lg:text-2xl text-white text-center px-2'>Connect on Social Media Platforms</h2>
                        <div className='instagram text-white flex justify-center items-center my-4'>
                            {/* Instagram id */}
                            <Link href={`${instagramUrl}`} className='mx-2'>
                                <div className="w-8 h-8 md:w-9 md:h-9 relative">
                                    <Image src={`/instagramLogo.svg`} width={4} height={3} className='w-8 h-8 md:w-9 md:h-9' alt='Instagram Logo' aria-label='Instagram' priority={true}/>
                                </div>
                            </Link>

                            {/* LinkedIn id */}
                            <Link href={`${linkedInUrl}`} className='mx-2'>
                                <div className="w-8 h-8 md:w-9 md:h-9 relative">
                                    <Image src={`/linkedinLogo.svg`} width={4} height={3} className='w-8 h-8 md:w-9 md:h-9' alt='LinkedIn Logo' aria-label='LinkedIn' priority={true}/>
                                </div>
                            </Link>

                            {/* GitHub id */}
                            <Link href={`${gitHubUrl}`} className='mx-2'>
                                <div className="w-8 h-8 md:w-9 md:h-9 relative">
                                    <Image src={`/githubLogo.svg`} width={4} height={3} className='w-8 h-8 md:w-9 md:h-9' alt='GitHub Logo' aria-label='GitHub' priority={true}/>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;