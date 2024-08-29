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

        <div className='w-full md:w-5/6 lg:w-9/12 px-4 my-3'>
          <Image src='/Ash with his friends and pokemons.jpg' width={600} height={500} alt="Ash with his friends and pokemons" className='w-full h-auto' placeholder='empty' priority={true}/>
        </div>

        {/* Button to navigate to the first page */}
        <button className='bg-black text-white px-3 py-2 rounded-md w-48 my-6 tracking-wide' onClick={handlePageChange}>Let&apos;s See Pokémons</button>
      </div>
    </>
  )
}

export default LandingPage;