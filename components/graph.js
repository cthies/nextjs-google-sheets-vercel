import React, { Component, useState } from 'react';
import '../node_modules/react-vis/dist/style.css';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineMarkSeries } from 'react-vis';
import { format } from 'date-fns';

const Graph = (props) => {
    const sheetdata = props.sheetdata;
    const [text, setText] = useState('');
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
                x: format(Date.parse(item[0]), 'MM'),
                y: Number(diff),
                d: item[0]
            });
        }
    });

    //split per year starting with December 2021
    const slicedArray1 = graphData.slice(0, 12);
    const slicedArray2 = graphData.slice(12, 25);

    return (
        <div className="graph">
            <div className="graphHoverValue">{text}</div>
            <XYPlot width={300} height={280} xType='ordinal'>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis tickLabelAngle={-45} style={{
                    text: { stroke: 'none', fill: '#ffffff', fontWeight: 600 }
                }} />
                <YAxis style={{
                    text: { stroke: 'none', fill: '#ffffff', fontWeight: 600 }
                }} />
                <LineMarkSeries
                    className="linemark-series-example-2"
                    curve={'curveMonotoneX'}
                    lineStyle={{ stroke: 'violet' }}
                    markStyle={{ stroke: 'cyan', fill: 'blueviolet' }}
                    data={slicedArray1}
                />
                <LineMarkSeries
                    className="linemark-series-example-2"
                    curve={'curveMonotoneX'}
                    lineStyle={{ stroke: 'chartreuse' }}
                    markStyle={{ stroke: 'blanchedalmond', fill: 'darkcyan' }}
                    data={slicedArray2}
                />
            </XYPlot>
        </div>
    );
}


export default Graph;