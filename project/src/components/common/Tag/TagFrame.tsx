import React, { useState } from 'react';
import { useForm } from '@hooks/common/Form/useForm';
import styled from 'styled-components';
import { Input } from '../Input/Input';
import Tag from './Tag';

interface TagFrameProps {
    name: string;
    tagArr: string[];
    onAddTagHandler: (str: string) => void;
    onDeleteTagHandler: (str: string) => void;
}

function TagFrame({ 
        name, 
        tagArr, 
        onAddTagHandler, 
        onDeleteTagHandler,
}: TagFrameProps) {

    const [isComposing, setIsComposing] = useState(false);
    const [state, onChange, setState] = useForm({
        [name]: ''
    });

    const createTags = () => {
        return tagArr?.map((tag, idx) => 
            <Tag key={idx} tagName={tag} onClickHandler={onDeleteTagHandler}/>
        )
    }

    // event handler
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(isComposing) return;
        if(e.key === "Enter" && state){
            onAddTagHandler(state[name]);
            setState({ [name]: '' });
        }
    }

    return (
        <TagFrameBox>
            <TagContainer>
                {createTags()}
            </TagContainer>
            <Input
                variant='normal'
                name={name}
                onKeyDown={handleKeyDown}
                onCompositionStart={()=>setIsComposing(true)}
                onCompositionEnd={()=>setIsComposing(false)}
                onChange={onChange}
                value={state[name]}
            />
        </TagFrameBox>

    );
}

const TagFrameBox = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;

    border-radius: 5px;
    width: 100%;
    background-color: rgb(224, 235, 245);
    padding: 1rem;
    margin-right: 1rem;
`

const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;

    /* scroll */
    max-height: 9rem;
    overflow-y: scroll;

    padding: 0 0.4rem;

    margin-bottom: 8px;
    &:empty {
        margin-bottom: 0;
    }
`


export default TagFrame;