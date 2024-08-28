'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
const LandingPage = () => {
  const router = useRouter(); // use for navigation
  const handlePageChange = () => {
    router.push('/pokemons/1'); // redirects to first page
  }
  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col lg:flex-row'>
          {/* Displays the two images on the home page 1. ash with all his pokemon 2. ash with pikachu */}
          <img src="/Ash with his Pokemon1.jpg" alt="Ash with his Pokemon" className='w-full lg:w-1/2' />
          <img src="/Ash with his Pokemon2.jpg" alt="Ash with Pikachu" className='w-full lg:w-1/2' />
        </div>

        {/* Button to navigate to the first page */}
        <button className='bg-black text-white px-3 py-2 rounded-md w-48 my-6' onClick={handlePageChange}>Let's See Pokémons</button>
      </div>
    </>
  )
}

export default LandingPage;