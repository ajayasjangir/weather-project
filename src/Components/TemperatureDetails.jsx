import React from 'react'
import {UilArrowUp, UilArrowDown, UilSun, UilSunset} from '@iconscout/react-unicons'
import { FormatToLocalTime} from '../Services/Weather'

const TemperatureDetails = ({weather: { temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone}}) => {
   
    
    return (
        <div >
          


<div className='flex flex-wrap md:flex-row items-center justify-center space-x-2 text-white text-sm py-1 '>
    <UilSun/>
    <p className='font-light text-sm'>Sunrise: <span className='font-medium text-sm ml-1'>{FormatToLocalTime(sunrise, timezone, 'hh:mm a')} </span></p>
    
    <UilSunset/>
    <p className='font-light'>Sunset : <span className='font-medium ml-1'>{FormatToLocalTime(sunset, timezone, 'hh:mm a')}  </span></p>
    
    <UilArrowUp/>
    <p className='font-light'>High: <span className='font-medium ml-1'>{`${(temp_max- 273.15).toFixed()}°`} </span></p>
    
    <UilArrowDown/>
    <p className='font-light'>Down: <span className='font-medium ml-1'>{`${(temp_min- 273.15).toFixed()}°`}  </span></p>
   
</div>
        </div>
    )
}

export default TemperatureDetails