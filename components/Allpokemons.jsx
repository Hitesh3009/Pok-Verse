'use client';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

const Allpokemons = () => {
    const [pokemon, setpokemon] = useState([]);
    const [pokeImg, setpokeImg] = useState(null);
    const [pokeType, setpokeType] = useState(null);
    const [offset, setoffset] = useState(0);
    const [limit, setlimit] = useState(20);
    const [totalRes,settotalRes]=useState(0);
    const pokeNameColorWithIcon = {
        'bug': { 'color': '#94bc4a', 'icon': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm7Bb9gBY8yTat5Qk-S2XCUpJz868ih9jVJg&s' },
        'dark': { 'color': '#736c75', 'icon': '' },
        'dragon': { 'color': '#6a7baf', 'icon': '' },
        'electric': { 'color': '#e5c531', 'icon': '' },
        'fairy': { 'color': '#e397d1', 'icon': '' },
        'fighting': { 'color': '#cb5f48', 'icon': '' },
        'fire': { 'color': '#ea7a3c', 'icon': 'https://image.pngaaa.com/886/6175886-middle.png' },
        'flying': { 'color': '#7da6de', 'icon': '' },
        'ghost': { 'color': '#846ab6', 'icon': '' },
        'grass': { 'color': '#71c558', 'icon': '' },
        'ground': { 'color': '#cc9f4f', 'icon': '' },
        'ice': { 'color': '#70cbd4', 'icon': '' },
        'normal': { 'color': '#aab09f', 'icon': '' },
        'poison': { 'color': '#b468b7', 'icon': '' },
        'psychic': { 'color': '#e5709b', 'icon': '' },
        'rock': { 'color': '#b2a061', 'icon': '' },
        'steel': { 'color': '#89a1b0', 'icon': '' },
        'water': { 'color': '#539ae2', 'icon': '' },
    };
    
    const fetchImgAndType=async(fetchedRes)=>{
        let pokeImgObj = {};
        let pokeTypeObj = {};
        for (let i = 0; i < fetchedRes.length; i++) {
            let name = fetchedRes[i].name;
            let url = fetchedRes[i].url;
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
        setpokeImg(prevstate=>({...prevstate,...pokeImgObj}));
        setpokeType(prevstate=>({...prevstate,...pokeTypeObj}));
    }

    const fetchPokemon = async () => {
        const parsed = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&&limit=${limit}`);
        const data = await parsed.json();
        const fetchedRes = data.results;

        await fetchImgAndType(fetchedRes);

        // Batch updates of states
        setpokemon(data.results);
        settotalRes(data.count);
        setlimit(fetchedRes.length);
        setoffset(offset+limit);
    }

    const fetchMoreData=async()=>{
        const newParsedData=await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&&limit=${limit}`);
        const newData= await newParsedData.json();
        const newFetchedRes=newData.results;

        await fetchImgAndType(newFetchedRes);
        
        // Batch updates of states
        setlimit(newFetchedRes.length);
        setoffset(offset+limit);
        setpokemon(prevstate=>([...prevstate,...newFetchedRes]));
    }

    useEffect(() => {
        fetchPokemon();
    }, []);
    return (
        <>
            <div className="flex justify-evenly flex-wrap font-mono">
                <InfiniteScroll
                    dataLength={pokemon.length}
                    next={fetchMoreData}
                    hasMore={pokemon.length!==totalRes}
                />
                {
                    pokemon && pokemon.map((pokeVal, index) => {
                        return (<>
                            {/* bg-gradient-to-br from-teal-400 via-lime-300 to-yellow-500 */}
                            <div className="card border-2 border-black w-64 h-96 m-3 px-5 pt-2 overflow-hidden " key={index}>
                                <div className='flex justify-center border-2 border-black rounded-tl-[250%] rounded-bl-[130%] rounded-tr-[180%] rounded-br-[200%] h-36 w-full hover:rounded-b-full hover:-mt-[1.3rem] hover:cursor-pointer bg-gradient-to-bl from-purple-700 via-fuchsia-200 to-sky-400'>
                                    <div className="pokeImg">
                                        <img src={pokeImg[pokeVal.name]} alt="Pokemon Image" className=' w-32 h-32' />
                                    </div>
                                </div>
                                <div className="pokeName flex justify-center mt-3">
                                    <span className='text-2xl text-center font-bold'>{pokeVal.name.charAt(0).toUpperCase() + pokeVal.name.substr(1, pokeVal.name.length + 1)}</span>
                                </div>
                                <div className="pokeType flex justify-evenly">
                                    {
                                        pokeType[pokeVal.name] && pokeType[pokeVal.name].map((type, idx) => {
                                            return (<>
                                                <span className={`my-1 py-2 px-3 w-32 text-center mx-2 rounded-lg tracking-wide text-base text-white font-bold`} key={idx} style={{ backgroundColor: pokeNameColorWithIcon[type].color }}>{type}</span>
                                            </>)
                                        })
                                    }

                                </div>
                            </div>
                        </>)
                    })
                }
            </div>
        </>
    )
}

export default Allpokemons