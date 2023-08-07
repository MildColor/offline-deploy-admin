import { flexCenter } from '@styles/mixins'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function NotFoundPage() {
    const navigate = useNavigate()

    const onClick = () => {
        navigate('/dashboard')
    }

    // const { data } = autocompeleteQueries.useGetAutocompleteTerms({
    //     query: 'SELECT',
    //     page: 1,
    // })

    // const { usePostAutocompleteTerms } = autocompeleteMutations

    // const { mutate: autocompeleteMutate } = usePostAutocompleteTerms()

    // const { mutate: signInMutate } = useSignInMutation()

    return (
        <Container>
            <SVG
                viewBox="-19.5 -250 500 300"
                preserveAspectRatio="xMinYMin meet"
            >
                <ErrorMainText>404</ErrorMainText>
            </SVG>
            <ErrorSubText>The requested page was not found.</ErrorSubText>
            <RedirectButton onClick={onClick}>Go to main page</RedirectButton>
        </Container>
    )
}

export default NotFoundPage

const Container = styled.div`
    ${flexCenter}
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-color: ${({ theme }) => theme.colors.blue[3]};
`

const SVG = styled.svg`
    ${flexCenter}
    width: 500px;
    height: 300px;
    text-transform: uppercase;
    animation: stroke 5s 10 alternate;
    fill: rgba(72, 138, 204, 1);
    fill: white;
    @keyframes stroke {
        0% {
            stroke-dashoffset: 25%;
            stroke-dasharray: 0 50%;
            fill: rgba(72, 138, 204, 0);
            stroke: rgba(54, 95, 160, 1);
            stroke-width: 2;
        }
        70% {
            fill: rgba(72, 138, 204, 0);
            stroke: rgba(54, 95, 160, 1);
        }
        80% {
            fill: rgba(72, 138, 204, 0);
            stroke: rgba(54, 95, 160, 1);
        }
        100% {
            stroke-dashoffset: -25%;
            stroke-dasharray: 50% 0;
            fill: rgba(72, 138, 204, 1);
            stroke: rgba(54, 95, 160, 0);
            stroke-width: 0;
        }
    }
`

const ErrorMainText = styled.text`
    font-size: 25rem;
    color: ${({ theme }) => theme.colors.white[0]};
    font-weight: bold;
    text-shadow: 1px 0px 1px #cccccc, 0px 1px 1px #eeeeee, 2px 1px 1px #cccccc,
        1px 2px 1px #eeeeee, 3px 2px 1px #cccccc, 2px 3px 1px #eeeeee,
        4px 3px 1px #cccccc, 3px 4px 1px #eeeeee, 5px 4px 1px #cccccc,
        4px 5px 1px #eeeeee, 6px 5px 1px #cccccc, 5px 6px 1px #eeeeee,
        7px 6px 1px #cccccc;
`
const ErrorSubText = styled.div`
    font-size: 3rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.white[0]};
    text-shadow: 1px 0px 1px #cccccc, 0px 1px 1px #eeeeee, 2px 1px 1px #cccccc,
        1px 2px 1px #eeeeee, 3px 2px 1px #cccccc;
`

const RedirectButton = styled.button`
    margin: 3rem;
    font-size: 2.5rem;
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.white[0]};
    border-radius: 30px;
    padding: 1rem;
    color: ${({ theme }) => theme.colors.blue[3]};
    transition: all 0.5s ease-in-out;
    box-shadow: 1px 0px 1px #cccccc, 0px 1px 1px #eeeeee, 2px 1px 1px #cccccc,
        1px 2px 1px #eeeeee, 3px 2px 1px #cccccc, 2px 3px 1px #eeeeee,
        4px 3px 1px #cccccc;
    :active {
        box-shadow: none;
    }
`
