/**
 * The `Chart` component is a React component that renders a graph using ECharts library and allows the
 * user to switch between different chart types (line, bar, pie) using buttons.
 * @returns The Chart component is being returned.
 */
import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";

function Chart({ xAxisLabel, xAxisData, yAxisLabel, yAxisData }) {

    const [chartType, setChartType] = useState("bar")
    const option = {
        title : {
            text : "Graph"
        },
        xAxis: {
            type: "category",
            data: xAxisData,
            name: xAxisLabel

        },
        yAxis: {
            type: "value",
            name: yAxisLabel
        },
        series: [
            {
                data: yAxisData,
                type: chartType,
            },
        ],
    };

    useEffect(() => {

    }, [])

    return (
        <div className="w-full justify-end">
            <nav className="flex sm:justify-center space-x-4">
                <button
                    onClick={() => setChartType("line")}
                    className={`rounded-lg px-3 py-2 text-slate-700 font-medium shadow-lg 
                    ${chartType === 'line' ? 'bg-blue-500 text-white' : 'hover:bg-slate-100 hover:text-slate-900'}`}
                >
                    Line
                </button>

                <button
                    onClick={() => setChartType("bar")}
                    className={`rounded-lg px-3 py-2 text-slate-700 font-medium shadow-lg 
                    ${chartType === 'bar' ? 'bg-blue-500 text-white' : 'hover:bg-slate-100 hover:text-slate-900'}`}
                >
                    Bar
                </button>

                <button
                    onClick={() => setChartType("pie")}
                    className={`rounded-lg px-3 py-2 text-slate-700 font-medium shadow-lg 
                    ${chartType === 'pie' ? 'bg-blue-500 text-white' : 'hover:bg-slate-100 hover:text-slate-900'}`}
                >
                    Pie
                </button>
            </nav>


            <div className="ml-4">
                <ReactEcharts option={option} />
            </div>
        </div>
    );
}

export default Chart;
