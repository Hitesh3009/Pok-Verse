import React, { Suspense } from 'react'
import Pagecontrols from '../../pagecontrols/page';
import Link from 'next/link';
import Image from 'next/image';
import UserInput from '@/app/userinput/page';

let data;
const Loading = React.lazy(() => import('./loading'));

const getAllPokemonData = async (offset) => {
    try {
        const res = await fetch(`http://localhost:3000/api/getallpokemons?offset=${offset}`);
        data = await res.json();
        return data;
    }
    catch (e) {
        let error_msg = 'Some error occured while fetching the data for pokemons.';
        return { data: null, message: error_msg };
    }
}

const captilizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1, word.length + 1).toLowerCase();
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


const Allpokemons = async ({ params ,searchParams}) => {
    const offset = Number(params.next, 10);
    const pokeArr = await getAllPokemonData(offset);
    const userInp= searchParams.input||'';
    const filterPokemon = pokeArr.filter((currPokemon) => {
        return currPokemon.name.toLowerCase().includes(userInp.toLowerCase());
    });
    return (
        <>
            <UserInput/>
            <Suspense fallback={<div className='flex justify-center flex-wrap'>
                {Array.from({ length: 8 }).map((_, index) => {
                    return (<div key={index} className="m-4">
                        <Loading />
                    </div>)
                })}
            </div>
            }>
                {
                    (!Number.isInteger(offset) || offset < 0 || offset > 1296) ? <div className='flex flex-col items-center min-h-screen'><p className='text-3xl font-bold text-center my-auto'>404 Page Not Found</p></div> : (<>
                        <div className="flex justify-center flex-wrap font-mono">
                            {
                                filterPokemon.length > 0 ? filterPokemon.map((pokeVal) => {
                                    return (<>
                                        {/* bg-gradient-to-br from-teal-400 via-lime-300 to-yellow-500 */}
                                        <div className='' key={pokeVal.name}>
                                            <Link href={`/pokedex/${pokeVal.name}`}><div className="card border-2 border-black w-72 h-auto sm:h-[31.2rem] m-5 px-5 pt-2 overflow-y-scroll space-y-4 hover:cursor-pointer hover:shadow-2xl hover:shadow-lime-500 hover:transform hover:scale-105 scrollbar-hide ">
                                                <div className='flex justify-center border-2 border-black rounded-tl-[250%] rounded-bl-[130%] rounded-tr-[180%] rounded-br-[200%] h-36 md:h-40 items-center w-full bg-gradient-to-bl from-purple-700 via-fuchsia-200 to-sky-400'>
                                                    <div className="pokeImg w-28 h-28 md:w-32 md:h-32 relative">
                                                        <Image src={pokeVal.sprites.other.dream_world.front_default ? pokeVal.sprites.other.dream_world.front_default : pokeVal.sprites.other['official-artwork'].front_default} alt="Pokemon Image" fill sizes='auto' priority={true}/>
                                                    </div>
                                                </div>
                                                <div className="pokeName flex justify-center mt-3">
                                                    <span className='text-2xl text-center font-bold'>{captilizeFirstLetter(pokeVal.name)}</span>
                                                </div>
                                                <div className="pokeType flex justify-evenly" key={pokeVal.id}>
                                                    {
                                                        pokeVal.types.map((val) => {
                                                            return (<>
                                                                <div className="flex items-center px-2 py-2 rounded-md" style={{ backgroundColor: pokeNameColorWithIcon[val.type.name].color }}>
                                                                    <div className='w-7 h-7 relative'>
                                                                        <Image src={pokeNameColorWithIcon[val.type.name].icon} alt="Pokemon Type Icon" className='border-2 border-white rounded-full' fill sizes='auto'/>
                                                                    </div>
                                                                    <span className={`mx-1.5 text-white`} key={val.slot} >{val.type.name}</span>
                                                                </div>
                                                            </>)
                                                        })
                                                    }
                                                </div>
                                                <div className="pokeStats flex justify-between flex-wrap">
                                                    <span>Height: {pokeVal.height}</span>
                                                    <span>Weight: {pokeVal.weight}</span>
                                                    <span>Speed: {pokeVal.stats[5].base_stat}</span>
                                                    <span>Experience: {pokeVal.base_experience}</span>
                                                    <span>Attack: {pokeVal.stats[1].base_stat}</span>
                                                    <span>Defense: {pokeVal.stats[2].base_stat}</span>
                                                </div>
                                                <div>
                                                    <span>Abilities: </span>
                                                    <ul className='flex flex-col mb-2 pl-2 flex-wrap-reverse'>
                                                        {
                                                            pokeVal.abilities.map((currAbility, index) => <li className='list-disc' key={index}>{captilizeFirstLetter(currAbility.ability.name)}</li>)
                                                        }
                                                    </ul>
                                                </div>
                                            </div></Link>
                                        </div>
                                    </>)
                                }) : (
                                    <div>
                                        <p className='text-xl md:text-2xl lg:text-3xl leading-9'>Pokemon <span className='text-white bg-gray-700 py-2 px-3 rounded-lg'>{captilizeFirstLetter(userInp)}</span>,Not found on this page maybe you can find it on next or previous page.</p>
                                    </div>
                                )
                            }
                        </div>
                        <Pagecontrols />
                    </>)
                }
            </Suspense>

        </>
    )
}

export default Allpokemons