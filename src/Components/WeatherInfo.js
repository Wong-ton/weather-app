import React from 'react';
import moment from 'moment';
import '../App.css';

function WeatherInfo(props) {
    const { city, country, tempF, humidity, desc, sunrise, sunset, icon, timeDiff} = props.data;

    function getLocalTime() {
        return moment.utc().add(timeDiff, 's').format("LT")
    }

    // setInterval(() => {
    //     getLocalTime()
    //   }, 1000);

    return(
        <React.Fragment>
            <div className="weather-desc">
              Local time: {getLocalTime()}
              <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
              {desc}
            </div>
            <div className="weather-info-inner">
                <div className="weather-labels">
                    <p>Location: </p>
                    <p>Temperature: </p>
                    <p>Humidity: </p>
                    <p>Sunrise: </p>
                    <p>Sunset: </p>
                </div>
                <div className="weather-values">
                    <p>{city}, {country}</p>
                    <p>{tempF} &deg;F</p>
                    <p>{humidity}%</p>
                    <p>{sunrise}</p>
                    <p>{sunset}</p>
                </div>
            </div>
        </React.Fragment> 

    )
}

export default WeatherInfo;