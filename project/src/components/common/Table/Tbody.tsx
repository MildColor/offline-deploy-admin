import React from 'react'
import { TableItem, TbodyProps } from '../../../types/table'
import * as Style from './Table.styles'
import { Link } from 'react-router-dom'

function Tbody({ items, headers, variant, onClick, ...props }: TbodyProps) {
    const headerKey = headers.map((header) => header.value)
    const onClickItem = (id: number | string | undefined) => {
        if (!onClick) {
            return
        }
        if (id) {
            onClick(id)
        } else {
            onClick()
        }
    }

    return (
        <Style.Tbody variant={variant} {...props}>
            {items.map((item: TableItem, index) => (
                <tr key={index} onClick={() => onClickItem(item?.id)}>
                    {headerKey.map((key) => (
                        <td key={key + index}>
                            <Link to={item.id ? item.id : '0'}>
                                {item[key]}
                            </Link>
                        </td>
                    ))}
                </tr>
            ))}
        </Style.Tbody>
    )
}

export default Tbody
