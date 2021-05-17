/* eslint-disable react/prop-types */
import React from 'react';
import styled, { css } from 'styled-components'
import { getFader } from '../../../utils/color';
import {BsFileEarmarkText} from 'react-icons/bs'

const CardWrapper = styled.div`
    border: 1px solid ${props => props.theme.color.border.primary};
    border-radius: 0.5rem;
    box-shadow: ${props => props.theme.shadow};
    display: flex;
    position: relative;
    gap: 1rem;
    padding: 0.5rem 1rem;

    ${props => props.active && css`
        background: ${props => getFader(props.theme.color.border.primary, 0.5)};
        color: ${props => props.theme.color.fill.primary};
        font-weight: 600;
        &:hover {
            background: ${props => props.theme.color.border.primary};
        }
    `}

    &:hover {
        background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    }
`
let IconWrapper = styled.div`
    display: grid;
    place-items: center;
`
let InfoWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.2rem;
`
let FormName = styled.div`
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
`
let SubInfo = styled.div`
    font-size: 0.9rem;
    color: ${props => props.theme.color.text.secondary};
    font-style: italic;
`

function Card() {

    return (
        <CardWrapper>
            <IconWrapper>
                <BsFileEarmarkText size="1.5rem"/>
            </IconWrapper>
            <InfoWrapper>
                <FormName>Form Name Is A Very Long Name</FormName>
                <SubInfo>formname.pdf</SubInfo>
                <SubInfo>Created by: La Quoc Anh</SubInfo>
            </InfoWrapper>
        </CardWrapper>
    );
}

export default Card;