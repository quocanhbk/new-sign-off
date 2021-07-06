/* eslint-disable react/prop-types */
import React from 'react'
import styled from "styled-components";
import Button from 'components/Base/Button'
const Container = styled.div`
    display: flex;
    flex-direction: column;
    & > * + * {
		margin-top: 2rem;
	}
    padding: 1rem;
    max-width: 30rem;
`
const ImgContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    & > * + * {
		margin-left: 1rem;
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
                <Button type="fill" color="primary" padding="0.5rem 2rem" onClick={() => {closeSubmit();submitRequest()}}>Confirm</Button>
                <Button color="primary" padding="0.5rem 2rem" variant="outline" onClick={closeSubmit}>Cancel</Button>
            </ButtonContainer>
        </Container>
    )
}

export default SubmitPopup