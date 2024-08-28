import React, { Suspense } from 'react';
import PageControls from '@/components/PageControls'; // imports the previous and next buttons
import Link from 'next/link';
import UserInput from '@/components/UserInput';// imports the input field for the user input
import Cards from '@/components/Cards'; // imports the cards for displaying the pokemon cards

let data;
let totalRes;
const Loading = React.lazy(() => import('./loading'));

// gets the pokemon data from the custom api based on the offset value 
const getAllPokemonData = async (offset) => {
    try {
        const res = await fetch(`http://localhost:3000/api/pokemons?offset=${offset}`);
        data = await res.json();
        totalRes = Number(data.totalCount);
        return Array.isArray(data.detailedResponse) ? data.detailedResponse : [];
    }
    catch (e) {
        console.error(e); //logs the error for debugging
        let error_msg = 'Some error occured while fetching the data for pokemons.';
        return { data: null, message: error_msg }; // returns null data if any error occured and the error message
    }
}

// capitalizes the first letter
const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1, word.length + 1).toLowerCase();
}

// object which stores the color for each pokemon type and its respective type logos
const pokeNameColorWithIcon = {
    'bug': { 'color': '#94bc4a', 'icon': '/bug_type.png' },
    'dark': { 'color': '#736c75', 'icon': '/dark_type.png' },
    'dragon': { 'color': '#6a7baf', 'icon': '/dragon_type.png' },
    'electric': { 'color': '#e5c531', 'icon': '/electric_type.png' },
    'fairy': { 'color': '#e397d1', 'icon': '/fairy_type.png' },
    'fighting': { 'color': '#cb5f48', 'icon': '/fighting_type.png' },
    'fire': { 'color': '#ea7a3c', 'icon': '/fire_type.png' },
    'flying': { 'color': '#7da6de', 'icon': '/flying_type.png' },
    'ghost': { 'color': '#846ab6', 'icon': '/ghost_type.png' },
    'grass': { 'color': '#71c558', 'icon': '/grass_type.png' },
    'ground': { 'color': '#cc9f4f', 'icon': '/ground_type.png' },
    'ice': { 'color': '#70cbd4', 'icon': '/ice_type.png' },
    'normal': { 'color': '#aab09f', 'icon': '/normal_type.png' },
    'poison': { 'color': '#b468b7', 'icon': '/poison_type.png' },
    'psychic': { 'color': '#e5709b', 'icon': '/psychic_type.png' },
    'rock': { 'color': '#b2a061', 'icon': '/rock_type.png' },
    'steel': { 'color': '#89a1b0', 'icon': '/steel_type.png' },
    'water': { 'color': '#539ae2', 'icon': '/water_type.png' },
};

// this function returns the offset value based on the page number retrieved from the url path


// this is the component used to display the entire pokemon data
const Allpokemons = async ({ params, searchParams }) => {
    const page = Number(params.page); // gets the page number from the url parameters
    const offset = (page - 1) * 12; // gets the respective offset for the page number
    const pokeArr = await getAllPokemonData(offset); // gets the pokemon data based on the provided offset
    const userInp = searchParams.input || ''; // retrieves the user query from the query parameter of url

    // returns the filtered array based on the user input for the pokemon search
    const filterPokemon = Array.isArray(pokeArr)
        ? pokeArr.filter((currPokemon) => {
            return currPokemon.name.toLowerCase().includes(userInp.toLowerCase());
        })
        : [];


    return (
        <>
            {/* User input component to display the input field */}
            <UserInput totalRes={totalRes} />

            {/* Suspense is used to display the card loader until the data is fetched */}
            <Suspense fallback={<div className='flex justify-center flex-wrap'>

                {/* Returns an array of length 8 and iterates it to display 8 loader cards */}
                {Array.from({ length: 8 }).map((_, index) => {
                    return (<div key={index} className="m-4">
                        <Loading />
                    </div>);
                })}
            </div>
            }>
                {
                    // handles the case where if any user navigates to page number which is not a number and a string or the page number is less than 0 or greater than the total page count, this will show 404 error page
                    (!Number.isInteger(page) || page < 0 || page > Math.ceil(totalRes / 12)) ? <div className='flex flex-col items-center min-h-screen'><p className='text-3xl font-bold text-center my-auto text-white'>404 Page Not Found</p></div> : (<>
                        <div className="flex justify-center flex-wrap">
                            {
                                // checks whether the array is empty, if not then displays the available pokemon cards
                                filterPokemon.length > 0 ? filterPokemon.map((pokeVal) => {
                                    return (
                                        (< div key={pokeVal.name} >
                                            {/* Link is used to redirect to individual pokemon data */}
                                            <Link href={`/pokedex/${pokeVal.name}`}>

                                                {/* card to display pokemon basic details */}
                                                <Cards pokeVal={pokeVal} capitalizeFirstLetter={capitalizeFirstLetter} pokeNameColorWithIcon={pokeNameColorWithIcon} individualPokecard={false} />
                                            </Link>
                                        </div>)
                                    )
                                }) : (
                                    <div>
                                        {/* Displays a message in case if the pokemon is not available on the current page */}
                                        <p className='text-xl md:text-2xl lg:text-3xl leading-9 text-white'>Pokemon <span className='text-yellow-200 bg-gray-700 py-2 px-3 rounded-lg'>{capitalizeFirstLetter(userInp)}</span>,Not found on this page maybe you can find it on next or previous page.</p>
                                    </div>
                                )
                            }
                        </div>
                        {/* Displays the previous and next button for page navigation */}
                        <PageControls totalRes={totalRes} />
                    </>)
                }
            </Suspense >

        </>
    )
}

export default Allpokemons;