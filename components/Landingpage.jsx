'use client'
import React from 'react'
import Link from 'next/link'
const LandingPage = () => {
  return (
    <div>
        <Link href='/allpokemons/0'><button className='bg-black text-white px-3 py-2 rounded-md'>Go to all pokemons page</button></Link>
    </div>
  )
}

export default LandingPage;