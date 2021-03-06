import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { pick5DaysSelector } from 'store/selectors';


export default function WeatherBarChart() {
    const forecastData = useSelector(pick5DaysSelector)
    return (
        <ResponsiveContainer width={'99%'} height={300}>
            <BarChart width={600} height={300} data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis
                    label={{ value: 'Temperature', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip />
                <Bar dataKey="calculatedTemperature" fill="#82ca9d" barSize={40} />
            </BarChart>
        </ResponsiveContainer>
    );
}
