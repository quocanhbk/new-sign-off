/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { GoChevronUp,GoChevronDown } from 'react-icons/all';
import styled from 'styled-components'
import {getFader} from '../utils/color'

const StyleWrapper = styled.div`

`
const StyleItem = styled.div`

`
const ItemTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Text = styled.div`

`
const Icon = styled.div`
    cursor: pointer;
    border-radius : 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover{
        background: ${props => getFader(props.theme.color.background.primary, 0.5)};
    }
`
const Content = styled.div`
    padding: 0.5rem 0;
`
function Accordion({title,children}) {
    const [isActive, setIsActive] = useState(true)
    return (
        <StyleWrapper>
            <StyleItem>
                <ItemTitle onClick={() => setIsActive(!isActive)}>
                    <Text>{title}</Text>
                    <Icon>{isActive ? <GoChevronDown size="1.5rem"/> : <GoChevronUp size="1.5rem"/>}</Icon>
                </ItemTitle>
                {
                    isActive && <Content>{children}</Content>
                }
            </StyleItem>
        </StyleWrapper>
    );
}

export default Accordion;