import React, { useState, useEffect } from 'react';


export const Current = ({ location, handleMeasure }) => {
    const [currentWeather, setCurrentWeather] = useState();
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState("");
    const [isCelsius, setIsCelsius] = useState(true);
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
        getWeatherData(city);
    }, [isCelsius, city])

    const getWeatherData = async (city) => {
        if (location) {
            setCity(location);
        }
        let url = "";
        // Get if its celsius or farenheit
        if (isCelsius) {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a63085dfaa8f36e6baa8cc0edf7d3eb3&lang=en`;
        } else {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=a63085dfaa8f36e6baa8cc0edf7d3eb3&lang=en`
        }
        // Depending on the measure we have to add imperial unit to the url
        // Add the city to the url
        // Return corresponding data
        setTimeout(async () => {
            try {
                setErrors(""); // Restart errors just in case there is an error previously
                const petition = await fetch(url);
                const data = await petition.json();
                await console.log(data);
                if (data.cod === "404") {
                    setErrors(data.message);
                    throw "Ders an error";
                    console.log("errorrrr");
                }
                setCurrentWeather({
                    name: data.name,
                    iconWeather: data.weather[0].icon,
                    temp: getCelsius(data.main.temp),
                    desc: data.weather[0].description,
                    feels_like: getCelsius(data.main.feels_like),
                    temp_max: getCelsius(data.main.temp_max),
                    temp_min: getCelsius(data.main.temp_min),
                    humidity: data.main.humidity,
                    wind: Math.round(data.wind.speed),
                    pressure: data.main.pressure
                })

                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }, 1000)
    }

    const toggleMeasure = () => {
        handleMeasure(isCelsius);
        return setIsCelsius(!isCelsius);
    }

    const getCelsius = (temp) => {
        if (isCelsius) {
            return Math.round((temp - 273.15).toFixed(1));
        } else {
            return Math.round((temp).toFixed(1));
        }
    }

    

    if (errors != "") {
        return (
            <div>
                <span className="error">{errors}</span>
            </div>
        )
    } else if (loading) {
        return (
            <div>
                Loading data...
            </div>
        )
    } else if (!loading && errors === "") {
        return (
            <div className="current_container">
                <div className="current_header">
                    <h2>Current Weather</h2>
                    <label className="toggle">
                        <input type="checkbox" onClick={toggleMeasure}/>
                        <span className="slider"></span>
                        <span className="labels" data-on="Fº" data-off="Cº"></span>
                    </label>
                </div>
                <div className="current_body">
                    <div className="temperature">
                        <h3>{currentWeather.name}</h3>
                        <div className="current_temperature">
                            <img width="60" src={weather_icon_url + currentWeather.iconWeather + ".png"} alt="weather_icon" />
                            <span>{currentWeather.temp}º</span>
                        </div>
                        <h4 className="temperature_description">{currentWeather.desc}</h4>
                    </div>

                    <div className="details_temperature">
                        <h3>Feels like {currentWeather.feels_like}º</h3>
                        <div className="detail_container">
                            <span className="detail_temperature">
                                <img width="25" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAOJJREFUSEvtkkEKgkAUht8zD+AVgqG1gboX1G15gupm3iDXGrjXINcx4BU8gDkxZOBCfWPgInB2A//7PuZ/g7DwwYX5sArIhmdVlOT8LImBwyKS3AWUBbc7PwoBVzmHCKFnsVhFoiRI8qeJqGUAYHTQWojWDZxdSUlIQfaojKZ5VT34l1nr+mbr7rf1lGRS8IG3GYAwhyFY6rrmTkkmBWnBZc8HoobYt1k4lhkVJDmPEOFEddwtPfIsdhnKkjvoD6UFF/Lu20x5TjkowauA3Of/V0Q+cSAw6xetgl8aIGcW38EbvDpJGTjp5qgAAAAASUVORK5CYII=" />
                                <span>{currentWeather.temp_max}º</span>
                            </span>
                            <span className="detail_temperature">
                                <img width="25" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAOpJREFUSEvtkzEKwkAQRWdMrPUICoutCiZ1BJNWPYEeLZ5AbRPB1ImgtrKgRzC10ZENFkE0uwoBhWz997+/f2YRCj5YsD+UAGnDv1WRH3ESkW2DKQdTFgrjEiDdiP+qyAu5iwgT6bMAgAhmjsmmr7S5W+RHfAEAQwlkaRts9E6TC1hvj/XrJQkIsf0yHdFeq+pWv9s8fwUQlwQkSa4nAKg9mcS6rjXyzIVe6aN54aGDWAkykJjoZjlmayebkRJAmKw2fEQE8zQVwnjQY2I+0qMMEE5eyNNNcUzmSp0fgo8AqqZZXQmQtlZ4RXf3tk0ZaQYo5QAAAABJRU5ErkJggg==" />
                                <span>{currentWeather.temp_min}º</span>
                            </span>
                        </div>

                        <div className="humidity">
                            <span className="detail_humidity">
                                <img width="25" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAXNJREFUSEu1lU1Og0AUx99rp3uPUCJ1qyTSxJWQFBN3vYFHsFfwBNYbeAPjykRIwJVJaVJclwSP0D0fz1CLHzAwAwls583/938fvEHo+cOe9UEa4G6iozRN74loxxi7MzVlJ2NOCpCLJ0nmAtDZtygGjA1MGYgQUBUvfMtBGgG5eBynG0QY88shhtQC6p2XURhY+rFW149agLMOl0RwK9VIhIfZubrgxXIBtr81ANCVEf+NIdPSJ14lP56I7Yd54GU7AHiWrppCgLMO50Tw1FJ8H06UaVfTk+Dv3UqJXlfhIyLcdAEgpxcVQMfyFH7eLF01GjOw/ZC6uC/uWLr6zzQvg34BzmobEOJplyyQ6GM2nRz21WFrlYXa/GCVkZRp8st7NGYsjbpkkCRD5fpC+Wxscn7YJQveiO4Xe53Tlr14tnR1Lr2LikCZTOqc/7waolrnPRmN0gVkZBTTlU8LDNCL4+GyXHPhLhIB254Ln8y2guX4LzklmhmzN1gEAAAAAElFTkSuQmCC" />
                                <span>Humidity</span>
                                <span>{currentWeather.humidity}%</span>
                            </span>
                        </div>

                        <div className="wind">
                            <span className="detail_wind">
                                <img width="25" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAXxJREFUSEu1lT1Ow0AQhd/I7hE3iIVTk0gsEhWJxCJREY7ADeAEODcIJ4AjQEVhJJyKwhTpYynhBqHfsGiQNyL+Ibaz2cry2vPNvJl9S9jxoh3HRyPA60cy0JruAN0BEBHh/uzIfypKtjYgjKc9gN6ywYhwVQRpAEg400tAD6VoB2E8DQCuBmMp/F4ObKMHYZxojiOFn0u4dgXZhCpXYLIwAUw22fflFeu+FO2oVKItAGMijKxNUd2ebd2DTcAVoLrWxSG1xpwIE6Wc24sTb26+sgb4g10o5XQNxJpEL++zlusuHwGcAniWwh8w1BqAg6WQGct1fux7a4AKPVgztTBOFgD2XNfZ73c9fl4BAHxK4bfqAn5lNqYWxsaTECnlXPOe6y4fALAf1ZcoawmpHBOuIjNXX0o5nUZNzppaChkB4HuBF4/pTeGY5k3MSECBFAfDTaZWduBKp6jsYgGKTa02gH/gqxHfOtBEh3yh/GdqjQCbfKbKvtWDVgT8AUOFqxkWJS3wAAAAAElFTkSuQmCC" />
                                <span>Wind</span>
                                <span>{currentWeather.wind}kph</span>
                            </span>
                        </div>

                        <div className="pressure">
                            <span className="detail_pressure">
                                <img width="25" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAdlJREFUSEu9VUFOwkAUfX/UI+hWicNajJbEFRgpiTs9gXgCYeMh3IgnEE8grkwEIzsT0KSubQJs9Qq030ylTUunFZpgV236/3t/3rx5Q1jyQ0vGx58ET327JgRKzFQAuPA7EFlEbDFz2zTyD2lDJhJ03+wT18U1EbbSAJgxEgKNyr5s6+q0BN03u8mMi8Xk46Zp5BuzPTGCbOBT4Qg3lX1ZD5NECJQszLhfbPJoNRFOw3JFCDoDewRgcw6CMTN6AHpEPALoxe9Re1Itypz/HRAotxDhNgE8AHScld7xQU4N4j26vvAqwgQtIpxpCMamIROd9NS3Y33MuKsWZc0ztA/Y7X9aTLQzS+AXP7/bNdfFlfovBC6P9mRLvetlJcs0tncjBJ2BzTp5mHFeLcpWZ2B/AVif1nybhtx4fB1ura46Q12faUhv+GAFSQSTyUpOaa4jSNu3GEGCRIH+Ool0+ntTM39UinkvVlI3ObxZOhmSbK3fZM0h8/X3wZXma2tOCUDZdVFOyimtTfWO4EMiUgcvFXBmdRFb/29UqEmWGnbBocsQ16RJ0oiLZl0yTdbmHOE3JkJ9oQsnTDa92U4EuOBHifK5C7KEQDsJOJamc0R0ppI/L/1MqKGmH5e29Rk4PWt1AAAAAElFTkSuQmCC" />
                                <span>Pressure</span>
                                <span>{currentWeather.pressure}hPa</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
