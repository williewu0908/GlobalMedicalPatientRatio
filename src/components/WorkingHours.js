// WorkingHoursChart.js
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

const WorkingHours = () => {
    const [option, setOption] = useState({});

    useEffect(() => {
        // Load and register theme
        fetch('/green.json')
            .then(response => response.json())
            .then(theme => {
                echarts.registerTheme('green', theme);

                // Load data
                fetch('/working_hours_data.json')
                    .then(response => response.json())
                    .then(data => {
                        // Find the index of the max value
                        const maxIndex = data.values.indexOf(Math.max(...data.values));

                        // Build data with colors
                        const seriesData = data.values.map((value, index) => {
                            return {
                                value: value,
                                itemStyle: {
                                    color: index === maxIndex ? '#c12e34' : '#4ea397'
                                }
                            };
                        });

                        // Set chart options
                        setOption({
                            title: {
                                text: '各職業每月工作時數比較',
                                textStyle: {
                                    fontSize: 30
                                }
                            },
                            tooltip: {},
                            xAxis: {
                                type: 'category',
                                name: '職業類別',
                                data: data.categories,
                                axisLabel: {
                                    rotate: 90
                                },
                                splitLine: {
                                    show: false
                                }
                            },
                            yAxis: {
                                type: 'value',
                            },
                            legend: {
                                orient: 'vertical'
                            },
                            series: [{
                                name: '工時 (小時)',
                                type: 'bar',
                                data: seriesData,
                                itemStyle: {
                                    color:'#4ea397',
                                }
                            }]
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching theme:', error);
            });
    }, []);

    return (
        <ReactECharts
            option={option}
            theme='green'
            style={{ width: '100%', height: '600px' }}
        />
    );
};

export default WorkingHours;
