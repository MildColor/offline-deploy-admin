import styled, { css } from 'styled-components'
import { TableHeadersProps, TableProps, TbodyProps } from '../../../types/table'
import { flexColumn } from '@styles/mixins'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const DataTableWrapper = styled.div`
    ${flexColumn}
    width: 100%;
    /* flex: 1; */
`

export const Table = styled.table<TableProps>`
    width: 100%;
    height: 100%;
    border: 1px solid ${({ theme }) => theme.colors.gray[3]};
    ${({ variant }) => {
        switch (variant) {
            case 'cluster':
                return css`
                    border: none;
                `
        }
    }}
`

export const Thead = styled.thead<Omit<TableHeadersProps, 'headers'>>`
    tr {
        height: 2em;
        background-color: ${({ theme }) => theme.colors.gray[0]};

        th {
            vertical-align: middle;
            text-align: center;
            border: 1px solid ${({ theme }) => theme.colors.gray[3]};
        }
    }
    ${({ variant }) => {
        switch (variant) {
            case 'cluster':
                return css`
                    tr {
                        height: 2em;
                        background-color: white;
                        th {
                            vertical-align: middle;
                            text-align: left;
                            border: none;
                        }
                    }
                `
        }
    }}
`

export const Tbody = styled.tbody<Omit<TbodyProps, 'headers' | 'items'>>`
    tr {
        height: 2em;

        td {
            vertical-align: middle;
            text-align: center;
            border: 1px solid ${({ theme }) => theme.colors.gray[3]};
        }
    }
    ${({ variant }) => {
        switch (variant) {
            case 'cluster':
                return css`
                    tr {
                        height: 2em;
                        font-weight: bold;
                        border: none;
                        td {
                            vertical-align: middle;
                            text-align: left;
                            border: none;
                        }
                    }
                `
        }
    }}
`
