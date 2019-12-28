import React from 'react';
import '../App.css';

function WeatherInfo(props) {
    const { city, country, tempF, tempC, humidity, desc, sunrise, sunset, timeDiff} = props.data;

    return(
        <React.Fragment>
            <div>
              <p>Location: {city}, {country}</p>
            </div>
            <div>
              <p>Description: {desc}</p>
            </div>
            <div>
              <p>Temperature: {tempF} &deg;F  /  {tempC} &deg;C</p>
            </div>
            <div>
              <p>Humidity: {humidity}%</p>
            </div>
            <div>
              <p>Sunrise: {sunrise}</p>
              <p>Sunset: {sunset}</p>
            </div>
        </React.Fragment> 

    )
}

export default WeatherInfo;