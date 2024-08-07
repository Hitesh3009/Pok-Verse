'use client';
import React, { useEffect, useState } from 'react'


const Allpokemons = () => {
    const [pokemon, setpokemon] = useState([]);
    const [pokeImg, setpokeImg] = useState(null);
    const [pokeType, setpokeType] = useState(null);
    const fetchPokemon = async () => {
        const pokeImgObj = {};
        let pokeTypeObj = {};
        const parsed = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await parsed.json();
        // console.log(data.results);
        setpokemon(data.results);
        for (let i = 0; i < data.results.length; i++) {
            let name = data.results[i].name;
            let url = data.results[i].url;
            const pokeDetails = await fetch(url);
            const individualPokeData = await pokeDetails.json();
            pokeImgObj[name] = individualPokeData.sprites.other.home.front_default;

            for (let j = 0; j < individualPokeData.types.length; j++) {
                if (!(name in pokeTypeObj))
                    pokeTypeObj[name] = [individualPokeData.types[j].type.name];
                else
                    pokeTypeObj[name].push(individualPokeData.types[j].type.name);
            }
        }
        setpokeImg(pokeImgObj);
        setpokeType(pokeTypeObj);
        // console.log(pokeType);
        // console.log(pokeImg);
    }

    useEffect(() => {
        fetchPokemon();
    }, []);
    return (
        <>
        <div className="flex justify-evenly flex-wrap font-mono">
            {
                pokemon && pokemon.map((pokeVal, index) => {
                    return (<>
                    {/* bg-gradient-to-br from-teal-400 via-lime-300 to-yellow-500 */}
                        <div className="card border-2 border-black w-64 h-96 mt-5 mx-4 px-5 pt-2 overflow-hidden space-y-4" key={index}>
                            <div className='flex justify-center border-2 border-black rounded-tl-[250%] rounded-bl-[130%] rounded-tr-[180%] rounded-br-[200%] h-36 w-full hover:rounded-b-full hover:-mt-[1.3rem] hover:cursor-pointer bg-gradient-to-bl from-purple-700 via-fuchsia-200 to-sky-400'>
                                <div className="pokeImg">
                                    <img src={pokeImg[pokeVal.name]} alt="Pokemon Image" className=' w-32 h-32' />
                                </div>
                            </div>
                            <div className="pokeName flex justify-center mt-3">
                                <span className='text-2xl text-center font-bold'>{pokeVal.name.charAt(0).toUpperCase()+pokeVal.name.substr(1,pokeVal.name.length+1)}</span>  
                            </div>
                            <div className="pokeType flex justify-evenly">
                                {
                                    pokeType[pokeVal.name].map((type,idx)=>{
                                        return (<>
                                            <span className='my-1 bg-red-500 text-white py-2 px-3 w-32 text-center mx-2 rounded-lg tracking-wide text-base' key={idx}>{type}</span>                                           
                                        </>)
                                    })
                                }
                                
                            </div>
                        </div>
                    </>)
                })
            }
        </div>
            {/* <div className="card border-2 border-black w-72 h-56">

                <div className="pokeImg">

                   
                </div>
                <div className="pokeName">

                </div>
                <div className="pokeType">

                </div>
                <div className="pokeDetails">

                </div>
            </div> */}
        </>
    )
}

export default Allpokemons