/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import styled from "styled-components";
import Button from 'components/Button';
import FadeButton from 'components/FadeButton'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: ${props => props.theme.color.background.primary};
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
    & h3 {
        font-weight: 500;
        font-size: 1.2rem;
        color: ${props => props.theme.color.fill.primary};
    }
`
const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
`
const ContentHeader = ({title, onDeleteClick, onEditClick}) => {

    return (
        <Container>
            <h3>{title}</h3>
            <ButtonContainer>
                <FadeButton color="danger" onClick={() => onDeleteClick()}>Delete</FadeButton>
                <FadeButton color="info" onClick={onEditClick}>Edit</FadeButton>
            </ButtonContainer>
        </Container>
    )
}

export default ContentHeader