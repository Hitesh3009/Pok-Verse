import React from 'react';
import Image from 'next/image';

// Component used to display the pokemon type color with the respective icon of type. It recieves 2 props
const PokemonType = ({pokeNameColorWithIcon,typeValue}) => {
    return (
        <div className='w-7 h-7 relative border-2 border-white rounded-full my-1.5'>
            <Image src={pokeNameColorWithIcon[typeValue].icon} alt="Pokemon Type Icon" fill sizes='auto'/>
        </div>
    )
}

export default PokemonType;