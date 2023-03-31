import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faThermometerHalf, faTint, faWind, faClock } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [error, setError] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7c26aeb3ee65b1a2722d800ffecc915d`);
      setWeather(response.data);
    } catch (error) {
      setError('City not found!');
      setWeather(null);
    }
  };

  const convertToCelsius = (temp) => {
    return (temp - 273.15).toFixed(2);
  }

  return (
    <div className="container">
      <h1 className="title">Weather App</h1>
      <div className="input-group">
        <input type="text" className="input" placeholder='Enter your city' value={city} onChange={e => setCity(e.target.value)} />
        <button class="learn-more" onClick={handleSearch}>
          <span class="circle" aria-hidden="true">
          <span class="icon arrow"></span>
          </span>
          <span class="button-text">Search</span>
      </button>
      </div>
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p><FontAwesomeIcon icon={faThermometerHalf} /> {convertToCelsius(weather.main.temp)}°C</p>
          <p><FontAwesomeIcon icon={faTint} /> {weather.main.humidity} %</p>
          <p><FontAwesomeIcon icon={faWind} /> {weather.wind.speed} m/s</p>
          <p><FontAwesomeIcon icon={faClock} /> {currentTime}</p>
        </div>
      )}
      {error && (
        <div className="error">
          {error}
        <div class="honeycomb">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        </div>
      )}
    </div>
  );
}

export default App;