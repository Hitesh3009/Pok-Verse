import React, { Suspense } from 'react';
import '../../globals.css';
import Loading from './loading';
import Cards from '@/components/Cards';
import Link from 'next/link';
import PokemonType from '@/components/PokemonType';
const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1, word.length + 1).toLowerCase();
}

const getPokeData = async (pokemon) => {
    const res = await fetch(`http://localhost:3000/api/getpokemon?pokemon=${pokemon}`);
    const data = await res.json();
    return data;
}

const getPokeMoves = async (pokemon) => {
    const res = await fetch(`http://localhost:3000/api/moves?pokemon=${pokemon}`);
    const data = await res.json();
    return data;
}

const getEffectiveMove = async (pokeTypeArr) => {
    const EffectivenessObj = {};
    await Promise.all(pokeTypeArr.map(async (type) => {
        const res = await fetch(`http://localhost:3000/api/moveeffectiveness?type=${type}`);
        const data = await res.json();
        EffectivenessObj[type] = data;
    }));
    return EffectivenessObj;
}
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

const Pokemon = async ({ params }) => {
    const pokemon = params.pokemon;
    const pokeData = await getPokeData(pokemon);
    const movesArr = await getPokeMoves(pokemon);
    let pokeTypeArr = [];
    for (let i = 0; i < pokeData.types.length; i++) {
        const type = pokeData.types[i].type.name;
        pokeTypeArr.push(type);
    }
    const effectiveMove = await getEffectiveMove(pokeTypeArr);

    return (
        <>
            <Suspense fallback={<Loading />}>
                <div className='flex flex-col items-center lg:items-start lg:justify-start lg:flex-row sm:m-5 font-mono'>
                    {
                        !pokeData.error ? (<div className='flex flex-col'>
                            <Cards pokeVal={pokeData} capitalizeFirstLetter={capitalizeFirstLetter} pokeNameColorWithIcon={pokeNameColorWithIcon} evolutionBtnActive={true} />
                            {/* <div className={`flex justify-center animate-fade mb-5 lg:mb-0`}>
                                <Link href={`/pokedex/evolution`}><button className='bg-blue-600 px-3 py-2 text-white rounded-lg'>Check Evolution Status</button></Link>
                            </div> */}
                        </div>
                        ) :
                            <div className="flex flex-col items-center min-h-screen">
                                <p className='text-3xl font-bold my-auto'>{pokeData.error}</p>
                            </div>

                    }

                    <div className="px-5 lg:px-0 my-5 lg:ml-10 flex flex-col flex-wrap w-full overflow-x-hidden">
                        <table className='border-2 border-black border-collapse animate-fade lg:animate-slideToRight '>
                            <thead>
                                <tr>
                                    <th className='border-2 border-black p-3 text-lg md:text-xl border-collapse' >Move Type</th>
                                    <th className='border-2 border-black p-3 text-lg md:text-xl border-collapse' >Move Name</th>
                                    <th className='border-2 border-black p-3 text-lg md:text-xl border-collapse'>Effect</th>
                                </tr>
                            </thead>
                            <tbody className='text-sm md:text-base'>
                                {
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
                                    }) : <tr>
                                        <td colSpan="2" className='p-3 text-center'>Data not available for this pokemon</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>


                <div className="flex justify-center mb-7 animate-fade font-mono">
                    <div className="bg-violet-700 md:p-10">
                        <h1 className='text-2xl md:text-3xl text-white text-center tracking-wider mt-4 md:mt-0'>Moves Effectiveness</h1>
                        <div className='p-4'>
                            {
                                pokeTypeArr.map((type, index) => {
                                    const key = effectiveMove[type];
                                    return (
                                        <div key={index}>
                                            <div className='flex items-center text-white p-3'>
                                                <span className='mr-2 text-base md:text-2xl'>Attack Type : </span>
                                                <PokemonType pokeNameColorWithIcon={pokeNameColorWithIcon} typeValue={type} />
                                                <span className='mx-3 text-base md:text-2xl'>{capitalizeFirstLetter(type)}</span>
                                            </div>

                                            <div className='flex flex-wrap justify-evenly'>

                                                <div className='my-3'>
                                                    <ul>
                                                        <h2 className='pl-5 text-center text-base md:text-lg text-white'>Double Damage From</h2>
                                                        {
                                                            key.double_damage_from.length > 0 ? key.double_damage_from.map((val, idx) => {
                                                                return (
                                                                    <li className='flex items-center text-white pl-10 text-sm' key={idx}>
                                                                        <PokemonType pokeNameColorWithIcon={pokeNameColorWithIcon} typeValue={val.name} />
                                                                        <span className='mx-3 text-base'>{capitalizeFirstLetter(val.name)}</span>
                                                                    </li>
                                                                )
                                                            }) :
                                                                <li className='flex items-center text-white pl-10 text-sm'>
                                                                    <span className='mx-3 text-base'>None</span>
                                                                </li>
                                                        }
                                                    </ul>
                                                </div>


                                                <div className='my-3'>
                                                    <ul>
                                                        <h2 className='pl-5 text-center text-base md:text-lg text-white'>Double Damage To</h2>
                                                        {
                                                            key.double_damage_to.length > 0 ? key.double_damage_to.map((val, idx) => {
                                                                return (
                                                                    <li className='flex items-center text-white pl-10 text-sm' key={idx}>
                                                                       <PokemonType pokeNameColorWithIcon={pokeNameColorWithIcon} typeValue={val.name} />
                                                                        <span className='mx-3 text-base'>{val ? capitalizeFirstLetter(val.name) : 'None'}</span>
                                                                    </li>
                                                                )
                                                            }) :
                                                                <li className='flex items-center text-white pl-10 text-sm'>
                                                                    <span className='mx-3 text-base'>None</span>
                                                                </li>
                                                        }
                                                    </ul>
                                                </div>


                                                <div className='my-3'>
                                                    <ul>
                                                        <h2 className='pl-5 text-center text-base md:text-lg text-white'>Half Damage From</h2>
                                                        {
                                                            key.half_damage_from.length > 0 ? key.half_damage_from.map((val, idx) => {
                                                                return (
                                                                    <li className='flex items-center text-white pl-10 text-sm' key={idx}>
                                                                       <PokemonType pokeNameColorWithIcon={pokeNameColorWithIcon} typeValue={val.name} />
                                                                        <span className='mx-3 text-base'>{val ? capitalizeFirstLetter(val.name) : 'None'}</span>
                                                                    </li>
                                                                )
                                                            }) :
                                                                <li className='flex items-center text-white pl-10 text-sm'>
                                                                    <span className='mx-3 text-base'>None</span>
                                                                </li>
                                                        }
                                                    </ul>
                                                </div>


                                                <div className='my-3'>
                                                    <ul>
                                                        <h2 className='pl-5 text-center text-base md:text-lg text-white'>Half Damage To</h2>
                                                        {
                                                            key.half_damage_to.length > 0 ? key.half_damage_to.map((val, idx) => {
                                                                return (
                                                                    <li className='flex items-center text-white pl-10 text-sm' key={idx}>
                                                                       <PokemonType pokeNameColorWithIcon={pokeNameColorWithIcon} typeValue={val.name} />
                                                                        <span className='mx-3 text-base'>{val ? capitalizeFirstLetter(val.name) : 'None'}</span>
                                                                    </li>
                                                                )
                                                            }) :
                                                                <li className='flex items-center text-white pl-10 text-sm'>
                                                                    <span className='mx-3 text-base'>None</span>
                                                                </li>
                                                        }
                                                    </ul>
                                                </div>


                                                <div className='my-3'>
                                                    <ul>
                                                        <h2 className='pl-5 text-center text-base md:text-lg text-white'>No Damage From</h2>
                                                        {
                                                            key.no_damage_from.length > 0 ? key.no_damage_from.map((val, idx) => {
                                                                return (
                                                                    <li className='flex items-center text-white pl-10 text-sm' key={idx}>
                                                                       <PokemonType pokeNameColorWithIcon={pokeNameColorWithIcon} typeValue={val.name} />
                                                                        <span className='mx-3 text-base'>{val ? capitalizeFirstLetter(val.name) : 'None'}</span>
                                                                    </li>
                                                                )
                                                            }) :
                                                                <li className='flex items-center text-white pl-10 text-sm'>
                                                                    <span className='mx-3 text-base'>None</span>
                                                                </li>
                                                        }
                                                    </ul>
                                                </div>


                                                <div className='my-3'>
                                                    <ul>
                                                        <h2 className='pl-5 text-center text-base md:text-lg text-white'>No Damage To</h2>
                                                        {
                                                            key.no_damage_to.length > 0 ? key.no_damage_to.map((val, idx) => {
                                                                return (
                                                                    <li className='flex items-center text-white pl-10 text-sm' key={idx}>
                                                                       <PokemonType pokeNameColorWithIcon={pokeNameColorWithIcon} typeValue={val.name} />
                                                                        <span className='mx-3 text-base'>{val ? capitalizeFirstLetter(val.name) : 'None'}</span>
                                                                    </li>
                                                                )
                                                            }) :
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
