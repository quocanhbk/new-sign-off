/* eslint-disable react/prop-types */
import React from 'react'
import styled from "styled-components";
import FadeButton from 'components/FadeButton'
import FillButton from 'components/FillButton'
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
const SubmitPopup = ({closeSubmit, submitRequest, title, type}) => {
    return (
        <Container>
            <ImgContainer>
                <img src="/submit.svg" alt=""/>
            </ImgContainer>
            <Text>
                <p className="request-sub">Are you sure to {type === "Pending" ? "submit" : "save as Draft"}?</p>
                <p className="request-title">{title}</p>
            </Text>
            <ButtonContainer>
                <FillButton color="primary" padding="0.5rem 2rem" onClick={() => {closeSubmit();submitRequest()}}>Confirm</FillButton>
                <FadeButton color="primary" padding="0.5rem 2rem" variant="outline" onClick={closeSubmit}>Cancel</FadeButton>
            </ButtonContainer>
        </Container>
    )
}

export default SubmitPopup