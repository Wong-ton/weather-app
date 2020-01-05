import React, { useState } from 'react';
import WeatherInfo from './WeatherInfo';
import moment from 'moment';

function Weather() {
    const apiKey = process.env.OMW_API_KEY
    const [searchQuery, setSearchQuery] = useState('');
    const [weatherData, setWeatherData] = useState({
        default: 'No weather to display.',
        error: null,
        city: null,
        country: null,
        temp: null,
        humidity: null,
        desc: null,
        sunrise: null,
        sunset: null,
        timeDiff: null,
        icon: null,
        dataList: null,
    });

    function updateSearchQuery(e) {
        setSearchQuery(e.target.value)
    }

    function getWeather() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}`)
        .then(response => {
            if (response.status === 200) {
                response.json()
                .then(data => setWeatherData({
                    city: data.name,
                    country: data.sys.country,
                    tempF: kelvinToFahrenheit(data.main.temp),
                    tempC: kelvinToCelsius(data.main.temp),
                    humidity: data.main.humidity,
                    desc: data.weather[0].description,
                    timeDiff: data.timezone,
                    icon: data.weather[0].icon,
                    sunrise: timezoneAdjust(data.sys.sunrise, data.timezone),
                    sunset: timezoneAdjust(data.sys.sunset, data.timezone),
                    error: null,
                }))
            }
            else {
                setWeatherData({
                    error: 'Invalid entry, please try again.'
                })
            }
        })
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

    function statusMessage() {
        if (weatherData.error != null) {
            return weatherData.error
        }
        else if (weatherData.city == null) {
            return weatherData.default
        } 
        else if (weatherData.city != null) {
            return <WeatherInfo data={weatherData}/>
        }
    }

    return(
        <div className="weather-container">
            <div className="weather-header">
                <input 
                className="search-input"
                placeholder="Enter City (e.g. Los Angeles, US)"
                onChange={updateSearchQuery}
                />
                <i class="fas fa-search" onClick={getWeather}></i>
            </div>
            <div className="weather-info">
                {statusMessage()}
            </div>
        </div>
    )
}

export default Weather;