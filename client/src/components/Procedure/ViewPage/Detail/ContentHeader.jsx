/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import styled from "styled-components";
import Button from 'components/Button'
import Toggle from './Toggle';
import { getFader } from 'utils/color';
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

    & .form-delete {
        background: ${props => props.theme.color.fill.danger};
    }
    & .form-edit {
        background: ${props => props.theme.color.fill.info};
    }
`
const ToggleContainer = styled.div`
    display: grid;
    place-items: center;
    padding: 0 0.5rem;
    border: 1px solid ${props => props.theme.color.border.primary};
    background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    border-radius: 0.2rem;
    color: ${props => props.theme.color.text[props.isActive ? "success" : "danger"]};
`
const ContentHeader = ({title, isActive, onDeleteClick, onEditClick, onToggleActive}) => {

    return (
        <Container>
            <h3>{title}</h3>
            <ButtonContainer>
                <ToggleContainer isActive={isActive}>
                    <Toggle value={isActive} onSelect={(v) => onToggleActive(v)}>Active</Toggle>
                </ToggleContainer>
                <Button color="danger" onClick={() => onDeleteClick()}>Delete</Button>
                <Button color="info" onClick={onEditClick}>Edit</Button>
            </ButtonContainer>
        </Container>
    )
}

export default ContentHeader