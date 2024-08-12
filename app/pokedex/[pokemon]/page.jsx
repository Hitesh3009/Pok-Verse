import React from 'react';
import '../../globals.css'
import Image from 'next/image';
const captilizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1, word.length + 1).toLowerCase();
}

const getPokeData = async (pokemon) => {
    const res = await fetch(`http://localhost:3000/api/getpokemon?pokemon=${pokemon}`);
    const data = await res.json();
    return data;
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
    return (
        <>
            <div className='flex flex-col items-center md:items-start'>
                {
                    !pokeData.error ? (<div className="card border-2 border-black w-[17.5rem] md:w-72 h-auto m-5 md:mt-10 md:ml-14 px-5 pt-2 overflow-hidden space-y-4 font-mono md:animate-slideToLeft animate-slideToBottom">
                        <div className='flex justify-center border-2 border-black rounded-tl-[250%] rounded-bl-[130%] rounded-tr-[180%] rounded-br-[200%] h-36 md:h-40 items-center w-full bg-gradient-to-bl from-purple-700 via-fuchsia-200 to-sky-400'>
                            <div className="pokeImg w-28 h-28 md:w-32 md:h-32 relative">
                                <Image src={pokeData.sprites.other.dream_world.front_default ? pokeData.sprites.other.dream_world.front_default : pokeData.sprites.other['official-artwork'].front_default} alt="Pokemon Image" fill />
                            </div>
                        </div>
                        <div className="pokeName flex justify-center mt-3">
                            <span className='text-2xl text-center font-bold'>{captilizeFirstLetter(pokeData.name)}</span>
                        </div>
                        <div className="pokeType flex justify-evenly" >
                            {
                                pokeData.types.map((val) => {
                                    return (<>
                                        <div className="flex items-center px-2 py-2 rounded-md" style={{ backgroundColor: pokeNameColorWithIcon[val.type.name].color }}>
                                            <div className='w-7 h-7 relative'>
                                                <Image src={pokeNameColorWithIcon[val.type.name].icon} alt="Pokemon Type Icon" className='border-2 border-white rounded-full' fill />
                                            </div>
                                            <span className={`mx-1.5 text-white`} key={val.slot} >{val.type.name}</span>
                                        </div>
                                    </>)
                                })
                            }

                        </div>
                        <div className="pokeStats flex justify-between flex-wrap">
                            <span>Height: {pokeData.height}</span>
                            <span>Weight: {pokeData.weight}</span>
                            <span>Speed: {pokeData.stats[5].base_stat}</span>
                            <span>Experience: {pokeData.base_experience}</span>
                            <span>Attack: {pokeData.stats[1].base_stat}</span>
                            <span>Defense: {pokeData.stats[2].base_stat}</span>
                        </div>
                        <div>
                            <span>Abilities: </span>
                            <ul className='flex flex-col mb-2 pl-2'>
                                {
                                    pokeData.abilities.map(currAbility => <li className='list-disc'>{captilizeFirstLetter(currAbility.ability.name)}</li>)
                                }
                            </ul>
                        </div>
                    </div>) : <>
                        <div className="flex flex-col items-center min-h-screen">
                            <p className='text-3xl font-bold my-auto'>{pokeData.error}</p>
                        </div>
                    </>
                }
            </div>

        </>
    )
}

export default Pokemon