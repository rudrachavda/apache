import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";

function Chart({ xAxisLabel, xAxisData, yAxisLabel, yAxisData }) {

    const [chartType, setChartType] = useState("bar")
    const option = {
        xAxis: {
            type: "category",
            data: xAxisData,
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                data: yAxisData,
                type: chartType,
            },
        ],
    };

    useEffect(()=>{

    },[])

    return (
        <div className="w-3/4 justify-end">
            <nav className="flex sm:justify-center space-x-4">
                <button onClick={()=>setChartType("line")} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">Line Chart</button>
                <button onClick={()=>setChartType("bar")} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">Bar Chart</button>
                <button onClick={()=>setChartType("pie")} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">Pie Chart</button>
            </nav>


            <div className="ml-4">
                <ReactEcharts option={option} />
            </div>
        </div>
    );
}

export default Chart;
