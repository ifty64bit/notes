import React from 'react'
import { IconContext } from 'react-icons';
import { RiDeleteBin6Line } from 'react-icons/ri';

function Card({children, onClick, data, del}) {
    return (
        <div className=' w-40 h-40 max-h-48 group bg-yellow-200 p-2 rounded-md shadow-md mr-4 mt-4 flex flex-col'>
            <div onClick={()=>onClick(data)}>
                {children}
            </div>
            <div onClick={()=>del(data.id)} className='w-[calc(100%+1rem)] overflow-hidden justify-self-center mt-auto cursor-pointer bg-red-600 -m-2 rounded-b-md scale-y-0 group-hover:py-1 group-hover:scale-y-100 transition-all group-hover:duration-150 ease-in-out'>
                <IconContext.Provider value={{className:"mx-auto"}}>
                    <RiDeleteBin6Line />
                </IconContext.Provider>
            </div>
        </div>
    )
}

export default Card
