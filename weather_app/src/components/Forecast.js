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
    }, [isForecastCelsius, city])

    const getForecastData = async (city) => {
        if (location) {
            setCity(location);
        }
        let url = "";
        // Check if its celsius or farenheit
        if (isForecastCelsius) {
            url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&appid=a63085dfaa8f36e6baa8cc0edf7d3eb3&lang=en`;
        } else {
            url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&cnt=7&appid=a63085dfaa8f36e6baa8cc0edf7d3eb3&lang=en`
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
            
            data.list.map((weatherData) =>
                {setForecastWeather(forecastWeather => [...forecastWeather, weatherData]);}
            );
            // TODO: subir info de cada hora coomo currentWeatherJSON
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <h3>ahaol</h3>
        </div>
    )
}
