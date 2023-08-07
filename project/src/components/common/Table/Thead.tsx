import React from 'react'
import { TableHeaders, TableHeadersProps } from '../../../types/table'
import * as Style from './Table.styles'

function Thead({ headers, variant }: TableHeadersProps) {
    return (
        <Style.Thead variant={variant}>
            <tr>
                {headers.map((headers) => (
                    <th key={headers.text}>{headers.text}</th>
                ))}
            </tr>
        </Style.Thead>
    )
}

export default Thead
