import React from 'react';

const Regions = async() => {
  const getPokemonsFromRegion = async()=>{
    const res= await fetch('http://localhost:3000/api/regions');
    const data=await res.json();
    return data;
  }

  const allSpecies=await getPokemonsFromRegion();
  
  return (
    <div>
      {
        allSpecies.map(val=>{
          return(
            <div>
              <img src={val.images.dream_world.front_default?val.images.dream_world.front_default:val.images['official-artwork'].front_default} alt="Pokemon Image" width={100} height={100}/>
              <p>{val.name}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Regions