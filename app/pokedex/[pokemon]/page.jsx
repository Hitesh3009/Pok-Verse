import React from 'react'
const captilizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1, word.length + 1).toLowerCase();
}
const Pokemon = () => {
    return (
        <>
            <div className="card border-2 border-black w-72 h-auto m-5 px-5 pt-2 overflow-hidden space-y-4 hover:cursor-pointer hover:shadow-2xl hover:shadow-lime-500 hover:transform hover:scale-105">
                <div className='flex justify-center border-2 border-black rounded-tl-[250%] rounded-bl-[130%] rounded-tr-[180%] rounded-br-[200%] h-40 items-center w-full bg-gradient-to-bl from-purple-700 via-fuchsia-200 to-sky-400'>
                    <div className="pokeImg">
                        <img src='https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_6_bug.webp&w=32&q=75' alt="Pokemon Image" className=' w-32 h-32' />
                    </div>
                </div>
                <div className="pokeName flex justify-center mt-3">
                    <span className='text-2xl text-center font-bold'>Name</span>
                </div>
                <div className="pokeType flex justify-evenly" >
                    {/* {
                        pokeVal.types.map((val) => {
                            return (<>
                                <div className="flex justify-center items-center px-2 py-2 rounded-md" style={{ backgroundColor: pokeNameColorWithIcon[val.type.name].color }}>
                                    <img src={pokeNameColorWithIcon[val.type.name].icon} alt="Pokemon Type Icon" className='border-2 border-white rounded-full w-7 h-7' />
                                    <span className={`mx-1.5 text-white`} key={val.slot} >{val.type.name}</span>
                                </div>
                            </>)
                        })
                    } */}
                    Type
                </div>
                <div className="pokeStats flex justify-between flex-wrap">
                    {/* <span>Height: {pokeVal.height}</span>
                    <span>Weight: {pokeVal.weight}</span>
                    <span>Speed: {pokeVal.stats[5].base_stat}</span>
                    <span>Experience: {pokeVal.base_experience}</span>
                    <span>Attack: {pokeVal.stats[1].base_stat}</span>
                    <span>Defense: {pokeVal.stats[2].base_stat}</span> */}
                    Stats
                </div>
                <div>
                    <span>Abilities: </span>
                    <ul className='flex flex-col mb-2 pl-2'>
                        {/* {
                            pokeVal.abilities.map(currAbility => <li className='list-disc'>{captilizeFirstLetter(currAbility.ability.name)}</li>)
                        } */}
                        Abilities list
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Pokemon