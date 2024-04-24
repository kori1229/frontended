import React, { useState } from 'react';
import './App.css';
import FileUpload from './test4';
import Header from './header';
import Table from './Table';


function App() {
  const [tableData, setTableData] = useState()
  
  const setFetchData = (data) => {
    console.log(data)
    return setTableData(data)
  }

  return (
    <>
      <Header />
      <div className='main'>
        {!tableData ? <FileUpload tableData={tableData} setFetchData={setFetchData} /> : <Table tableData={tableData} />}
      </div>
    </>
  );
}

export default App;