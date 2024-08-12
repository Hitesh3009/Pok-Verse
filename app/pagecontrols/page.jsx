'use client'
import React, { useState,useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'
const Pagecontrols = () => {
  const router=useRouter();
  const {next}=useParams();
  const initialOffset = parseInt(next, 10) || 0;
  const [offset, setOffset] = useState(initialOffset);

  useEffect(() => {
    setOffset(initialOffset); 
  }, [initialOffset]);
  
  const handlePrevClick = () => {
    const newOffset = Math.max(0, offset - 8);
    setOffset(newOffset);
    router.replace(`/allpokemons/${newOffset}`);
  };

  const handleNextClick = () => {
    const newOffset = offset + 8;
    setOffset(newOffset);
    router.replace(`/allpokemons/${newOffset}`);
  };

  return (
    <div>

     <button className={`bg-black text-white px-3 py-2 rounded-md text-center w-20`} onClick={handlePrevClick}>&larr;Prev</button>
     <button className={`bg-black text-white px-3 py-2 rounded-md text-center w-20`} onClick={handleNextClick}>Next&rarr;</button>
    </div>
  )
}

export default Pagecontrols