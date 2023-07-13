import React, { useState } from 'react';
import Papa from 'papaparse';
import Chart from './chart';

function Sidebar() {
  const [parsedData, setParsedData] = useState({});
  const [columns, setColumns] = useState([]);

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
            //results.data[0] = [customername:brijesh, balance:1000,]
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
        <input onChange={handleFile} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />

        {columns.map((item, index) => (

          <div class="flex items-center mb-4">
            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label for="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item}</label>
          </div>

        ))}
      </div>
      <div className="mb-5">
        <Chart xAxisLabel={"State"} xAxisData={parsedData["state"]} yAxisLabel={"Balance"} yAxisData={parsedData["balance"]} />
      </div>



    </div>
  );
}

export default Sidebar;