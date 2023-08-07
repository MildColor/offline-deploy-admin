import { HTMLAttributes } from 'react'

export interface TableItem extends HTMLAttributes<HTMLTableSectionElement> {
    [key: string]: string | boolean | undefined | number
}

export interface TableHeaders extends HTMLAttributes<HTMLTableSectionElement> {
    text: string
    value: string
}
export interface TableHeadersProps {
    headers: TableHeaders[]
    variant?: string
}

export interface TbodyProps {
    headers: TableHeaders[]
    items: TableItem[]
    onClick?: (id?: number | string | undefined) => void
    variant?: string
}

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
    variant?: string
    children?: React.ReactNode
}

export interface DataTableProps {
    headers: TableHeaders[]
    items: TableItem[]
    caption?: string
    variant?: string
    isHeaderShown?: boolean
    onClick?: (id?: number | string | undefined) => void
    children?: React.ReactNode
}

export type StyleTableProps = Omit<TableProps, 'headers' & 'items'>
