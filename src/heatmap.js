import React, { useEffect, useRef } from "react";
import ReactEcharts from "echarts-for-react";


function HeatmapComponent({xLabel,
    xUniqueData,
    yLabel,
    yUniqueData,
    chartData,maxCount}) {

    const option = {
        tooltip: {
            position: "top",
        },
        grid: {
            height: "50%",
            top: "10%",
        },
        xAxis: {
            type: "category",
            data: xUniqueData,
            name: xLabel,
            splitArea: {
                show: true,
            },
        },
        yAxis: {
            type: "category",
            data: yUniqueData,
            name : yLabel,
            splitArea: {
                show: true,
            },
        },
        visualMap: {
            min: 0,
            max: maxCount,
            calculable: true,
            orient: "horizontal",
            left: "center",
            bottom: "15%",
        },
        series: [
            {
                name: "Counts",
                type: "heatmap",
                data: chartData,
                label: {
                    show: true,
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        ],
    }



    return (
        <div className="w-full justify-end">
            {/* Use ref to get a reference to the ECharts container */}
            <div style={{ width: "600px", height: "400px" }}>
            <ReactEcharts option={option} />
            </div>
        </div>
    );
}

export default HeatmapComponent;
