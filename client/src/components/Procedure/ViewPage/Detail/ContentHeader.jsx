/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState} from 'react'
import styled from "styled-components";
import Button from 'components/Button'

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

    & button {
        border: none;
        border-radius: 0.2rem;
        padding: 0.5rem 1rem;
        outline: none;
        font-size: 1rem;
        color: ${props => props.theme.color.background.primary};
        cursor: pointer;
    }
    & .form-delete {
        background: ${props => props.theme.color.fill.danger};
    }
    & .form-edit {
        background: ${props => props.theme.color.fill.info};
    }
`
const ContentHeader = ({title, onDeleteClick, onEditClick}) => {

    return (
        <Container>
            <h3>{title}</h3>
            <ButtonContainer>
                <Button color="danger" onClick={() => onDeleteClick()}>Delete</Button>
                <Button color="info" onClick={onEditClick}>Edit</Button>
            </ButtonContainer>
        </Container>
    )
}

export default ContentHeader