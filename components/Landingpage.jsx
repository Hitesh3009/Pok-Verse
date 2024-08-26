'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
const LandingPage = () => {
  const router = useRouter();
  const handlePageChange = () => {
    router.replace('/allpokemons/1');
  }
  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col lg:flex-row'>
          <img src="/Ash with his Pokemon1.jpg" alt="Ash with his Pokemon" className='w-full lg:w-1/2' />
          <img src="/Ash with his Pokemon2.jpg" alt="Ash with Pikachu" className='w-full lg:w-1/2' />
        </div>
        <button className='bg-black text-white px-3 py-2 rounded-md w-48 my-6' onClick={handlePageChange}>Let's See Pokemons</button>
      </div>
    </>
  )
}

export default LandingPage;