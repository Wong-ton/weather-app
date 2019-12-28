import React, { useState } from 'react';
import '../App.css';
import WeatherInfo from './WeatherInfo';
import moment from 'moment';

function Weather() {
    const apiKey = 'ecf07367ad26b3ab3716f250f847bab6';
    const [searchQuery, setSearchQuery] = useState('');
    const [weatherData, setWeatherData] = useState({
        city: null,
        country: null,
        temp: null,
        humidity: null,
        desc: null,
        sunrise: null,
        sunset: null,
        timeDiff: null
    });

    function updateSearchQuery(e) {
        setSearchQuery(e.target.value)
    }

    function getWeather() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => setWeatherData({
            city: data.name,
            country: data.sys.country,
            tempF: kelvinToFahrenheit(data.main.temp),
            tempC: kelvinToCelsius(data.main.temp),
            humidity: data.main.humidity,
            desc: data.weather[0].description,
            timeDiff: data.timezone,
            sunrise: timezoneAdjust(data.sys.sunrise, data.timezone),
            sunset: timezoneAdjust(data.sys.sunset, data.timezone),
        }))
    }

    function kelvinToFahrenheit(kelvin) {
        return ((kelvin - 273.15) * (9.0 / 5.0) + 32).toFixed(0);
    }

    function kelvinToCelsius(kelvin) {
        return (kelvin - 273.15).toFixed(0);
    }

    function timezoneAdjust(unix, timeDiff) {
        return moment.utc(new Date(unix * 1000 + (timeDiff * 1000)).toUTCString()).format("LT")
    }

    return(
        <div className="weather-container">
          <h2>Weather</h2>
            <section>
                <input 
                className="search-input"
                placeholder="Enter City"
                onChange={updateSearchQuery}
                />
                <button onClick={getWeather}>Search</button>
            </section>
            <section className="weather-info">
              {weatherData.temp === null ?
              (<p>No weather to display</p>) :
                <WeatherInfo data={weatherData}/>
            }
            </section>
        </div>
    )
}

export default Weather;