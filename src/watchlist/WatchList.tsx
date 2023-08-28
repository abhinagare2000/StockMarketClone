import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Grid, Paper } from '@mui/material';
import ChartComp from '../Components/Chart/ChartComp';
import styled from "styled-components";

interface StockData {
    symbol: string;
    lastPrice: number;
    dayHigh: number,
    open: number,
    dayLow: number,
    lastUpdateTime: string,
}

interface callbackFn { (component: () => JSX.Element | null): void; };

const WatchListComp = (({ link, handleChartRendering }: { link: string, handleChartRendering: callbackFn }) => {
    const [pageHeight, setPageHeight] = useState(window.innerHeight);
    const [stockData, setStockData] = useState<StockData[] | null>(null); // Initialize as null
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const fetchData = async (linkStr: string, indicesStr: string | null) => {
        try {
            const response: AxiosResponse<StockData[]> = await axios.get(linkStr, {
                params: {
                    Indices: indicesStr
                },
                headers: {
                    'X-RapidAPI-Key': 'fad0ea1374msh9f94f12502aa3f1p1f8549jsnf312ef4c0bde',
                    'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
                }
            });

            // Update the component state with the fetched data
            setStockData(response.data);
            setSelectedItem(indicesStr);
            console.log(response.data);
        } catch (error: any) {
            if (error.response) {
                console.error('Response Error:', error.response.data);
            } else if (error.request) {
                console.error('Request Error:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setPageHeight(window.innerHeight);
        };

        // Add a resize event listener to update the page height
        window.addEventListener('resize', handleResize);

        fetchData(link, "NIFTY 50"); // Invoke the fetch data function

        return () => {
            // Remove the event listener when the component unmounts
            window.removeEventListener('resize', handleResize);
        };
    }, [link]); // Add 'link' as a dependency if it can change

    // Convert the data into a format suitable for Highcharts candlestick chart
    const candleStickData: any = [];
    stockData?.map((data: any) => (
        candleStickData.push({
            x: new Date(data.lastUpdateTime).getTime(), // Use timestamp or date as the x-axis value
            open: data.open,
            high: data.dayHigh,
            low: data.dayLow,
            close: data.lastPrice
        })));

    const chart = () => <ChartComp data={candleStickData} />;

    const renderChart = () => {
        handleChartRendering(chart);
    }

    const MainDiv = styled.header`    
    background-color: var(--color-text-white);
    display: flex;
    height: 70px;
    align-items: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius:2px;
    flex-wrap: nowrap;
    overflow-x: auto;
    white-space: nowrap;
    text-overflow: ellipsis;
    `;

    const NavList = styled.div`
    text-decoration: none;
    padding:.4rem;
    display: flex;
    font-size:13.5px;
    font-weight:normal;
`;

    // Render the component based on the fetched data
    return (
        <div style={{ height: `${pageHeight}px`, overflowY: 'auto', marginLeft: '80px' }}>
            <MainDiv className="container">
                <NavList onClick={(e) => fetchData(link, e.currentTarget.textContent)} className={`app-nav ${selectedItem === 'NIFTY 50' ? 'selected' : ''}`}>
                    NIFTY 50
                </NavList>
                <NavList onClick={(e) => fetchData(link, e.currentTarget.textContent)} className={`app-nav ${selectedItem === 'NIFTY 100' ? 'selected' : ''}`}>
                    NIFTY 100
                </NavList>
                <NavList onClick={(e) => fetchData(link, e.currentTarget.textContent)} className={`app-nav ${selectedItem === 'NIFTY IT' ? 'selected' : ''}`}>
                    NIFTY IT
                </NavList>
                <NavList onClick={(e) => fetchData(link, e.currentTarget.textContent)} className={`app-nav ${selectedItem === 'NIFTY ENERGY' ? 'selected' : ''}`}>
                    NIFTY ENERGY
                </NavList>
                <NavList onClick={(e) => fetchData(link, e.currentTarget.textContent)} className={`app-nav ${selectedItem === 'NIFTY AUTO' ? 'selected' : ''}`}>
                    NIFTY AUTO
                </NavList>
                <NavList onClick={(e) => fetchData(link, e.currentTarget.textContent)} className={`app-nav ${selectedItem === 'NIFTY BANK' ? 'selected' : ''}`}>
                    NIFTY BANK
                </NavList>
            </MainDiv>
            <Grid container spacing={.3}>
                {stockData?.filter((data, index) => index !== 0).map((data, index) => (
                    <Grid item xs={12} key={index}>
                        <Paper onClick={renderChart} elevation={3} style={{ padding: '16px', fontSize: '13px', display: 'flex', justifyContent: 'space-between' }}>
                            <div>{data.symbol}</div>
                            <div>{data.lastPrice}</div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div >
    );
});

export default WatchListComp;
