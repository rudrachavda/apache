/**
 * The Sidebar component is a React component that allows users to upload a CSV file, parse the data,
 * and select X and Y values to display in a chart.
 * @returns The Sidebar component is being returned.
 */
import React, { useState } from 'react';
import Papa from 'papaparse';
import Chart from './chart';

function Sidebar() {
  const [parsedData, setParsedData] = useState({});
  const [columns, setColumns] = useState([]);
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);
  const [xLabel, setXLabel] = useState ("");
  const [yLabel, setYLabel] = useState ("");
  

  const changeXValue = (selectedValue)=>{
    setXLabel(selectedValue)
    setXData(parsedData[selectedValue])
  }
  const changeYValue = (selectedValue)=>{
    setYLabel(selectedValue)
    setYData(parsedData[selectedValue])
  }



  const handleFile = (event) => {
    const uploadedFile = event.target.files[0];


  
    if (uploadedFile) {
      Papa.parse(uploadedFile, {
        header: true,
        complete: (results) => {
          console.log(results)
          if (results.data && results.data.length > 0) {
            let firstRow = results.data[0];
            console.log("firstRow", firstRow);
            let keys = Object.keys(firstRow);
            setColumns(keys);
            console.log("keys", keys)
            // console.log(keys);
            //keys = [customer name, balance,  zipcode, state]
            //results.data[0] = [customername:rudra, balance:1000,]
            //results.data[0]['customername']
            let tmpJson = {

            }
            keys.forEach(k => {
              tmpJson[k] = [];
            })

            results.data.forEach(row => {
              keys.forEach(k => {
                tmpJson[k].push(row[k])
                // console.log(row[k])
              })
            })

            console.log("tmpJson", tmpJson)
            console.log("keys of tmpJsn", Object.keys(tmpJson))
            console.log("values of tmpJsn", Object.values(tmpJson))
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
          <select id={'X'} onChange = {(e)=>changeXValue(e.target.value)} className="ml-2">
            {columns.map((item, index) => (
              <option value={item}  key={index}>{item}</option>
            ))}
          </select>
          <label htmlFor={`Y`} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {'Y'}
          </label>
          <select id={`Y`}  onChange = {(e)=>changeYValue(e.target.value)}  className="ml-2">
            {columns.map((item, index) => (
              <option value={item}  key={index}>{item}</option> 
            ))}
          </select>
        </div>

      </div>
      <div className=" w-3/4 mb-5">
        <Chart xAxisLabel={xLabel} xAxisData={xData} yAxisLabel={yLabel} yAxisData={yData} />
      </div>
    </div>
  );
}

export default Sidebar;

