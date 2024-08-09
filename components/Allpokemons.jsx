'use client';
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

const Allpokemons = () => {
    const [pokemon, setpokemon] = useState([]);
    const [pokeImg, setpokeImg] = useState(null);
    const [pokeType, setpokeType] = useState(null);
    const [next, setnext] = useState('');
    const [totalRes, settotalRes] = useState(0);
    const [userInp, setuserInp] = useState('');
    const [specificPokeInfo, setspecificPokeInfo] = useState(null);
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

    const handleUserInp = (e) => {
        setuserInp(e.target.value);
    }

    const fetchImgAndType = async (fetchedRes) => {
        try {
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
            setpokeImg(prevstate => ({ ...prevstate, ...pokeImgObj }));
            setpokeType(prevstate => ({ ...prevstate, ...pokeTypeObj }));
        } catch (err) {
            return { error: 'Some error occured while fetching the pokemon iamges and types.' };
        }

    }

    const fetchPokemon = async () => {
        // if(!userInp) return userInp.trim();
        try {
            const parsed = await fetch(`https://pokeapi.co/api/v2/pokemon/${userInp}`);
            const data = await parsed.json();
            const fetchedRes = data.results;
            console.log(fetchedRes);

            await fetchImgAndType(fetchedRes);

            // Batch updates of states
            setpokemon(data.results);
            settotalRes(data.count);
            setnext(data.next)
        } catch (err) {
            return { error: 'Some error occured while fetching the pokemon data.' };
        }
    }

    const fetchSpecificPoke = async () => {
        if (!userInp.trim()) return;
        try {
            const parsed = await fetch(`https://pokeapi.co/api/v2/pokemon/${userInp}`);
            const data = await parsed.json();
            console.log(data);
            let typesArr = [];
            data.types.forEach(ele => {
                typesArr.push(ele.type.name);
            })
            const pokeInfoObj = {
                name: data.name,
                img: data.sprites.other.home.front_default,
                types: typesArr
            }
            setspecificPokeInfo(pokeInfoObj);
            // console.log(specificPokeInfo);
        } catch (err) {
            return { error: `Some error occured while fetching data for ${userInp}.` };
        }
    }

    const fetchMoreData = async () => {
        try {
            const newParsedData = await fetch(next);
            const newData = await newParsedData.json();
            const newFetchedRes = newData.results;

            await fetchImgAndType(newFetchedRes);

            // Batch updates of states
            setpokemon(prevstate => ([...prevstate, ...newFetchedRes]));
            setnext(newData.next);
        } catch (err) {
            return { error: 'Some error occured while fetching the additional pokemon data.' };
        }
    }

    const captilizeFirstLetter=(word)=>{
        return word.charAt(0).toUpperCase()+word.slice(1,word.length+1).toLowerCase();
    }
    useEffect(() => {
        fetchPokemon();
    }, [userInp]);

    // useEffect(() => {
    //     specificPokeInfo;
    //     fetchSpecificPoke()
    // }, [userInp]);
    return (
        <>
            <div className="searchPokemon flex flex-col space-y-4 mb-3">
                <label htmlFor="pokemonName" className='text-3xl text-center font-bold font-mono'>Search Pokemon</label>
                <input type="text" name="pokemonName" id="pokemonName" aria-placeholder='Search Pokemon' className='outline-none border-2 border-b-black w-[25vw] pl-3 focus:transition focus:border-[3px] focus:border-b-red-400 focus:shadow-lg focus:shadow-yellow-300 rounded-md delay-300' value={userInp} onChange={handleUserInp} />
            </div>

            <div className="flex justify-center space-x-6 flex-wrap font-mono">
                <InfiniteScroll
                    dataLength={pokemon.length}
                    next={fetchMoreData}
                    hasMore={pokemon.length !== totalRes}
                />
                {
                    pokemon && pokemon.map((pokeVal, index) => {
                        return (<>
                            {/* bg-gradient-to-br from-teal-400 via-lime-300 to-yellow-500 */}
                            <div className="card border-2 border-black w-72 h-96 m-3 px-5 pt-2 overflow-hidden space-y-4" key={index}>
                                <div className='flex justify-center border-2 border-black rounded-tl-[250%] rounded-bl-[130%] rounded-tr-[180%] rounded-br-[200%] h-36 w-full hover:rounded-b-full hover:-mt-[1.3rem] hover:cursor-pointer bg-gradient-to-bl from-purple-700 via-fuchsia-200 to-sky-400'>
                                    <div className="pokeImg">
                                        <img src={pokeImg[pokeVal.name]} alt="Pokemon Image" className=' w-32 h-32' />
                                    </div>
                                </div>
                                <div className="pokeName flex justify-center mt-3">
                                    <span className='text-2xl text-center font-bold'>{captilizeFirstLetter(pokeVal.name)}</span>
                                </div>
                                <div className="pokeType flex justify-evenly">
                                    {
                                        pokeType[pokeVal.name] && pokeType[pokeVal.name].map((type, idx) => {
                                            return (<>
                                                <div className="flex justify-center items-center px-2 py-2 rounded-md" style={{ backgroundColor: pokeNameColorWithIcon[type].color }}>
                                                    <img src={pokeNameColorWithIcon[type].icon} alt="Pokemon Type Icon" className='border-2 border-white rounded-full w-7 h-7' />
                                                    <span className={`mx-1.5 text-white`} key={idx} >{type}</span>
                                                </div>
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