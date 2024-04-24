
interface TableProps{
  tableData: any;
}
const Table = ({tableData}:TableProps) => {
  console.log(tableData)
  return (
    <div>Table</div>
  )
}

export default Table;