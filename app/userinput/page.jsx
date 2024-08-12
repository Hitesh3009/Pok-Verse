'use client'
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'

const UserInput = () => {
    const [userInp, setuserInp] = useState('');
    const router = useRouter();
    const params = useParams();
    const offset = params.next;
    const handleUserInp = (e) => {
        const newValue = e.target.value;
        setuserInp(newValue);
        newValue.trim() === ''?router.replace(`/allpokemons/${offset}`):router.replace(`/allpokemons/${offset}?input=${newValue}`);
    }

    return (
        <>
            {console.log(userInp)}
            <div className="searchPokemon flex flex-col items-center space-y-4 my-7">
                <label htmlFor="pokemonName" className='text-3xl text-center font-bold font-mono'>Search Pokemon</label>
                <input type="text" name="pokemonName" id="pokemonName" aria-placeholder='Search Pokemon' className='outline-none border-2 border-b-black w-72 sm:w-80 md:w-96 pl-3 focus:transition focus:border-[3px] focus:border-b-red-400 focus:shadow-lg focus:shadow-yellow-300 rounded-md delay-300 h-9' value={userInp} onChange={handleUserInp} />
            </div>
        </>
    )
}

export default UserInput