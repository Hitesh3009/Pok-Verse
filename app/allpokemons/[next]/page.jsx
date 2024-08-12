import React from 'react'
import Pagecontrols from '../../pagecontrols/page';
import CardSkeleton from '@/components/CardSkeleton';
import Link from 'next/link';
let loading = false;
let data;
const getAllPokemonData = async (offset) => {
    try {
        const res = await fetch(`http://localhost:3000/api/getallpokemons?offset=${offset}`);
        data = await res.json();
        // loading = false;
        return data;
    }
    catch (e) {
        let error_msg = 'Some error occured while fetching the data for pokemons.';
        // loading = false;
        return { data: null, message: error_msg };
    }
}

const captilizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1, word.length + 1).toLowerCase();
}

const pokeNameColorWithIcon = {
    'bug': { 'color': '#94bc4a', 'icon': 'https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_6_bug.webp&w=32&q=75' },
    'dark': { 'color': '#736c75', 'icon': 'https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_16_dark.webp&w=32&q=75' },
    'dragon': { 'color': '#6a7baf', 'icon': 'https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_15_dragon.webp&w=32&q=75' },
    'electric': { 'color': '#e5c531', 'icon': 'https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_12_electric.webp&w=32&q=75' },
    'fairy': { 'color': '#e397d1', 'icon': 'https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_17_fairy.webp&w=32&q=75' },
    'fighting': { 'color': '#cb5f48', 'icon': 'https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_1_fighting.webp&w=32&q=75' },
    'fire': { 'color': '#ea7a3c', 'icon': 'https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_9_fire.webp&w=64&q=75' },
    'flying': { 'color': '#7da6de', 'icon': 'https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_2_flying.webp&w=32&q=75' },
    'ghost': { 'color': '#846ab6', 'icon': 'https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_7_ghost.webp&w=32&q=75' },
    'grass': { 'color': '#71c558', 'icon': 'https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_11_grass.webp&w=32&q=75' },
    'ground': { 'color': '#cc9f4f', 'icon': 'https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_4_ground.webp&w=32&q=75' },
    'ice': { 'color': '#70cbd4', 'icon': 'https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_14_ice.webp&w=32&q=75' },
    'normal': { 'color': '#aab09f', 'icon': 'https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_0_normal.webp&w=32&q=75' },
    'poison': { 'color': '#b468b7', 'icon': 'https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_3_poison.webp&w=32&q=75' },
    'psychic': { 'color': '#e5709b', 'icon': 'https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_13_psychic.webp&w=32&q=75' },
    'rock': { 'color': '#b2a061', 'icon': 'https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_5_rock.webp&w=32&q=75' },
    'steel': { 'color': '#89a1b0', 'icon': 'https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_8_steel.webp&w=32&q=75' },
    'water': { 'color': '#539ae2', 'icon': 'https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_10_water.webp&w=32&q=75' },
};

// if (data) {
//     loading = true;
// }

const Allpokemons = async ({ params }) => {
    const offset = parseInt(params.next,10);
    const pokeArr = await getAllPokemonData(offset);

    return (
        <>
      
            {
                (offset>1296)?<div className='flex flex-col items-center min-h-screen'><p className='text-3xl font-bold text-center my-auto'>404 Page Not Found</p></div>:(loading ? <CardSkeleton /> : <>
                    <div className="flex justify-center flex-wrap font-mono">
                        {
                            pokeArr.length > 0 ? pokeArr.map((pokeVal) => {
                                return (<>
                                    {/* bg-gradient-to-br from-teal-400 via-lime-300 to-yellow-500 */}
                                    <div className=''>
                                        <Link href={`/pokedex/${pokeVal.name}`}><div className="card border-2 border-black w-72 h-auto md:h-[31.2rem] m-5 px-5 pt-2 overflow-y-scroll space-y-4 hover:cursor-pointer hover:shadow-2xl hover:shadow-lime-500 hover:transform hover:scale-105 scrollbar-hide ">
                                            <div className='flex justify-center border-2 border-black rounded-tl-[250%] rounded-bl-[130%] rounded-tr-[180%] rounded-br-[200%] h-36 md:h-40 items-center w-full bg-gradient-to-bl from-purple-700 via-fuchsia-200 to-sky-400'>
                                                <div className="pokeImg">
                                                    <img src={pokeVal.sprites.other.dream_world.front_default?pokeVal.sprites.other.dream_world.front_default:pokeVal.sprites.other['official-artwork'].front_default} alt="Pokemon Image" className='w-28 h-28 md:w-32 md:h-32' />
                                                </div>
                                            </div>
                                            <div className="pokeName flex justify-center mt-3">
                                                <span className='text-2xl text-center font-bold'>{captilizeFirstLetter(pokeVal.name)}</span>
                                            </div>
                                            <div className="pokeType flex justify-evenly" key={pokeVal.id}>
                                                {
                                                    pokeVal.types.map((val) => {
                                                        return (<>
                                                            <div className="flex justify-center items-center px-2 py-2 rounded-md" style={{ backgroundColor: pokeNameColorWithIcon[val.type.name].color }}>
                                                                <img src={pokeNameColorWithIcon[val.type.name].icon} alt="Pokemon Type Icon" className='border-2 border-white rounded-full w-7 h-7' />
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
                                                        pokeVal.abilities.map(currAbility => <li className='list-disc'>{captilizeFirstLetter(currAbility.ability.name)}</li>)
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

        </>
    )
}

export default Allpokemons