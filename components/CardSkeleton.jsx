import React from 'react'

const cardSkeleton = () => {
    return (
        <>
            <div className='flex justify-center items-center'>
                <div className="animate-pulse card border-2 border-gray-400 w-80 h-auto m-5 px-5 pt-2 p-2">
                    <div className='flex justify-center border-2 border-gray-500 rounded-tl-[250%] rounded-bl-[130%] rounded-tr-[180%] rounded-br-[200%] h-40 items-center w-full bg-gray-200'>
                        <div className="pokeImg">

                        </div>
                    </div>
                    <div className="pokeName flex justify-center my-3">
                        <div className='w-40 border-2 border-black p-3 bg-gray-200 rounded-lg'></div>
                    </div>
                    <div className="pokeType flex justify-evenly">
                        <div className='w-56 border-2 border-black p-4 bg-gray-200 rounded-lg'></div>
                    </div>
                    <div className="pokeStats flex justify-between flex-wrap">
                        <span className='border-2 border-black p-2 bg-gray-200 rounded-lg mx-4 w-20 my-2'></span>
                        <span className='border-2 border-black p-2 bg-gray-200 rounded-lg mx-4 w-20 my-2'></span>
                        <span className='border-2 border-black p-2 bg-gray-200 rounded-lg mx-4 w-20 my-2'></span>
                        <span className='border-2 border-black p-2 bg-gray-200 rounded-lg mx-4 w-20 my-2'></span>
                        <span className='border-2 border-black p-2 bg-gray-200 rounded-lg mx-4 w-20 my-2'></span>
                        <span className='border-2 border-black p-2 bg-gray-200 rounded-lg mx-4 w-20 my-2'></span>

                    </div>
                    <div className='flex flex-col flex-wrap mt-4'>
                        <span></span>
                        <span className='border-2 border-black p-2 bg-gray-200 rounded-lg mx-4 w-20 my-2'></span>
                        <span className='border-2 border-black p-2 bg-gray-200 rounded-lg mx-4 w-20 my-2'></span>
                        <span className='border-2 border-black p-2 bg-gray-200 rounded-lg mx-4 w-20 my-2'></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default cardSkeleton