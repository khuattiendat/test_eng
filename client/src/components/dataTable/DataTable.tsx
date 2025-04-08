import {
    DataGrid,
    GridColDef,
    GridToolbar,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import {Link} from "react-router-dom";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
    columns: GridColDef[];
    rows: object[];
    slug: string;
    loading?: boolean;
    handleDelete?: (id: number) => void;
};

const DataTable = (props: Props) => {

    const actionColumn: GridColDef = {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
            return (
                <div className="action">
                    <Link to={`/${props.slug}/${params.row.id}`}>
                        <img src="/view.svg" alt=""/>
                    </Link>
                    {/*@ts-ignore*/}
                    <div className="delete" onClick={() => props.handleDelete(params.row._id)}>
                        <img src="/delete.svg" alt=""/>
                    </div>
                </div>
            );
        },
    };


    return (
        <div className="dataTable">
            <DataGrid
                className="dataGrid responsive"
                getRowId={(row => row._id)}
                rows={props.rows}
                columns={[...props.columns, actionColumn]}
                slots={{toolbar: GridToolbar}}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: {debounceMs: 500},
                    },
                }}
                pageSizeOptions={[1]}
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnFilter
                disableDensitySelector
                disableColumnSelector
                autoHeight
                loading={props.loading}
                hideFooter
            />
        </div>
    );
};

export default DataTable;
