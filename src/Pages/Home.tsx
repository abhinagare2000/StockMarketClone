import IntradayChart from '../Components/Chart/IntradayChart';
import styled, { createGlobalStyle } from "styled-components";
import WatchListComp from '../watchlist/WatchList';
import { useState, useCallback } from 'react';

const HomeDiv = () => {

    const GlobalStyle = createGlobalStyle`
  .renderComp::-webkit-scrollbar {
    height:7px;
  }

  .renderComp::-webkit-scrollbar-thumb {
    background-color: #ADD8E6;
    border-radius: 3px;
  }
`;

    const MainDiv = styled.div`    
    display: grid;
    grid-template-columns: 25% 75%;
    grid-gap: 10px; 
    overflow-y: auto;
    overflow-x: auto;
    `;

    const ShareGrid = styled.div`
    height:200;
    overflow-y: auto;
    overflow-x: auto;
    `;

    const GraphVis = styled.div`
     height: 100%;
     overflow-y: auto;
     overflow-x: auto;
    `;

    const [chartComponent, setChartComponent] = useState<JSX.Element | null>(<IntradayChart link="https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/new-intraday.json" />)

    const handleChartRendering = useCallback((Component: () => JSX.Element | null) => {
        setChartComponent(Component);
    }, [chartComponent]);

    return (
        <MainDiv>
            <GlobalStyle />
            <ShareGrid className='renderPage'>
                <WatchListComp link="https://latest-stock-price.p.rapidapi.com/price" handleChartRendering={handleChartRendering} />
            </ShareGrid>
            <GraphVis>
                {chartComponent}
            </GraphVis>
        </MainDiv >
    );
};

export default HomeDiv;
