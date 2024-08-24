'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
const LandingPage = () => {
  const router=useRouter();
  const handlePageChange=()=>{
    router.replace('/allpokemons/1');
  }
  return (
    <div className=''>
        <button className='bg-black text-white px-3 py-2 rounded-md' onClick={handlePageChange}>Go to all pokemons page</button>
    </div>
  )
}

export default LandingPage;