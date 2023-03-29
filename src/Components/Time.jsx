import React from 'react'
import { FormatToLocalTime, IconUrl } from '../Services/Weather'

const Time = ({weather:{dt, timezone, name, country, icon, details, temp}}) => {
    const celsiusTemp = Math.round(temp - 273.15);
  
    return (
        <div>
            <div className='flex items-center justify-center my-3  md:my-3'>

                <p className='text-white text-sm md:text-xl font-extralight '>
                    {FormatToLocalTime(dt, timezone)}
                </p>
            </div>

            <div className='flex flex-row items-start  justify-center space-x-1 md:space-x-8'>
            <img src={IconUrl(icon)} alt="img" className='w-32 md:w-36' />
            <div className='flex  flex-col justify-start my-2 mt-5 space-y-1'>
                <p className='text-black font-medium text-xl'>Today</p>
            <p className='text-black text-2xl md:text-4xl font-bold '>
                   {`${name}, ${country}`}

                </p>
                <p className='text-[12px] md:text-xl text-gray-900 font-medium'>Temperature: {`${celsiusTemp.toFixed()}°`}</p>
                <p className=' py-1 text-sm md:text-xl text-gray-900 font-medium '>
                    {details}
                </p> 
            </div>
            </div>
        </div>
    )
}

export default Time

