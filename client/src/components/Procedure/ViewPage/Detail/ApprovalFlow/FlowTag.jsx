/* eslint-disable react/prop-types */
import React from "react";
import styled, { css } from "styled-components";
import { BsFillCircleFill } from "react-icons/bs";
import {getFader} from '../../../../../utils/color'

const Container = styled.td`
    padding: 0.5rem;
`
const Body = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid ${props => props.theme.color.border.primary};
    
    border-radius: 0.5rem;
    
    ${props => props.approving && css`
        border: 1px solid ${props => 
            props.theme.color.fill[props.status === "Done" ? "success" : props.status === "Rejected" ? "danger" : "warning"]};
        background: ${props => 
            getFader(props.theme.color.fill[props.status === "Done" ? "success" : props.status === "Rejected" ? "danger" : "warning"], 0.1)};
    `}
    
    & img {
        height: 2rem;
        border-radius: 99px;
    }
`
const Side = styled.td`
    //border: 1px solid red;
    overflow: hidden;
    position: relative;
`
const CheckContainer = styled.div`
    padding: 0.5rem;
    display: grid;
    place-items: center;
`
const CheckWrapper = styled.div`
    //border: 2px solid ${props => props.theme.color.fill.primary};
    color: ${props => props.theme.color.fill.primary};
    display: grid;
    place-items: center;
    border-radius: 99px;
    position: relative;
    background: ${props => props.theme.color.background.primary};
    z-index: 2;
`
const Vertical = styled.div`
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    width: 2px;
    height: ${props => !props.last ? "900%" : "50%"};
    transform: translate(-50%, 0%);
    background: ${props => props.theme.color.fill.primary};
`
const Text = styled.div`
    display: flex;
    flex-direction: column;

    & .flow-tag-name {
        font-weight: 600;
    }

    & .flow-tag-email {
        font-size: 0.8rem;
        color: ${props => props.theme.color.text.secondary};
    }
`
const FlowTag = ({data}) => {
    return (
        <tr>
            <Side>
                <CheckContainer>
                    <CheckWrapper>
                        <BsFillCircleFill size="0.8rem"/>
                    </CheckWrapper>
                </CheckContainer>
                <Vertical last={data.last}/>
            </Side>
            <Container>
                <Body status={data.status}>
                    <img src={"/api/v1/avatar/" + data.email}/>
                    <Text>
                        <p className="flow-tag-name">{data.name}</p>
                        <p className="flow-tag-email">{data.email}</p>
                    </Text>
                </Body> 
            </Container>
        </tr>
    )
}

export default FlowTag