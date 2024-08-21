import React from 'react';
import Image from 'next/image';
const PokemonType = ({pokeNameColorWithIcon,typeValue}) => {
    return (
        <div className='w-7 h-7 relative border-2 border-white rounded-full my-1'>
            <Image src={pokeNameColorWithIcon[typeValue].icon} alt="Pokemon Type Icon" fill sizes='auto'/>
        </div>
    )
}

export default PokemonType