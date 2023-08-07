import React, { useReducer, useRef, useState } from 'react'
import { ApplyButton } from '@components/common/Button/Button'
import DataTable from '@components/common/Table/DataTable'
import { popularHeaders, popularItems } from '@constants/dummyDatas'
import Modal from '@components/common/Modal/Modal'
import { BoardFrame } from '@components/common/Board/Board'
import TopQueryBoard from '@components/PopularTerms/TopQueryBoard'
import HideSearchTermsBoard from '@components/PopularTerms/HideSearchTermsBoard'
import OverridingSearchTermsBoard from '@components/PopularTerms/OverridingSearchTermsBoard'

function PopularTerms() {
    const handleApply = () => {}

    return (
        <>
            <BoardFrame justifyContent="space-between">
                <TopQueryBoard />
                <BoardFrame
                    direction="column"
                    width="59%"
                    height='90vh'
                    margin="0"
                    justifyContent="space-between"
                >
                    <HideSearchTermsBoard />
                    <OverridingSearchTermsBoard />
                </BoardFrame>

                <BoardFrame
                    direction="column"
                    width="20%"
                    margin="0"
                    justifyContent="space-between"
                >
                    <BoardFrame width="100%" height="45%" variant="bordered">
                        <span className="caption">인기 검색어(현재)</span>
                        <DataTable
                            headers={popularHeaders}
                            items={popularItems}
                            isHeaderShown={false}
                        />
                    </BoardFrame>
                    <BoardFrame width="100%" height="45%" variant="bordered">
                        <span className="caption">인기 검색어(미리보기)</span>

                        <DataTable
                            headers={popularHeaders}
                            items={popularItems}
                            isHeaderShown={false}
                        />
                    </BoardFrame>

                    <BoardFrame
                        alignItems="center"
                        justifyContent="flex-end"
                        margin="0.5rem 0"
                        direction="column"
                    >
                        <ApplyButton onClick={handleApply} width="100%">
                            인기 검색어 적용
                        </ApplyButton>
                    </BoardFrame>
                </BoardFrame>
            </BoardFrame>
        </>
    )
}

export default PopularTerms
