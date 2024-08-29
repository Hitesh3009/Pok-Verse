'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
const LandingPage = () => {
  const router = useRouter(); // use for navigation
  const handlePageChange = () => {
    router.push('/pokemons/1'); // redirects to first page
  }
  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col lg:flex-row'>

          <div className="w-[100vw] h-[50vh] sm:h-[60vh] lg:w-[50vw] md:h-[70vh] relative">
            <Image src={`/Ash with his Pokemon1.jpg`} fill alt='Ash with his Pokemon' sizes='auto' priority={true} />
          </div>
          <div className="w-[100vw] h-[50vh] sm:h-[60vh] lg:w-[50vw] md:h-[70vh] relative">
            <Image src={`/Ash with his Pokemon2.jpg`} fill alt='Ash with his Pokemon' sizes='auto' priority={true} />
          </div>

        </div>

        {/* Button to navigate to the first page */}
        <button className='bg-black text-white px-3 py-2 rounded-md w-48 my-6 tracking-wide' onClick={handlePageChange}>Let&apos;s See Pokémons</button>
      </div>
    </>
  )
}

export default LandingPage;