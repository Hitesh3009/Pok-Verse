import React from 'react';
import Image from 'next/image';

// Component used to display the pokemon type color with the respective icon of type. It recieves 2 props
const PokemonType = ({pokeNameColorWithIcon,typeValue}) => {
    return (
            <Image src={pokeNameColorWithIcon[typeValue].icon} width={4} height={3} className='w-7 h-7 border-2 border-white rounded-full my-1.5' alt="Pokemon Type Icon" priority={true}/>
    )
}

export default PokemonType;