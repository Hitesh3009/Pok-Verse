import React from 'react';

// Design of the skeleton card that is to be displayed until the data is loaded
const CardSkeleton = () => {
    return (
        <>
            <div className='flex justify-center items-center'>
                {/* card layout */}
                <div className="animate-pulse card  w-72 h-auto m-5 px-5 pt-2 p-2 bg-gray-200">

                    {/* pokemon image layout */}
                    <div className='flex justify-center rounded-tl-[250%] rounded-bl-[130%] rounded-tr-[180%] rounded-br-[200%] h-40 items-center w-full bg-gray-300'>
                    </div>

                    {/* pokemon name layout */}
                    <div className="pokeName flex justify-center my-3">
                        <span className='block w-3/4  p-3 bg-gray-300 rounded'></span>
                    </div>

                    {/* pokemon type layout */}
                    <div className="pokeType flex justify-evenly">
                        <span className='block h-6 w-1/4   p-4 bg-gray-300 rounded'></span>
                        <span className='block h-6 w-1/4   p-4 bg-gray-300 rounded'></span>
                    </div>

                    {/* pokemon stats layout */}
                    <div className="flex justify-between mt-4">
                        <div className="pokeStats flex flex-col flex-wrap w-1/4">
                            <span className='p-2 bg-gray-300 rounded w-full  h-5 my-2'></span>
                            <span className='p-2 bg-gray-300 rounded w-full  h-5 my-2'></span>
                            <span className='p-2 bg-gray-300 rounded w-full  h-5 my-2'></span>
                        </div>
                        <div className="pokeStats flex flex-col flex-wrap w-1/4">
                            <span className='p-2 bg-gray-300 rounded w-full  h-5 my-2'></span>
                            <span className='p-2 bg-gray-300 rounded w-full  h-5 my-2'></span>
                            <span className='p-2 bg-gray-300 rounded w-full  h-5 my-2'></span>
                        </div>
                    </div>

                    {/* pokemon abilities layout */}
                    <div className='flex flex-col flex-wrap mt-4'>
                        <span></span>
                        <span className='p-2 bg-gray-300 rounded w-1/4  h-5 my-2'></span>
                        <span className='p-2 bg-gray-300 rounded w-1/4  h-5 my-2'></span>
                        <span className='p-2 bg-gray-300 rounded w-1/4  h-5 my-2'></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardSkeleton;