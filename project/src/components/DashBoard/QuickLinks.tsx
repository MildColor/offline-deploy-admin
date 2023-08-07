import React, { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import { BoardFrame } from '@components/common/Board/Board'
import { routeList } from '@constants/routeList'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { flexRow } from '@styles/mixins'
import { TYPOGRAPHY_STYLES, getTypographyStyles } from '@styles/font'

function QuickLinks() {
    const [isHover, setIsHover] = useState({ id: -1, isHover: false })
    return (
        <>
            <BoardFrame justifyContent="space-between">
                {routeList.slice(3, routeList.length).map((item, idx) => {
                    return (
                        <BoardFrame
                            key={idx}
                            variant="bordered"
                            height="15rem"
                            width="24.3%"
                            padding="2rem"
                            direction="row"
                        >
                            <LinkWrapper
                                to={
                                    item.main.PATH
                                        ? item.main.PATH + item.sub[0].PATH
                                        : '/'
                                }
                                onMouseEnter={() =>
                                    setIsHover({ id: idx, isHover: true })
                                }
                                onMouseLeave={() =>
                                    setIsHover({ id: -1, isHover: false })
                                }
                            >
                                <Icon
                                    icon={item.main.icon ?? faHouse}
                                    size="2xl"
                                    beat={isHover.id === idx ?? isHover}
                                />
                                <BoardFrame
                                    direction="column"
                                    margin="0 0 0 1rem"
                                >
                                    <TitleText>
                                        {item.main.NAME + ' 관리'}
                                    </TitleText>
                                    <SubText>{item.main.desc}</SubText>
                                </BoardFrame>
                            </LinkWrapper>
                        </BoardFrame>
                    )
                })}
            </BoardFrame>
        </>
    )
}

export default QuickLinks

const TitleText = styled.span`
    ${getTypographyStyles(TYPOGRAPHY_STYLES.Headline1_B)}
    margin: 0.5rem 0.5rem;
`
const SubText = styled.span`
    ${getTypographyStyles(TYPOGRAPHY_STYLES.Headline3_B)}
    margin: 0.5rem 0.5rem;
`

const LinkWrapper = styled(Link)`
    ${flexRow}
`

const Icon = styled(FontAwesomeIcon)``
