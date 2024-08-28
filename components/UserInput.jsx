'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const UserInput = ({ totalRes }) => {
    const pageCount = Math.ceil(totalRes / 12); // to get the total number of pages
    // this is used to set the user input state
    const [userInp, setuserInp] = useState('');
    const router = useRouter(); // use to redirect to the specified endpoint
    const params = useParams(); // use to get the parameters from the url
    const page = Number(params.page); // page number retrieved from the url

    // handles the input given by the user
    const handleUserInp = (e) => {

        // gets the entered value by the user
        const newValue = e.target.value;
        setuserInp(newValue); // sets the new value
        newValue.trim() === '' ? router.replace(`/pokemons/${page}`) : router.replace(`/pokemons/${page}?input=${newValue}`); // if the user input is empty it replaces it by the current page number and if any user input text is present then displays the input text as query in url
    }

    return (
        <>
            {/* Displays the user input field only if the page number is a valid number and not exceed the last page */}
            <div className={`searchPokemon flex flex-col items-center space-y-4 my-7 ${(!Number.isInteger(page) || page < 0 || page > pageCount) && 'hidden'}`} >

                {/* Label to display the field name */}
                <label htmlFor="pokemonName" className='text-3xl text-center font-bold text-white'>Search Pokemon</label>

                {/* Input field for the user to enter the pokemon name */}
                <input type="text" name="pokemonName" id="pokemonName" aria-placeholder='Search Pokemon' className='outline-none border-2 border-b-black w-72 sm:w-80 md:w-96 pl-3 focus:transition focus:border-[3px] focus:border-b-red-400 focus:shadow-lg focus:shadow-yellow-300 rounded-md delay-300 h-9' value={userInp} onChange={handleUserInp} />
            </div>
        </>
    )
}

export default UserInput;