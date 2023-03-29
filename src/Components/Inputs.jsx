import React, { useState } from 'react'
import { UilSearch } from '@iconscout/react-unicons'

function Inputs({ setQuery }) {
  const [city, setCity] = useState('')

  const handleSearch = () => {
    if (city !== '') setQuery({ q: city })
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

 

  return (
    <div className='flex flex-row justify-center my-1    md:mx-10'>
      <div className='flex flex-row w-3/4 items-center justify-center space-x-4 '>
        <input
          value={city}
          onChange={(e) =>
            setCity(
              e.currentTarget.value.charAt(0).toUpperCase() +
                e.currentTarget.value.slice(1)
            )
          }
          onKeyPress={handleKeyPress} // added event listener for key press
          type='text'
          placeholder='Enter a City...'
          className='text-sm rounded-[15px] px-3 md:px-5 py-[6px] font-medium focus:outline-none w-full md:w-full shadow-xl   '
        />
        <UilSearch
          onClick={handleSearch}
          className='text-white cursor-pointer text-xl transition ease-out hover:scale-125 '
        />
      
      </div>
    </div>
  )
}

export default Inputs
