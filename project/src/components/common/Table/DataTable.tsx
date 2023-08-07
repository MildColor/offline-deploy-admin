import React from 'react'
import { DataTableProps } from '../../../types//table'
import Thead from './Thead'
import Tbody from './Tbody'
import * as Style from './Table.styles'
import Table from './Table'

function DataTable({
    headers,
    items = [],
    caption,
    isHeaderShown = true,
    variant,
    onClick,
    children,
}: DataTableProps) {
    return (
        <Style.DataTableWrapper>
            <Table variant={variant}>
                {isHeaderShown && (
                    <Thead headers={headers} variant={variant}></Thead>
                )}
                <Tbody
                    items={items}
                    headers={headers}
                    variant={variant}
                    onClick={onClick}
                ></Tbody>
            </Table>
        </Style.DataTableWrapper>
    )
}

export default DataTable
