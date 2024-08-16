import React, { useState } from 'react';
import './weather.css';
import search_icon from './search_icon.png';
import cloud from './cloud.png';
import humidity from './humidity.png'
import wind from './wind.png'
import snow from './snow.png'
import drizzle from './drizzle.png'
import rain from './rain.png'
import clear from './clear.png'
const Weather = () => {
  let api_key = 'cdd1c817e983bf205d0077b6d8848e74';
  const [icon,setIcon] = useState(clear);
  const search = async () => {
    const element = document.getElementsByClassName('cityinput')
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName('humidity-percent');
    const wind = document.getElementsByClassName('wind-rate');
    const temperature = document.getElementsByClassName('weather-temp');
    const location = document.getElementsByClassName('weather-location')
    humidity[0].innerHTML = data.main.humidity + '%';
    wind[0].innerHTML = data.wind.speed + 'km/h';
    temperature[0].innerHTML = data.main.temp + 'c';
    location[0].innerHTML = data.name;
    if(data.weather[0].icon==='01d' || data.weather[0].icon==='01n')
    {
      setIcon(clear);
    }
    else if(data.weather[0].icon==='02d' || data.weather[0].icon==='02n')
    {
      setIcon(cloud);
    }
    else if(data.weather[0].icon==='03d' || data.weather[0].icon==='03n')
    {
      setIcon(drizzle);
    }
    else if(data.weather[0].icon==='04d' || data.weather[0].icon==='04n')
    {
      setIcon(rain);
    }
    else if(data.weather[0].icon==='09d' || data.weather[0].icon==='09n')
    {
      setIcon(snow);
    }
    else{
      setIcon(clear);
    }
  }
  return (
    <div className='container'>
      <div className='top-bar'>
        <input type='text' className='cityinput' placeholder='search' />
        <div className='search-icon' onClick={() => { search() }}>
          <img src={search_icon} alt='' />
        </div>
      </div>
      <div className='weather-image'>
        <img src={icon} alt='' />
      </div>
      <div className='weather-temp'>24c</div>
      <div className='weather-location'>London</div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity} alt='' />
          <div className='data'>
            <div className='humidity-percent'>64%</div>
            <div className='text'>humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={wind} alt='' />
          <div className='data'>
            <div className='wind-rate'>18km/h</div>
            <div className='text'>windspeed</div>
          </div>
        </div>

      </div>
    </div>
  )
}
export default Weather
