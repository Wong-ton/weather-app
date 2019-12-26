import React from 'react';
import '../App.css';

function WeatherInfo(props) {
    const { city, temp, humidity, desc} = props.data;

    return(
        <React.Fragment>
            <div>
              <p>City: {city}</p>
            </div>
            <div>
              <p>Description: {desc}</p>
            </div>
            <div>
              <p>Temperature: {temp}</p>
            </div>
            <div>
              <p>Humidity: {humidity}</p>
            </div>
        </React.Fragment> 

    )
}

export default WeatherInfo;