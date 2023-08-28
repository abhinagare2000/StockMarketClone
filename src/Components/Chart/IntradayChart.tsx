import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts/highstock';

const IntradayChart = ({ link }: { link: string }) => {
    const chartRef = useRef<any>(null);
    const [chartHeight, setChartHeight] = useState(window.innerHeight);
    const [chartwidth, setChartWidth] = useState(window.innerWidth);

    useEffect(() => {
        let chart: any; // Declare the chart variable outside of fetchData

        const fetchData = async () => {
            // Load the dataset
            const response = await fetch(link);
            const data = await response.json();

            // Check if chartRef has a current value
            if (chartRef.current) {
                // Initialize the chart and store it in the chart variable
                chart = Highcharts.stockChart(chartRef.current, {
                    chart: {
                        height: (chartHeight - 200) + 'px', // Set the height to 60% of its container
                    },
                    title: {
                        text: 'AAPL stock price by minute'
                    },
                    rangeSelector: {
                        buttons: [{
                            type: 'hour',
                            count: 1,
                            text: '1h'
                        }, {
                            type: 'day',
                            count: 1,
                            text: '1D'
                        }, {
                            type: 'all',
                            count: 1,
                            text: 'All'
                        }],
                        selected: 1,
                        inputEnabled: false
                    },
                    series: [{
                        name: 'AAPL',
                        type: 'candlestick',
                        data: data,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }],
                });

                // Ensure proper cleanup when the component unmounts
                return () => {
                    // Check if the chart exists before destroying it
                    if (chart) {
                        chart.destroy();
                    }
                };
            }
        };

        const handleResizeHeight = () => {
            const newScreenWidth = window.innerWidth;
            const newScreenHeight = window.innerHeight;
            setChartWidth(newScreenWidth);
            setChartHeight(newScreenHeight);
        };

        fetchData();

        // Listen for window resize events to update chart height
        window.addEventListener('resize', handleResizeHeight);

        // Ensure cleanup of the event listener
        return () => {
            window.removeEventListener('resize', handleResizeHeight);
        };
    }, [link, chartHeight]);

    return (
        <div style={{ height: '650px', marginTop: '15px', width: `${chartwidth - 450}px`, overflowY: 'auto', overflowX: 'auto' }} >
            < div ref={chartRef}></div>
        </div >
    );
};

export default IntradayChart;
