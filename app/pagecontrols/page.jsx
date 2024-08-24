'use client'
import React, { useState,useEffect } from 'react';
import { useRouter, useParams} from 'next/navigation'
const Pagecontrols = () => {
  const router=useRouter();
  const {page}=useParams();
  const initialPgNo = parseInt(page, 10) || 1;
  const [pageNo,setPageNo] = useState(initialPgNo);

  useEffect(() => {
    setPageNo(initialPgNo); 
  }, [initialPgNo]);
  

  const handlePrevClick = () => {
    const newPageNo= Math.max(1,pageNo - 1);
    setPageNo(newPageNo);
    router.replace(`/allpokemons/${parseInt(newPageNo,10)}`);
  };

  const handleNextClick = () => {
    const newPageNo=pageNo+1;
    setPageNo(newPageNo);
    router.replace(`/allpokemons/${parseInt(newPageNo,10)}`);
  };

  return (
    <div className='contentNavigation mb-5 space-x-36 flex justify-evenly'>
     <button disabled={pageNo===1} className={`${pageNo===1?'bg-gray-500':'bg-black'} text-white px-3 py-2 rounded-md text-center w-20`} onClick={handlePrevClick}>&larr;Prev</button>
     <button disabled={pageNo>108} className={`${pageNo>108?'bg-gray-600':'bg-black'} text-white px-3 py-2 rounded-md text-center w-20`} onClick={handleNextClick}>Next&rarr;</button>
    </div>
  )
}

export default Pagecontrols