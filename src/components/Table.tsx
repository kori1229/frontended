import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface TableProps{
  tableData: any;
}

const Table = ({tableData}:TableProps) => {
  // console.log(tableData)
  const newArray = tableData.map((v:any, index:number) => ({id:index+1,...v}))
  // console.log("sdfsdosdfjsdkfjsdfjs")
  console.log(newArray)


  const columns: GridColDef[] = [
    { field: 'jdId', headerName: 'Jd ID', width: 150 },
    { field: 'recommendedName', headerName: 'Recommendation', width: 800 },
    
    // { field: 'lastName', headerName: 'Last name', width: 130 },
    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 90,
    // },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    // },
  ];

  return (
    <div >
    <DataGrid
      rows={newArray}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
    />
  </div>
  )
}

export default Table;


// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// const rows = [
//   {
//     id: "12345",
//     "recommendedName": "Example Name"
//   },
  // {
  //   jdId: "12346",
  //   "recommendedName": "Sample Name 1"
  // },
  // {
  //   jdId: "12347",
  //   "recommendedName": "Sample Name 2"
  // },
  // {
  //   jdId: "12348",
  //   "recommendedName": "Sample Name 3"
  // },
  // {
  //   jdId: "12349",
  //   "recommendedName": "Sample Name 4"
  // },
  // {
  //   jdId: "12350",
  //   "recommendedName": "Sample Name 5"
  // },
  // {
  //   jdId: "12351",
  //   "recommendedName": "Sample Name 6"
  // },
  // {
  //   jdId: "12352",
  //   "recommendedName": "Sample Name 7"
  // },
  // {
  //   jdId: "12353",
  //   "recommendedName": "Sample Name 8"
  // },
  // {
  //   jdId: "12354",
  //   "recommendedName": "Sample Name 9"
  // },
  // {
  //   jdId: "12355",
  //   "recommendedName": "Sample Name 10"
  // }
// ]
