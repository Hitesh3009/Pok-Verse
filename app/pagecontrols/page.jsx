'use client';
import React, { useState,useEffect } from 'react';
import { useRouter, useParams} from 'next/navigation';
const Pagecontrols = () => {
  const router=useRouter(); // use to navigate to the specified endpoint
  const {page}=useParams(); // to get the current page number
  const initialPgNo = parseInt(page, 10) || 1; // passes the current page number as initial page number,if not available then passes 1
  const [pageNo,setPageNo] = useState(initialPgNo); // state to set the page number

  useEffect(() => {
    setPageNo(initialPgNo); // sets the page number,depending on the current page number obtained from the initialPgNo variable
  }, [initialPgNo]);
  

  //handles the navigation for the previous page
  const handlePrevClick = () => {
    const newPageNo= Math.max(1,pageNo - 1); // navigates to the previous page and handles the negative page number
    setPageNo(newPageNo); // sets the new page number
    router.replace(`/allpokemons/${parseInt(newPageNo,10)}`); // replaces the current url with the new one consisting the updated page number
  };

  const handleNextClick = () => {
    const newPageNo=pageNo+1; // navigates to the next page
    setPageNo(newPageNo); // sets the new page number
    router.replace(`/allpokemons/${parseInt(newPageNo,10)}`); // replaces the current url with the new one consisting the updated page number
  };

  return (
    <div className='contentNavigation mb-5 space-x-36 flex justify-evenly'>
      {/* disables the prev button if the page is the first page and changes its bg color as gray */}
     <button disabled={pageNo===1} className={`${pageNo===1?'bg-gray-500':'bg-black'} text-white px-3 py-2 rounded-md text-center w-20`} onClick={handlePrevClick}>&larr;Prev</button>

      {/* disables the next button if the page is the last page and changes its bg color as gray */}
     <button disabled={pageNo>108} className={`${pageNo>108?'bg-gray-600':'bg-black'} text-white px-3 py-2 rounded-md text-center w-20`} onClick={handleNextClick}>Next&rarr;</button>
    </div>
  )
}

export default Pagecontrols