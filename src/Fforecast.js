import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Forecast.css'
import { Data } from './api';

const Fforecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const apiKey = 'ae0761fb42ce521d66ceaf54f7190240';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperical`;

    axios.get(apiUrl)
      .then(response => {
        const currentDate = new Date().toLocaleDateString();
        const uniqueDates = Array.from(new Set(response.data.list.map(item => new Date(item.dt * 1000).toLocaleDateString())));
        const filteredDates = uniqueDates.filter(date => date !== currentDate);
        const averagedForecast = averageForecastByDate(response.data.list, filteredDates);
        setForecast(averagedForecast);
      })
      .catch(error => console.error('Error fetching forecast data:', error));
  }, [city]);
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const getImgSrc = (weatherId) => {
    const weatherData = Data.find(data => data.id === weatherId);
    return weatherData ? weatherData.imgSrc : null;
  };
  const averageForecastByDate = (forecastData, dates) => {
    const averagedForecast = {};

    dates.forEach(date => {
      const filteredData = forecastData.filter(item => new Date(item.dt * 1000).toLocaleDateString() === date);

      const averageTemp = filteredData.reduce((sum, item) => sum + item.main.temp, 0) / filteredData.length;
      const averageWeather = filteredData.reduce((acc, item) => {
        if (!acc[item.weather[0].description]) {
          acc[item.weather[0].description] = 1;
        } else {
          acc[item.weather[0].description]++;
        }
        return acc;
      }, {});

      const mostCommonWeather = Object.keys(averageWeather).reduce((a, b) => (averageWeather[a] > averageWeather[b] ? a : b));

      averagedForecast[date] = {
        averageTemp,
        mostCommonWeather,
        weatherIcon: filteredData.find(item => item.weather[0].description === mostCommonWeather).weather[0].icon,
      };
    });

    return averagedForecast;
  };

  return (
    <div className='foreCast'>
      <h2>5-Day Average Weather Forecast</h2>
      <div className='data'>
        {Object.entries(forecast).map(([date, dayForecast]) => (
          <div className='day' key={date}>
            <div className='avg'>
                <p className='dateno'>Date: {date}</p>
            </div>
            <div className='desc'>
                <img
                src={getImgSrc(dayForecast.weatherIcon)}
                alt={dayForecast.mostCommonWeather}
                />
                <p className='temperature'>{dayForecast.averageTemp.toFixed(2)}&deg;F</p>
                <p>{capitalize(dayForecast.mostCommonWeather)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fforecast;