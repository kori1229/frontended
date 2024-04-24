import { useState } from "react";
import "./App.css";
import FileUpload from "./components/FileUpload";
import Header from "./components/Header";
import Table from "./components/Table";

export interface TableDataType {
  jdId: string;
  recommendedName: string;
}

function App() {
  const [tableData, setTableData] = useState<TableDataType[]>();

  return (
    <>
      <Header />
      <div className="main">
        {!tableData ? (
          <FileUpload setTableData={setTableData} />
        ) : (
          <Table tableData={tableData} />
        )}
      </div>
    </>
  );
}

export default App;
