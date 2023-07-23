
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import HeatmapComponent from './heatmap';

function HeatmapSB() {
    const [parsedData, setParsedData] = useState({});
    const [columns, setColumns] = useState([]);
    const [xData, setXData] = useState([]);
    const [yData, setYData] = useState([]);
    const [xUniqueData, setXUniqueData] = useState([]);
    const [yUniqueData, setYUniqueData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [maxCount, setMaxCount] = useState(0);

    const [xLabel, setXLabel] = useState("");
    const [yLabel, setYLabel] = useState("");

    const prepareChartData = () => {
        if (xData.length === 0 || yData.length === 0) {
            return;
        }
        let hash = {}
        let mc = 0
        //this loop finds the count of occurrence of particular salary in particular zipcode and puts in hash
        for (let t = 0; t < xData.length; t++) {
            if (!hash["" + yData[t]]) hash["" + yData[t]] = {}

            if (!hash["" + yData[t]]["" + xData[t]]) { 
                hash["" + yData[t]]["" + xData[t]] = 0 
            }
            hash["" + yData[t]]["" + xData[t]] = hash["" + yData[t]]["" + xData[t]] + 1

            if (mc < hash["" + yData[t]]["" + xData[t]]) {
                mc = hash["" + yData[t]]["" + xData[t]]
            }
        }
        let newData = []

        //this loop prepares the newData , which , apache echart heatmap can understand.
        //newData is array of array. child array contains [x,y,count]
        for (let y = 0; y < yUniqueData.length; y++) {
            for (let x = 0; x < xUniqueData.length; x++) {
                let count = hash["" + yUniqueData[y]]["" + xUniqueData[x]]
                    ? hash["" + yUniqueData[y]]["" + xUniqueData[x]]
                    : 0
                newData.push([x, y, count])
            }
        }
        console.log(hash, mc, newData)
        setMaxCount(mc)
        setChartData(newData)
    }
    useEffect(() => {
        //get unique value of x
        //get unique value of y
        //prepare chartData
        prepareChartData();
    }, [xData, yData])
    const changeXValue = (selectedValue) => {
        if (selectedValue === 0) {
            return;
        }
        setXLabel(selectedValue)
        setXData(parsedData[selectedValue])
        //get unique values of xData
        let xSet = new Set(parsedData[selectedValue])
        setXUniqueData(Array.from(xSet))

        
        

    }
    const changeYValue = (selectedValue) => {
        if (selectedValue === 0) {
            return;
        }
        setYLabel(selectedValue)
        setYData(parsedData[selectedValue])


        let ySet = new Set(parsedData[selectedValue])
        setYUniqueData(Array.from(ySet))
    }

    const handleFile = (event) => {
        const uploadedFile = event.target.files[0];

        if (uploadedFile) {
            Papa.parse(uploadedFile, {
                header: true,
                complete: (results) => {
                    if (results.data && results.data.length > 0) {
                        let firstRow = results.data[0];
                        let keys = Object.keys(firstRow);
                        setColumns(keys);

                        let tmpJson = {

                        }
                        keys.forEach(k => {
                            tmpJson[k] = [];
                        })

                        results.data.forEach(row => {
                            keys.forEach(k => {
                                tmpJson[k].push(row[k])
                            })
                        })

                        setParsedData(tmpJson)

                    }
                },
            });
        }
    };


    return (
        <div className="grid grid-cols-2">
            <div className="border-black border-1">
                <input onChange={handleFile}
                    className="block w-1/2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mt-2 ml-2" id="file_input" type="file" />

                <div className="flex items-center mb-4 ml-2 mt-2">
                    <label htmlFor={`X axis`} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {'X'}
                    </label>
                    <select id={'X'} onChange={(e) => changeXValue(e.target.value)} className="ml-2">
                        <option value={0} key={"0-element"}>Please select</option>
                        {columns.map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                        ))}
                    </select>
                    <label htmlFor={`Y`} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {'Y'}
                    </label>
                    <select id={`Y`} onChange={(e) => changeYValue(e.target.value)} className="ml-2">
                        <option value={0} key={"0-element"}>Please select</option>
                        {columns.map((item, index) => (
                            <option value={item} key={index}>{item}</option>
                        ))}
                    </select>
                </div>

            </div>
            {Object.keys(parsedData).length > 0 && (
                <div className=" w-3/4 mb-5">

                    <HeatmapComponent
                        xLabel={xLabel}
                        xUniqueData={xUniqueData}
                        yLabel={yLabel}
                        yUniqueData={yUniqueData}
                        chartData={chartData}
                        maxCount={maxCount}
                    />
                </div>

            )}
        </div>
    );
}

export default HeatmapSB;