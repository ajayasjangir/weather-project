import React from 'react'
import { IconUrl } from '../Services/Weather'

const Forecast = ({title, items }) => {
  return (
    <div>
       
        <div className='flex flex-wrap md:flex-row  md:items-center justify-center text-black'>

          {items.map(item  =>(

            <div key={item.title}  className='flex flex-col px-4 items-center mx-2 mb-5 justify-center border border-neutral-700 bg-transparent shadow-xl shadow-neutral-800 w-[90px] md:w-[100px] rounded-[30px] '>
                <p  className='font-bold text-sm '> {item.title}</p>
                <img src={IconUrl(item.icon)} alt="img" className='w-20 ' />
                <p className='font-medium'>{`${(item.temp - 273.15).toFixed()}°C`}</p>
            </div>
          ))}
        </div>
    </div>  
  )
}

export default Forecast