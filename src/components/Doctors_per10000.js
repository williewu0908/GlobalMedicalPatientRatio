// Doctors_per10000.js
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

const Doctors_per10000 = () => {
    const highIncome = [
        "Aruba", "Andorra", "United Arab Emirates", "American Samoa", "Antigua and Barbuda", "Australia",
        "Austria", "Belgium", "Bahrain", "Bahamas, The", "Bermuda", "Barbados", "Brunei Darussalam", "Canada",
        "Switzerland", "Channel Islands", "Chile", "Curaçao", "Cayman Islands", "Cyprus", "Czechia", "Germany",
        "Denmark", "Spain", "Estonia", "Finland", "France", "Faroe Islands", "United Kingdom", "Gibraltar",
        "Greece", "Greenland", "Guam", "Guyana", "Hong Kong SAR, China", "Croatia", "Hungary", "Isle of Man",
        "Ireland", "Iceland", "Israel", "Italy", "Japan", "St. Kitts and Nevis", "Korea, Rep.", "Kuwait",
        "Liechtenstein", "Lithuania", "Luxembourg", "Latvia", "Macao SAR, China", "St. Martin (French part)",
        "Monaco", "Malta", "Northern Mariana Islands", "New Caledonia", "Netherlands", "Norway", "Nauru",
        "New Zealand", "Oman", "Panama", "Poland", "Puerto Rico", "Portugal", "French Polynesia", "Qatar",
        "Romania", "Saudi Arabia", "Singapore", "San Marino", "Slovak Republic", "Slovenia", "Sweden",
        "Sint Maarten (Dutch part)", "Seychelles", "Turks and Caicos Islands", "Trinidad and Tobago", "Taiwan",
        "Uruguay", "United States", "British Virgin Islands", "Virgin Islands (U.S.)"
    ];

    const [option, setOption] = useState({});

    useEffect(() => {
        // Load the JSON data
        fetch('medical_doctors_data.json')
            .then(response => response.json())
            .then(data => {
                // Filter data to include only high income countries
                const filteredData = data.filter(item => highIncome.includes(item.location));

                // Extract the locations and values for the chart
                const locations = filteredData.map(item => item.location);
                const itemStyles = filteredData.map(item => {
                    if (item.location === "Taiwan") {
                        return { value: item.value, itemStyle: { color: 'orange' } };
                    } else {
                        return { value: item.value };
                    }
                });

                // Set the chart options
                setOption({
                    title: {
                        text: 'Medical Doctors per 10,000 Population by Country (Latest Available Data)',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    xAxis: {
                        type: 'value',
                        name: 'Medical Doctors (per 10,000 population)'
                    },
                    yAxis: {
                        type: 'category',
                        name: 'Country',
                        data: locations
                    },
                    series: [
                        {
                            name: 'Medical Doctors',
                            type: 'bar',
                            data: itemStyles,
                            barWidth: '60%',
                            itemStyle: { color: 'skyblue' }
                        }
                    ],
                    grid: {
                        containLabel: true
                    },
                    dataZoom: [
                        {
                            show: true,
                            type: 'inside',
                            yAxisIndex: [0],
                            start: 0,
                            end: 100,
                        },
                        {
                            show: true,
                            type: 'slider',
                            yAxisIndex: [0],
                            start: 0,
                            end: 100,
                        },
                    ]
                });
            });
    }, []);

    return (
        <ReactECharts
            option={option}
            style={{ width: '1200px', height: '600px' }}
        />
    );
};

export default Doctors_per10000;
