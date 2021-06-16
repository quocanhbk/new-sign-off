/* eslint-disable react/prop-types */
import React from 'react'
import styled from "styled-components";
import { getFader } from '../../utils/color';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
    max-width: 30rem;
`
const ImgContainer = styled.div`
    display: grid;
    place-items: center;
`
const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    & button {
        border: none;
        padding: 0.5rem 1rem;
        min-width: 7rem;
        border-radius: 0.2rem;
        font-size: 1rem;
        cursor: pointer;
        color: ${props => props.theme.color.background.primary};
    }

    & .request-confirm {
        background: ${props => props.theme.color.fill.success};
        &:hover {
            background: ${props => getFader(props.theme.color.fill.success, 0.8)}
        }
    }
    & .request-cancel {
        background: ${props => props.theme.color.fill.danger};
        &:hover {
            background: ${props => getFader(props.theme.color.fill.danger, 0.8)}
        }
    }
`
const Text = styled.div`
    & p {
        text-align: center;
    }
    & .request-sub {
        color: ${props => props.theme.color.text.secondary};
    }
    & .request-title {
        font-size: 1.1rem;
        font-weight: 600;
    }
`
const SubmitPopup = ({closeSubmit, submitRequest, title}) => {
    return (
        <Container>
            <ImgContainer>
                <img src="/submit.svg" alt=""/>
            </ImgContainer>
            <Text>
                <p className="request-sub">Are you sure to submit?</p>
                <p className="request-title">{title}</p>
            </Text>
            <ButtonContainer>
                <button className="request-cancel" onClick={closeSubmit}>Cancel</button>
                <button className="request-confirm" onClick={submitRequest}>Confirm</button>
            </ButtonContainer>
        </Container>
    )
}

export default SubmitPopup