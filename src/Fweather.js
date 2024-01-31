import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Data } from './api';
import { HiOutlineMapPin } from "react-icons/hi2";
const Fweather = ({ city }) => {
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
    const apiKey = 'ae0761fb42ce521d66ceaf54f7190240';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperical`;

    axios.get(apiUrl)
      .then(response => {
        setCurrentWeather(response.data);
      })
      .catch(error => console.error('Error fetching current weather data:', error));
  }, [city]);
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const getImgSrc = (weatherId) => {
    const weatherData = Data.find(data => data.id === weatherId);
    return weatherData ? weatherData.imgSrc : null;
  };
  return (
    <div className='weather'>
      <h2>Current Weather</h2>
      {currentWeather && (
        <div className='currdata'>
        <div className='place'>
          <HiOutlineMapPin className='pin'/>
          <p>{capitalize(city)},{currentWeather.sys.country}</p>
        </div>
        <p>{capitalize(currentWeather.weather[0].description)}</p>
        <div className='temp'>
          <img className='icon'
            src={getImgSrc(currentWeather.weather[0].icon)}
            alt={currentWeather.weather[0].description}
          />
          <p>{currentWeather.main.temp}&deg;F</p>
        </div>
        <p>Min: {currentWeather.main.temp_min}&deg;F</p>
        <p>Max: {currentWeather.main.temp_max}&deg;F</p>
        <div className='info'>
          <p>Humidity: {currentWeather.main.humidity}%</p>
          <p>Wind Speed: {currentWeather.wind.speed} m/s</p>
          <p>Wind Direction: {currentWeather.wind.deg}&deg;</p>
        </div>
      </div>
      )}
    </div>
  );
};

export default Fweather;