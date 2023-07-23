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





// import React, { useEffect, useRef } from "react";

// function HeatmapComponent({xAxisData, yAxisData}) {
//     const chartRef = useRef(null);

//     useEffect(() => {
//         if (!xAxisData || !yAxisData) {
//             // Prevent rendering if xAxisData or yAxisData is not available
//             return;
//         }

//         // Function to generate random numbers within a range
//         function randomNumber(min, max) {
//             return Math.floor(Math.random() * (max - min) + min);
//         }

//         // Unique values of zipcode column
//         const yUniqueData = yAxisData;

//         // Unique values of salary column
//         const xUniqueData = xAxisData;

//         // Arrays to store data related to salary and zip code values
//         const xData = [];
//         const yData = [];

//         // Randomly generate the data for xData and yData
//         for (let z = 0; z < yUniqueData.length; z++) {
//             const zRand = randomNumber(1, 15);
//             for (let zr = 0; zr < zRand; zr++) {
//                 yData.push(yUniqueData[z]);
//                 xData.push(xUniqueData[randomNumber(0, 5)]);
//             }
//         }

//         console.log(xData, yData);

//         // Create a hash object to store the count of occurrences of particular salary in a specific zipcode
//         const hash = {};
//         let maxCount = 0;

//         // Calculate the counts and populate the hash object
//         for (let t = 0; t < xData.length; t++) {
//             if (!hash[yData[t]]) hash[yData[t]] = {};

//             if (!hash[yData[t]][xData[t]]) hash[yData[t]][xData[t]] = 0;
//             hash[yData[t]][xData[t]] = hash[yData[t]][xData[t]] + 1;

//             if (maxCount < hash[yData[t]][xData[t]]) {
//                 maxCount = hash[yData[t]][xData[t]];
//             }
//         }

//         console.log(hash);
//         let newData = [];

//         // Prepare the newData array for the heatmap
//         for (let y = 0; y < yUniqueData.length; y++) {
//             for (let x = 0; x < xUniqueData.length; x++) {
//                 const count =
//                     hash[yUniqueData[y]] && hash[yUniqueData[y]][xUniqueData[x]]
//                         ? hash[yUniqueData[y]][xUniqueData[x]]
//                         : 0;
//                 newData.push([x, y, count]);
//             }
//         }

//         // Prepare the ECharts option
//         const option = {
//             tooltip: {
//                 position: "top",
//             },
//             grid: {
//                 height: "50%",
//                 top: "10%",
//             },
//             xAxis: {
//                 type: "category",
//                 data: xUniqueData,
//                 splitArea: {
//                     show: true,
//                 },
//             },
//             yAxis: {
//                 type: "category",
//                 data: yUniqueData,
//                 splitArea: {
//                     show: true,
//                 },
//             },
//             visualMap: {
//                 min: 0,
//                 max: maxCount,
//                 calculable: true,
//                 orient: "horizontal",
//                 left: "center",
//                 bottom: "15%",
//             },
//             series: [
//                 {
//                     name: "Counts",
//                     type: "heatmap",
//                     data: newData,
//                     label: {
//                         show: true,
//                     },
//                     emphasis: {
//                         itemStyle: {
//                             shadowBlur: 10,
//                             shadowColor: "rgba(0, 0, 0, 0.5)",
//                         },
//                     },
//                 },
//             ],
//         };

//         // Import echarts to the component (ensure you've installed echarts package)
//         const echarts = require("echarts");

//         // Initialize ECharts instance and set the option
//         const myChart = echarts.init(chartRef.current);
//         myChart.setOption(option);

//         // Clean up ECharts instance on component unmount
//         return () => myChart.dispose();
//     }, [xAxisData, yAxisData]);

//     if (!xAxisData || !yAxisData) {
//         // Return null if xAxisData or yAxisData is not available
//         return null;
//     }

//     return (
//         <div className="w-full justify-end">
//             {/* Use ref to get a reference to the ECharts container */}
//             <div ref={chartRef} style={{ width: "1200px", height: "800px" }}></div>
//         </div>
//     );
// }

// export default HeatmapComponent;