import React from 'react'

const CardSkeleton = () => {
    return (
        <>
            <div className='flex justify-center items-center'>
                <div className="animate-pulse card  w-72 h-auto m-5 px-5 pt-2 p-2 bg-gray-200">
                    <div className='flex justify-center   rounded-tl-[250%] rounded-bl-[130%] rounded-tr-[180%] rounded-br-[200%] h-40 items-center w-full bg-gray-300'>
                    </div>
                    <div className="pokeName flex justify-center my-3">
                        <span className='block w-3/4  p-3 bg-gray-300 rounded'></span>
                    </div>
                    <div className="pokeType flex justify-evenly">
                        <span className='block h-6 w-1/4   p-4 bg-gray-300 rounded'></span>
                        <span className='block h-6 w-1/4   p-4 bg-gray-300 rounded'></span>
                    </div>
                    <div className="flex justify-between mt-4">
                        <div className="pokeStats flex flex-col flex-wrap w-1/4">
                            <span className='  p-2 bg-gray-300 rounded w-full  h-5 my-2'></span>
                            <span className='  p-2 bg-gray-300 rounded w-full  h-5 my-2'></span>
                            <span className='  p-2 bg-gray-300 rounded w-full  h-5 my-2'></span>
                        </div>
                        <div className="pokeStats flex flex-col flex-wrap w-1/4">
                            <span className='  p-2 bg-gray-300 rounded w-full  h-5 my-2'></span>
                            <span className='  p-2 bg-gray-300 rounded w-full  h-5 my-2'></span>
                            <span className='  p-2 bg-gray-300 rounded w-full  h-5 my-2'></span>
                        </div>
                    </div>
                    <div className='flex flex-col flex-wrap mt-4'>
                        <span></span>
                        <span className='  p-2 bg-gray-300 rounded w-1/4  h-5 my-2'></span>
                        <span className='  p-2 bg-gray-300 rounded w-1/4  h-5 my-2'></span>
                        <span className='  p-2 bg-gray-300 rounded w-1/4  h-5 my-2'></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardSkeleton