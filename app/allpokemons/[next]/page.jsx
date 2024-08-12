import React from 'react'
import Pagecontrols from '../../pagecontrols/page';

const getAllPokemonData=async(offset)=>{
    const res=await fetch(`http://localhost:3000/api/getallpokemons?offset=${offset}`);
    const data=await res.json();
    return data;
}

const Allpokemons = async({params}) => {
    const offset=params.next;
    const pokeArr=await getAllPokemonData(offset);
    // console.log(pokeArr);
    
  return (
    <div>
        {
            pokeArr.map(poke=>{
                return(<div>
                    {poke.name}
                </div>)
            })
        }
        <Pagecontrols/>
    </div>
  )
}

export default Allpokemons