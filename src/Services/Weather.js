import { DateTime } from "luxon";

const API_KEY = "34480b98aa332da53123a0ac63a4ea9d";
const BASE_URL = "https://api.openweathermap.org/data/2.5";


const getWeatherData = (infoType, searchParams)=>{
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY})

    return fetch(url).then((res)=> res.json());
};

const formatCurrentWeather = (data) =>{
    const {
        coord: {lat, lon},
        main: {temp, temp_min, temp_max},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
       
    } = data

const {main: details, icon} = weather[0];

    return {lat, lon, temp, temp_min, temp_max, name, dt, country, sunrise, sunset, details, icon}
}

const formatForecast = (data) => {
    let {timezone, daily} = data;
    daily = daily.slice(1,6).map(d => {
        return {
            title: FormatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    });

   

    return {timezone, daily}
}

const FormattedData = async (searchParams = {}) => {
    const { coords } = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const { latitude, longitude } = coords;
    searchParams = {
        ...searchParams,
        lat: latitude,
        lon: longitude,
    };

    const formattedCurrentData = await getWeatherData('weather', searchParams).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentData;

    const FormattedForecast = await getWeatherData("onecall",{ lat, lon, exclude: 'current, minutely,alerts', units:searchParams.units}).then(formatForecast);

    return {...formattedCurrentData, ...FormattedForecast};
};



const FormatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy'  Time: 'hh:mm a") => {
  return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
}


const IconUrl = (code) =>`http://openweathermap.org/img/wn/${code}@2x.png`

export default FormattedData;

export {FormatToLocalTime, IconUrl};

