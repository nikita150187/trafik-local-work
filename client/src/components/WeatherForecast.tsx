/*import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { WeatherForecastData, WeatherForecastProps } from "../types/WeatherForecastData";

const WeatherForecast: React.FC<WeatherForecastProps> = ({ city }) => {
    const [forecast, setForecast] = useState<WeatherForecastData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showForecast, setShowForecast] = useState<boolean>(false);

    // Function to format the date into weekday names (Monday, Tuesday, etc.)
    const formatDateToWeekday = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { weekday: "long" });
    };

    useEffect(() => {
        if (!city) return;

        setLoading(true);
        setError(null);

        axios.get(`http://localhost:8000/forecast?city=${city}`)
            .then((response) => {
                const forecasts = response.data.list;
                const uniqueDays = new Set<string>();
                const filteredForecast: typeof forecasts = [];

                for (const entry of forecasts) {
                    const day = entry.dt_txt.split(" ")[0];

                    if (!uniqueDays.has(day)) {
                        uniqueDays.add(day);
                        filteredForecast.push(entry);
                    }

                    if (uniqueDays.size === 5) break;
                }

                setForecast({ ...response.data, list: filteredForecast });
                // Wait 5 seconds for forecast
                setTimeout(() => {
                    setShowForecast(true);
                }, 5000);
            })
            .catch(() => setError("This is not a valid city name. Waiting for city..."))
            .finally(() => setLoading(false));
    }, [city]);

    return (
        <div className="container mt-4">
            <h3 className="title text-center">Local Weather </h3>

            {loading && <p className="text-center text-secondary">Loading...</p>}
            {error && <p className="text-danger text-center">{error}</p>}

            <div className="mt-4">
                <h3 className="text-center">
                    {city ? `Weather forecast for ${city.charAt(0).toUpperCase() + city.slice(1)}` : "Waiting for city..."}
                </h3>
                <div className="table-responsive weather-table-container">
                    <table className="table table-sm table-bordered table-striped weather-table">
                        <thead className="text-center">
                            <tr>
                                <th>Day</th>
                                <th>Temp (°C)</th>
                                <th>Rain (mm)</th>
                                <th>Weather</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {forecast ? (
                                forecast.list.map((day) => (
                                    <tr key={day.dt_txt}>
                                        <td>{formatDateToWeekday(day.dt_txt)}</td>
                                        <td>{Math.round(day.main.temp)}°C</td>
                                        <td>{day.rain ? day.rain["3h"] : 0} mm</td>
                                        <td>
                                            <img
                                                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                                alt="Weather icon"
                                                title={day.weather[0].description}
                                                className="weather-icon"
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center text-muted">Waiting for city...</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default WeatherForecast;*/