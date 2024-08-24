import React from 'react';
import Image from 'next/image';
import PokemonType from './PokemonType';
const Cards = ({ pokeVal, capitalizeFirstLetter, pokeNameColorWithIcon ,individualPokecard}) => {
    return (
        <div className={`"card border-2 border-black w-[17.5rem] md:min-w-[18.5rem] h-auto ${individualPokecard===true?'h-auto':'sm:h-[30.5rem] overflow-y-scroll'} m-[1.4rem] px-5 pt-2 space-y-4 ${individualPokecard===true?'md:animate-slideToLeft animate-slideToBottom':'hover:cursor-pointer hover:shadow-2xl hover:shadow-lime-500 hover:transform hover:scale-105'} scrollbar-hide`}>
            <div className='flex justify-center border-2 border-black rounded-tl-[250%] rounded-bl-[130%] rounded-tr-[180%] rounded-br-[200%] h-36 md:h-40 items-center w-full bg-gradient-to-bl from-purple-700 via-fuchsia-200 to-sky-400'>
                <div className="pokeImg w-28 h-28 md:w-32 md:h-32 relative">
                    <Image src={pokeVal.sprites.other.dream_world.front_default!==null ? pokeVal.sprites.other.dream_world.front_default : pokeVal.sprites.other['official-artwork'].front_default} alt="Pokemon Image" fill sizes='auto' priority={true} />
                </div>
            </div>
            <div className="pokeName flex justify-center mt-3">
                <span className='text-2xl text-center font-bold'>{capitalizeFirstLetter(pokeVal.name)}</span>
            </div>
            <div className="pokeType flex justify-evenly" key={pokeVal.id}>
                {
                    pokeVal.types.map((val,index) => {
                        return (
                            <div className="flex items-center px-2 py-0.5 rounded-md" style={{ backgroundColor: pokeNameColorWithIcon[val.type.name].color }} key={index}>
                                <PokemonType pokeNameColorWithIcon={pokeNameColorWithIcon} typeValue={val.type.name}/>
                                <span className={`mx-1.5 text-white`} key={val.slot} >{capitalizeFirstLetter(val.type.name)}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div className="pokeStats flex justify-between flex-wrap px-2">
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
                        pokeVal.abilities.map((currAbility, index) => <li className='list-disc' key={index}>{capitalizeFirstLetter(currAbility.ability.name)}</li>)
                    }
                </ul>
            </div>
        </div>
                
    )
}

export default Cards