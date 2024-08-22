import React, { Suspense } from 'react';
import Loading from './loading';
const Regions = async () => {
  const getPokemonsFromRegion = async () => {
    const res = await fetch('http://localhost:3000/api/regions');
    const data = await res.json();
    return data;
  }

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1, word.length + 1).toLowerCase();
  }

  const allSpecies = await getPokemonsFromRegion();
  const regions = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar', 'Paldea'];
  return (
    <Suspense fallback={<Loading/>}>
      <div className='flex justify-evenly items-center my-6 flex-wrap'>
        {
          regions.map((region, index) => {
            return (<button className="region bg-red-500 w-20 h-10 mx-2 my-2 text-white rounded-xl" key={index}>{region}</button>);
          })
        }
      </div>
      <div className='flex flex-wrap justify-evenly p-10'>
        {
          allSpecies.length>0&&allSpecies.map(val => {
            return (
              <div className='flex items-center flex-col card border-[3px] border-black my-5 shadow-xl shadow-yellow-300'>
                <div className='flex justify-center w-44 h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 p-2.5 bg-gray-700'>
                  <img src={val.images.dream_world.front_default ? val.images.dream_world.front_default : val.images['official-artwork'].front_default} alt="Pokemon Image" className='' />
                </div>
                <div className='border-2 border-t-black w-full'>
                  <p className='text-sm md:text-base lg:text-lg text-center'>{capitalizeFirstLetter(val.name)}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </Suspense>
  )
}

export default Regions