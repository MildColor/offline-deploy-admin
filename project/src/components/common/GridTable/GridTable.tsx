import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { AgGridReactProps } from 'ag-grid-react/lib/shared/interfaces'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import '@components/common/GridTable/styles.css'
import styled from 'styled-components'
import {
    ColDef,
    ColGroupDef,
    ColumnState,
    GridOptions,
    SortChangedEvent,
} from 'ag-grid-community'

interface GridTablePropsType<T> extends AgGridReactProps {
    onSelectionChangedCallback?: (selectedRows: T[]) => void
    onSortChangedCallback?: (sortedColumns: ColumnState[]) => void
    useCheckBox?: boolean
    useSmallTable?: boolean
}
type ColDefsType = Pick<GridOptions, 'columnDefs'>

function GridTable<T>({
    rowData,
    columnDefs,
    rowSelection,
    onSelectionChangedCallback,
    onSortChangedCallback,
    useCheckBox,
    useSmallTable,
}: GridTablePropsType<T>) {
    // grid table API 이용을 위해
    const gridRef = useRef<AgGridReact | null>(null)

    const gridOptions: GridOptions = {
        headerHeight: useSmallTable ? 30 : undefined,
        rowHeight: useSmallTable ? 30 : undefined
    }

    // 기본 colDef 설정
    const defaultColDef = useMemo(
        () => ({
            resizable: true,
            sortable: true,
            flex: 1,
        }),
        []
    )
    // checkBoxHeader 사용 유무
    const combinedColumnDefs = useMemo(() => {
        const checkboxHeader: ColDef<any, any> = {
            headerName: 'All',
            field: 'all',
            headerCheckboxSelection: true,
            checkboxSelection: true,
            sortable: false,
        }

        return useCheckBox
            ? [checkboxHeader, ...(columnDefs || [])]
            : columnDefs
    }, [useCheckBox, columnDefs])

    // 너비 조정
    const handleColumnsToFit = () => {
        gridRef?.current?.api?.sizeColumnsToFit();
    }

    const handleSortChanged = useCallback(
        (e: SortChangedEvent) => {
            const columnState = gridRef?.current?.columnApi.getColumnState()
            const sortedColumns =
                columnState?.filter((v) => v.sort !== null) ?? []

            onSortChangedCallback?.(sortedColumns)
        },
        [onSortChangedCallback]
    )

    // 행 클릭시 callback 실행
    const handleSelectionChanged = useCallback(() => {
        const selectedRows = gridRef?.current?.api?.getSelectedRows() ?? []
        onSelectionChangedCallback &&
            onSelectionChangedCallback(selectedRows as T[])
    }, [onSelectionChangedCallback])

    return (
        <GridContainer className="ag-theme-alpine">
            <AgGridReact
                className="ag-theme-alpine"
                gridOptions={gridOptions}
                ref={gridRef} // Ref for accessing Grid's API
                rowData={rowData} // Row Data for Rows
                columnDefs={combinedColumnDefs} // Column Defs for Columns
                defaultColDef={defaultColDef} // Default Column Properties
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection={rowSelection} // Options - allows click selection of rows
                onSelectionChanged={handleSelectionChanged}
                suppressRowClickSelection={false}
                onSortChanged={handleSortChanged}
                onGridReady={handleColumnsToFit}
            />
        </GridContainer>
    )
}

export default GridTable

const GridContainer = styled.div`
    height: 100%;
    width: 100%;
`
