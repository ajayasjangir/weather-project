
import { useEffect, useState } from 'react';
import backgroundImage from './images/Weather.jpg';
import Forecast from './Components/Forecast';

import Inputs from './Components/Inputs';
import TemperatureDetails from './Components/TemperatureDetails';
import Time from './Components/Time'
import FormattedData from './Services/Weather';


function App() {

  const [weather, setWeather] = useState(null);

  const [query, setQuery] = useState({ lat: null, lon: null });

useEffect(() => {
  const fetchWeather = async () => {
    // If lat and lon are not set in query, get the user's location
    if (query.lat === null && query.lon === null) {
      try {
        const { state } = await navigator.permissions.query({ name: 'geolocation' });
        if (state === 'granted') {
          const { coords } = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          setQuery({ lat: coords.latitude, lon: coords.longitude });
        } else if (state === 'prompt') {
          await navigator.permissions.request({ name: 'geolocation' });
        }
      } catch (error) {
        console.error(error);
      }
    }
    // Fetch weather data
    await FormattedData({ ...query }).then((data) => {
      setWeather(data)
    });
  };
  fetchWeather();
}, [query]);


  

  return (
    <div className='mx-auto   py-5 px-4 min-h-[150vh] md:min-h-screen' style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Inputs setQuery={setQuery} />
      <div className='mx-auto my-8 max-w-screen-md h-[380px] md:h-[353px]  rounded-[25px] py-2 px-3 bg-transparent   shadow-lg shadow-neutral-800 '>

        {weather && (
          <>
            <Time weather={weather} />
           
<div className='my-[50px] md:my-[12px] flex flex-col space-y-5 '>
            <TemperatureDetails weather={weather} />

            <Forecast title="Daily Weather" items={weather.daily} />
</div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
