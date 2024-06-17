import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import data from './Taiwan_per1000.json';  // Import the JSON data
import "./Taiwan_doctor_per10000.css"

const Taiwan_doctor_per10000 = () => {
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    // Initialize original data and current chart data
    setOriginalData(data);
  }, []);

  const sortDesc = () => {
    // Create a sorted copy of originalData based on '每萬人西醫數' field
    const sortedData = [...originalData].sort((a, b) => b.每萬人西醫數 - a.每萬人西醫數);
    setOriginalData(sortedData);
  };

  const restore = () => {
    // Restore original data from the imported data
    setOriginalData(data);
  };

  const getOption = (data) => {
    const locations = data.map(item => item.地區);
    const values = data.map(item => item.每萬人西醫數);

    return {
      title: {
        text: '台灣各地區醫師病人比',
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
        name: '醫師病人比'
      },
      yAxis: {
        inverse: true,
        type: 'category',
        name: '地區',
        data: locations
      },
      series: [
        {
          name: '每萬人醫師數',
          type: 'bar',
          data: values,
          itemStyle: {
            color: 'skyblue'
          },
          barWidth: '60%',
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
    };
  };

  return (
    <div style={{ width: '1200px', height: '600px', position: 'relative' }}>
      <ReactECharts option={getOption(originalData)} style={{ width: '1200px', height: '600px' }} />
      <div style={{ position: "absolute", top: '10px', right: '10px', zIndex: '1000' }}>
        <button className="toolbox-button" onClick={sortDesc}>
          <span className="button-icon">&#9650;</span> 排序由大到小
        </button>
        <button className="toolbox-button" onClick={restore}>
          <span className="button-icon">&#8634;</span> 恢復原排序
        </button>
      </div>
    </div>
  );
};

export default Taiwan_doctor_per10000;
