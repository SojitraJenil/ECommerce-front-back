"use client";

import React, {
    useCallback,
    useMemo,
    useRef,
    useState,
    StrictMode,
} from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import {
    ClientSideRowModelModule,
    ModuleRegistry,
    NumberEditorModule,
    NumberFilterModule,
    PaginationModule,
    RowSelectionModule,
    TextEditorModule,
    TextFilterModule,
    ValidationModule,
    createGrid,
} from "ag-grid-community";
ModuleRegistry.registerModules([
    NumberEditorModule,
    TextEditorModule,
    TextFilterModule,
    NumberFilterModule,
    RowSelectionModule,
    PaginationModule,
    ClientSideRowModelModule,
    ValidationModule,
]);

const TableCart = () => {
    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {
            field: "athlete",
            minWidth: 170,
        },
        { field: "age" },
        { field: "country" },
        { field: "year" },
        { field: "date" },
        { field: "sport" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
    ]);
    const defaultColDef = useMemo(() => {
        return {
            editable: true,
            filter: true,
            flex: 1,
            minWidth: 100,
        };
    }, []);
    const rowSelection: any = useMemo(() => {
        return {
            mode: "multiRow",
            groupSelects: "descendants",
        };
    }, []);

    return (
        <div style={containerStyle}>
            <div style={gridStyle}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowSelection={rowSelection}
                    pagination={true}
                />
            </div>
        </div>
    );
};

export default TableCart;