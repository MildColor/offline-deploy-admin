import React from 'react'
import { TableProps } from '../../../types/table'
import * as Style from './Table.styles'

function Table({ variant, children }: TableProps) {
    return <Style.Table variant={variant}>{children}</Style.Table>
}
export default Table
