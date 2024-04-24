import { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import Header from './components/Header';
import Table from './components/Table';

interface FetchDataProps{
  data:any
}

function App() {
  const [tableData, setTableData] = useState()
  
  // const setFetchData = ({data}:FetchDataProps) => {
  //   console.log(data)
  //   return setTableData(data)
  // }

  return (
    <>
      <Header />
      <div className='main'>
        {!tableData ? <FileUpload tableData={tableData} setTableData={setTableData} /> : <Table tableData={tableData} />}
      </div>
    </>
  );
}

export default App;