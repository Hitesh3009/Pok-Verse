import React, { Suspense } from 'react';
import '../../globals.css';
import Loading from './loading';
import Cards from '@/components/Cards';
import PokemonType from '@/components/PokemonType';

// capitalize the first letter
const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1, word.length + 1).toLowerCase();
}

// gets the details for the pokemon based on the pokemon name
const getPokeData = async (pokemon) => {
    const res = await fetch(`http://localhost:3000/api/getpokemon?pokemon=${pokemon}`);
    const data = await res.json();
    return data;
}

// gets the details for the moves the pokemon uses 
const getPokeMoves = async (pokemon) => {
    const res = await fetch(`http://localhost:3000/api/moves?pokemon=${pokemon}`);
    const data = await res.json();
    return data;
}

// gets the details for moves which deals more damage to,from,etc...
const getEffectiveMove = async (pokeTypeArr) => {
    const EffectivenessObj = {}; // object to store the pokemon type and its respective data like double_damage_to ,from,so on...

    // since the pokemon sometimes don't have only one single type it have multiple types so we try to resolve promises for all the type that pokemon possesses
    await Promise.all(pokeTypeArr.map(async (type) => {
        const res = await fetch(`http://localhost:3000/api/moveeffectiveness?type=${type}`);
        const data = await res.json();
        EffectivenessObj[type] = data; // stores the data for respective pokemon type eg:for bulbasaur,grass and poison.
    }));
    return EffectivenessObj; // returns the final object
}

//object which stores the color for each pokemon type and its respective type logos
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

// the component to render the detailed information about the pokemon
const Pokemon = async ({ params }) => {
    const pokemon = params.pokemon; // gets the pokemon name from the parameters of the url to get the data for specific pokemon
    const pokeData = await getPokeData(pokemon); // array of that pokemon name
    const movesArr = await getPokeMoves(pokemon); // array of that pokemon moves
    let pokeTypeArr = []; // stores the pokemon type

    // iterates through the pokemon data from api and stores the types in the pokemon type array
    for (let i = 0; i < pokeData.types.length; i++) {
        const type = pokeData.types[i].type.name;
        pokeTypeArr.push(type);
    }

    // gets the moves effectiveness on other pokemons based on the pokemon type array
    const effectiveMove = await getEffectiveMove(pokeTypeArr);

    return (
        <>
            {/* Displays the card skeleton until the data is fetched */}
            <Suspense fallback={<Loading />}>
                <div className='flex flex-col items-center lg:items-start lg:justify-start lg:flex-row sm:m-5 font-mono'>
                    {
                        // checks if there is any error while fetching data,if not then displays the pokemon card for that pokemon and other details
                        !pokeData.error ? (<div className='flex flex-col'>
                            <Cards pokeVal={pokeData} capitalizeFirstLetter={capitalizeFirstLetter} pokeNameColorWithIcon={pokeNameColorWithIcon} individualPokecard={true} />
                            <p className='text-center font-semibold animate-fade'>Play Pokemon Cry</p>
                            <div className='flex justify-center animate-fade'>
                                {/* Displays the audio to hear the pokemon voice */}
                                <audio controls>
                                    <source src={pokeData.cries.latest} type='audio/ogg' />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        </div>
                        ) :
                            // diplays the error message if any error occurs while fetching the data
                            <div className="flex flex-col items-center min-h-screen">
                                <p className='text-3xl font-bold my-auto'>{pokeData.error}</p>
                            </div>

                    }

                    <div className="px-5 lg:px-0 my-5 lg:ml-10 flex flex-col flex-wrap w-full overflow-x-hidden">
                        {/* Displays the pokemon moves with the effect it causes in the table format and also displays the animation */}
                        <table className='border-2 border-black border-collapse animate-fade lg:animate-slideToRight '>
                            {/* Table heading */}
                            <thead>
                                <tr>
                                    <th className='border-2 border-black p-3 text-lg md:text-xl border-collapse' >Move Type</th>
                                    <th className='border-2 border-black p-3 text-lg md:text-xl border-collapse' >Move Name</th>
                                    <th className='border-2 border-black p-3 text-lg md:text-xl border-collapse'>Effect</th>
                                </tr>
                            </thead>

                            <tbody className='text-sm md:text-base'>
                                {
                                    // only displays the attacks which the pokemon type is of
                                    // eg: for bulbasaur it will display only grass and poison attacks
                                    // checks is data is available,if it is then displays the data in table form
                                    movesArr.length > 0 ? movesArr.map((move, index) => {
                                        return (
                                            <tr key={index} className='border-2 border-black'>
                                                <td className='border-2 border-black p-3' >
                                                    <div className='flex items-center justify-center'>
                                                        <img src={move && pokeNameColorWithIcon[move.move_type].icon} alt="Attack Type" className='w-6 h-6 md:w-7 md:h-7 text-xs border-2 border-black rounded-full' />
                                                    </div>
                                                </td>
                                                <td className='border-2 border-black w-36'>
                                                    <div className='flex items-center justify-center'>
                                                        <p className=''>{move && capitalizeFirstLetter(move.move_name)}</p>
                                                    </div>
                                                </td>
                                                <td className='p-3'>
                                                    <div className="flex">
                                                        <div>
                                                            <p className='mx-3 text-pretty'>{move && capitalizeFirstLetter(move.move_effect)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }) :
                                        // If not data available for the pokemon then displays this message
                                        <tr>
                                            <td colSpan="2" className='p-3 text-center'>Data not available for {pokemon}</td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* displays all the information regarding the pokemon strength,weakness,etc against other pokemon type*/}
                <div className="flex justify-center animate-fade">
                    <div className="bg-gray-800 md:p-10 w-full">
                        <h1 className='text-2xl md:text-3xl text-white text-center tracking-wider mt-4 md:mt-0'>Moves Effectiveness</h1>
                        <div className='p-4'>
                            {
                                pokeTypeArr.map((type, index) => {
                                    const key = effectiveMove[type]; // type of the pokemon eg:grass and poison
                                    return (
                                        <div key={index}>
                                            {/* Displays the current pokemon type */}
                                            <div className='flex items-center text-white p-3'>
                                                <span className='mr-2 text-base md:text-2xl'>Attack Type : </span>
                                                <PokemonType pokeNameColorWithIcon={pokeNameColorWithIcon} typeValue={type} />
                                                <span className='mx-3 text-base md:text-2xl'>{capitalizeFirstLetter(type)}</span>
                                            </div>

                                            <div className='flex flex-wrap justify-evenly'>
                                                <div className='my-3'>
                                                    <ul>
                                                        <h2 className='pl-5 text-center text-base md:text-lg text-white'>Double Damage From</h2>
                                                        {/* Displays all pokemon types against which it takes double damage */}
                                                        {
                                                            key.double_damage_from.length > 0 ? key.double_damage_from.map((val, idx) => {
                                                                return (
                                                                    <li className='flex items-center text-white pl-10 text-sm' key={idx}>
                                                                        <PokemonType pokeNameColorWithIcon={pokeNameColorWithIcon} typeValue={val.name} />
                                                                        <span className='mx-3 text-base'>{capitalizeFirstLetter(val.name)}</span>
                                                                    </li>
                                                                )
                                                            }) :
                                                                // If no data then displays none
                                                                <li className='flex items-center text-white pl-10 text-sm'>
                                                                    <span className='mx-3 text-base'>None</span>
                                                                </li>
                                                        }
                                                    </ul>
                                                </div>


                                                <div className='my-3'>
                                                    <ul>
                                                        <h2 className='pl-5 text-center text-base md:text-lg text-white'>Double Damage To</h2>
                                                        {/* Displays all pokemon types against which it deals double damage */}
                                                        {
                                                            key.double_damage_to.length > 0 ? key.double_damage_to.map((val, idx) => {
                                                                return (
                                                                    <li className='flex items-center text-white pl-10 text-sm' key={idx}>
                                                                        <PokemonType pokeNameColorWithIcon={pokeNameColorWithIcon} typeValue={val.name} />
                                                                        <span className='mx-3 text-base'>{val ? capitalizeFirstLetter(val.name) : 'None'}</span>
                                                                    </li>
                                                                )
                                                            }) :
                                                                // If no data then displays none
                                                                <li className='flex items-center text-white pl-10 text-sm'>
                                                                    <span className='mx-3 text-base'>None</span>
                                                                </li>
                                                        }
                                                    </ul>
                                                </div>


                                                <div className='my-3'>
                                                    <ul>
                                                        <h2 className='pl-5 text-center text-base md:text-lg text-white'>Half Damage From</h2>
                                                        {/* Displays all pokemon types against which it takes half damage */}
                                                        {
                                                            key.half_damage_from.length > 0 ? key.half_damage_from.map((val, idx) => {
                                                                return (
                                                                    <li className='flex items-center text-white pl-10 text-sm' key={idx}>
                                                                        <PokemonType pokeNameColorWithIcon={pokeNameColorWithIcon} typeValue={val.name} />
                                                                        <span className='mx-3 text-base'>{val ? capitalizeFirstLetter(val.name) : 'None'}</span>
                                                                    </li>
                                                                )
                                                            }) :
                                                                // If no data then displays none
                                                                <li className='flex items-center text-white pl-10 text-sm'>
                                                                    <span className='mx-3 text-base'>None</span>
                                                                </li>
                                                        }
                                                    </ul>
                                                </div>


                                                <div className='my-3'>
                                                    <ul>
                                                        <h2 className='pl-5 text-center text-base md:text-lg text-white'>Half Damage To</h2>
                                                        {/* Displays all pokemon types against which it deals half damage */}
                                                        {
                                                            key.half_damage_to.length > 0 ? key.half_damage_to.map((val, idx) => {
                                                                return (
                                                                    <li className='flex items-center text-white pl-10 text-sm' key={idx}>
                                                                        <PokemonType pokeNameColorWithIcon={pokeNameColorWithIcon} typeValue={val.name} />
                                                                        <span className='mx-3 text-base'>{val ? capitalizeFirstLetter(val.name) : 'None'}</span>
                                                                    </li>
                                                                )
                                                            }) :
                                                                // If no data then displays none
                                                                <li className='flex items-center text-white pl-10 text-sm'>
                                                                    <span className='mx-3 text-base'>None</span>
                                                                </li>
                                                        }
                                                    </ul>
                                                </div>


                                                <div className='my-3'>
                                                    <ul>
                                                        <h2 className='pl-5 text-center text-base md:text-lg text-white'>No Damage From</h2>
                                                        {/* Displays all pokemon types against which it takes no damage */}
                                                        {
                                                            key.no_damage_from.length > 0 ? key.no_damage_from.map((val, idx) => {
                                                                return (
                                                                    <li className='flex items-center text-white pl-10 text-sm' key={idx}>
                                                                        <PokemonType pokeNameColorWithIcon={pokeNameColorWithIcon} typeValue={val.name} />
                                                                        <span className='mx-3 text-base'>{val ? capitalizeFirstLetter(val.name) : 'None'}</span>
                                                                    </li>
                                                                )
                                                            }) :
                                                                // If no data then displays none
                                                                <li className='flex items-center text-white pl-10 text-sm'>
                                                                    <span className='mx-3 text-base'>None</span>
                                                                </li>
                                                        }
                                                    </ul>
                                                </div>


                                                <div className='my-3'>
                                                    <ul>
                                                        <h2 className='pl-5 text-center text-base md:text-lg text-white'>No Damage To</h2>
                                                        {/* Displays all pokemon types against which it deals no damage */}
                                                        {
                                                            key.no_damage_to.length > 0 ? key.no_damage_to.map((val, idx) => {
                                                                return (
                                                                    <li className='flex items-center text-white pl-10 text-sm' key={idx}>
                                                                        <PokemonType pokeNameColorWithIcon={pokeNameColorWithIcon} typeValue={val.name} />
                                                                        <span className='mx-3 text-base'>{val ? capitalizeFirstLetter(val.name) : 'None'}</span>
                                                                    </li>
                                                                )
                                                            }) :
                                                                // If no data then displays none
                                                                <li className='flex items-center text-white pl-10 text-sm'>
                                                                    <span className='mx-3 text-base'>None</span>
                                                                </li>
                                                        }
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>

                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Suspense>
        </>
    )
}

export default Pokemon
