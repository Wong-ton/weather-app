import React from 'react';
import '../App.css';

function WeatherInfo(props) {
    const { city, temp, humidity, desc} = props;

    return(
        <div>
            
            <p>City: {city}</p>
            <p>Description: {desc}</p>
            <p>Temperature: {temp}</p>
            <p>Humidity: {humidity}</p>
        </div>

    )
}

export default WeatherInfo;