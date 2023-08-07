import React from 'react';
import styled from 'styled-components';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TagProps {
    tagName: string;
    onClickHandler: (str: string) => void;
}

export default function Tag({ tagName, onClickHandler }: TagProps) {
    const handleOnClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        onClickHandler(tagName);
    };

    return (
        <TagDiv onClick={handleOnClick}>
            {tagName}
            <Icon
                icon={faXmark}
                size="sm"
            />
        </TagDiv>
    );
}

const TagDiv = styled.div`
    display: flex;
    align-items: center;

    /* font */
    font-size: 1.4rem;
    color: #ffffff;

    /* background */
    background-color: rgb(56, 128, 216);
    padding: 4px 12px;
    border-radius: 0.5rem;
    max-width: 95%;
    word-break:break-all;
    
    &:hover {
        cursor: pointer;
        background-color: rgb(45, 107, 184);
        
        /* prevent drag */
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none
    }

    &, & {
        margin-right: 1rem;
        margin-top: 0.5rem;
    }

    svg {
        font-size: 14px;
        margin-left: 8px;
    }
`

const Icon = styled(FontAwesomeIcon)`
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.white[0]};
`