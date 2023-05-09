import React, { Component } from 'react';
import '../node_modules/react-vis/dist/style.css';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineMarkSeries } from 'react-vis';

const Graph = (props) => {
    const sheetdata = props.sheetdata;
    let prev = 0;

    /*react-vis needs data like this
    const data = [
        {x: 0, y: 8},
        {x: 1, y: 5}
      ];
    */
    const graphData = [];
    sheetdata.map((item, index) => {
        let diff = Number(item[1]) - prev;
        prev = Number(item[1]);

        if (index !== 0) {
            graphData.push({
                x: Number(index),
                y: Number(diff)
            });
        }

    });

    console.log(graphData);


    //split per year starting with December 2021
    const slicedArray1 = graphData.slice(1, 13);
    const slicedArray2 = graphData.slice(13, 25);

    console.log(slicedArray1);
    console.log(slicedArray2);
    return (

        <XYPlot width={300} height={300} className="graph">
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis style={{
                text: { stroke: 'none', fill: '#ffffff', fontWeight: 600 }
            }} />
            <YAxis style={{
                text: { stroke: 'none', fill: '#ffffff', fontWeight: 600 }
            }} />
            <LineMarkSeries
                className="linemark-series-example-2"
                curve={'curveMonotoneX'}
                lineStyle={{ stroke: 'violet' }}
                markStyle={{ stroke: 'blanchedalmond', fill: 'aquamarine' }}
                data={graphData}
            />
        </XYPlot>
    );
}


export default Graph;