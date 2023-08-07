import React, { Dispatch, SetStateAction } from 'react'
import Pagination from 'react-js-pagination'
import styled from 'styled-components'

interface PaginationPropsType<T> {
    page: number
    setPage: Dispatch<SetStateAction<T>>
}

function PaginationBox<T>({ page, setPage }: PaginationPropsType<T>) {
    const handlePageChange = (pageNumber: number) => {
        if (setPage) setPage((prev) => ({ ...prev, page: pageNumber - 1 }))
    }
    return (
        <StPagination>
            <Pagination
                activePage={page + 1}
                itemsCountPerPage={5}
                totalItemsCount={300}
                pageRangeDisplayed={5}
                onChange={(pageNumber) => handlePageChange(pageNumber)}
            ></Pagination>
        </StPagination>
    )
}

export default PaginationBox

const StPagination = styled.div`
    .pagination {
        display: flex;
        justify-content: center;
        margin: 0.5rem 0;
    }
    ul {
        list-style: none;
        padding: 0;
    }
    ul.pagination li {
        display: inline-block;
        width: 3rem;
        height: 3rem;
        border: 1px solid #e2e2e2;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        margin: 0 0.3rem;
    }
    ul.pagination li:first-child {
        border-radius: 5px 0 0 5px;
    }
    ul.pagination li:last-child {
        border-radius: 0 5px 5px 0;
    }
    ul.pagination li a {
        text-decoration: none;
        color: #337ab7;
        font-size: 1rem;
    }
    ul.pagination li.active a {
        color: white;
    }
    ul.pagination li.active {
        background-color: ${({ theme }) => theme.colors.blue[3]};
    }
    ul.pagination li a:hover,
    ul.pagination li a.active {
        color: blue;
    }
`
