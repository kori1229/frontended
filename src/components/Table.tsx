import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface TableProps {
  tableData: {
    jdId: string;
    recommendedName: string;
  }[];
}

interface TableDataMapProps {
  jdId: string;
  recommendedName: string;
}

const Table = ({ tableData }: TableProps) => {
  const newData = tableData.map((row: TableDataMapProps, index: number) => ({
    id: index + 1,
    ...row,
  }));
  console.log(newData);

  const columns: GridColDef[] = [
    { field: "jdId", headerName: "Jd ID", width: 150 },
    { field: "recommendedName", headerName: "Recommendation", width: 800 },
  ];

  return (
    <div>
      <DataGrid
        rows={newData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

export default Table;