import React, { useState } from 'react';
import Papa from 'papaparse';

function Sidebar() {
  const [parsedData, setParsedData] = useState([]);
  const [columns,setColumns] = useState([]);

  const handleFile = (event) => {
    const uploadedFile = event.target.files[0];

    if (uploadedFile) {
      Papa.parse(uploadedFile, {
        header: true,
        complete: (results) => {
          console.log(results)
          if(results.data && results.data.length>0){
            let firstRow = results.data[0];
            console.log("firstRow",firstRow);
            let keys = Object.keys(firstRow);
            setColumns(keys);
            console.log("keys",keys)
            // console.log(keys);
            //keys = [customer name, balance,  zipcode, state]
            //results.data[0] = [customername:brijesh, balance:1000,]
            //results.data[0]['customername']
            let tmpJson = {

            }
            keys.forEach(k=>{
              tmpJson[k] = [];
            })

            results.data.forEach(row=>{
              keys.forEach(k=>{
                tmpJson[k].push(row[k])
                // console.log(row[k])
              })
            })

            console.log("tmpJson",tmpJson)
            console.log("keys of tmpJsn",Object.keys(tmpJson))
            console.log("values of tmpJsn",Object.values(tmpJson))


          }          
        },
      });
    }
  };


  return (
    <div className="w-1/6 px-4 h-screen">
      <div className="sticky top-20 p-4 bg-gray-100 rounded-xl w-full h-full">
        <input type="file" onChange={handleFile} />

        <ul className="flex flex-col overflow-hidden content-center justify-center">
          { columns.map((item, index) => (
            <li
              key={index}
              className="py-2 hover:shadow-md rounded justify-center"
            >
              <span className="hidden sm:inline">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;