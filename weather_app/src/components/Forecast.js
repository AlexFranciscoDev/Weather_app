import React, { useState, useEffect } from 'react'

export const Forecast = ({ isCelsius, location }) => {
    const [forecastWeather, setForecastWeather] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isForecastCelsius, setIsForecastCelsius] = useState(isCelsius);
    const [errors, setErrors] = useState("");
    const [city, setCity] = useState("Barcelona");
    const weather_icon_url = "http://openweathermap.org/img/wn/";

    useEffect(() => {
        if (location) {
            setCity(location);
        } else {
            setCity(city);
        }
    })

    useEffect(() => {
        getForecastData(city);
    }, [isCelsius, city])

    const getForecastData = async (city) => {
        console.log("changing...");
        if (location) {
            setCity(location);
        }
        let url = "";
        // Check if its celsius or farenheit
        if (isForecastCelsius) {
            url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&appid=a63085dfaa8f36e6baa8cc0edf7d3eb3&lang=en`;
        } else {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=a63085dfaa8f36e6baa8cc0edf7d3eb3&lang=en`
        }

        try {
            setErrors("");
            const petition = await fetch(url);
            const data = await petition.json();
            await console.log("forecast data: " + data);
            if (data.cod === "404") {
                setErrors(data.message);
                throw "Ders an error";
                console.log("errorrrr");
            }
            setForecastWeather([]);
            data.list.map((weatherData) => {
                setForecastWeather(
                    forecastWeather => [...forecastWeather,
                    {
                        hour: weatherData.dt_txt.slice(11, 16),
                        icon: weatherData.weather[0].icon,
                        desc: weatherData.weather[0].description,
                        temp_max: getCelsius(weatherData.main.temp_max),
                        temp_min: getCelsius(weatherData.main.temp_min)
                    }
                    ]
                );
            });

        } catch (error) {
            console.log(error);
        }

    }

    const getCelsius = (temp) => {
        if (isCelsius) {
            return Math.round((temp - 273.15).toFixed(1));
        } else {
            return Math.round((1.8 * (temp - 273) + 32).toFixed(1));
        }
    }

    return (
        <>
            <h2 className="forecast_title">Extended Forecast</h2>
            <div className="forecastContainer">
                {forecastWeather.map((data) =>
                    <div className="singleForecast" key={data.hour}>
                        <h3>{data.hour}h</h3>
                        <img width="60" src={weather_icon_url + data.icon + ".png"} alt="weather_icon" />
                        <h4>{data.desc}</h4>
                        <p>{data.temp_max}º / {data.temp_min}º</p>
                    </div>
                )}
            </div>
        </>
    )
}
