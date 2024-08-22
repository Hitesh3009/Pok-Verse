'use client'
import React from 'react'
import Link from 'next/link'
const LandingPage = () => {
  return (
    <div className=''>
        <Link href='/allpokemons/0'><button className='bg-black text-white px-3 py-2 rounded-md'>Go to all pokemons page</button></Link>
        <Link href='/pokedex/regions'><button className='bg-black text-white px-3 py-2 rounded-md'>Pokemons by Region</button></Link>
    </div>
  )
}

export default LandingPage;