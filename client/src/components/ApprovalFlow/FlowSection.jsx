/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {Fragment} from 'react'
import { BsCheck, BsFillCircleFill } from 'react-icons/bs'
import styled from 'styled-components'
import FlowTag from './FlowTag'

const Headline = styled.td`
    padding: 0.5rem;
    font-weight: 600;
    color: ${props => props.theme.color.fill.primary};
    //border: 1px solid black;
`
const CheckWrapper = styled.div`
    border: 2px solid ${props => props.theme.color.fill.primary};
    color: ${props => props.theme.color.fill.primary};
    display: grid;
    place-items: center;
    padding: 2px;
    border-radius: 99px;
    position: relative;
    background: ${props => props.theme.color.background.primary};
    z-index: 2;
`
const Vertical = styled.div`
    content: '';
    position: absolute;
    left: 50%;
    top: ${props => props.type === "submitter" ? "50%" : "-2px"};
    width: 2px;
    height: 300%;
    transform: translate(-50%, 0%);
    background: ${props => props.theme.color.fill.primary};
`
const Side = styled.td`
    //border: 1px solid red;
    overflow: visible;
    position: relative;
`
const CheckContainer = styled.div`
    padding: 0.5rem;
    display: grid;
    place-items: center;
`
const FlowSection = ({headline, data, type, done}) => {
    return (
        <Fragment>
            <tr>
                <Side>
                    <CheckContainer>
                        <CheckWrapper>
                            {
                                done ? <BsCheck size="0.8rem" /> : <BsFillCircleFill size="0.8rem"/>
                            }
                        </CheckWrapper>
                    </CheckContainer>
                    <Vertical type={type}/>
                </Side>
                <Headline>{headline}</Headline>
            </tr>
            {data.map(d => 
                <FlowTag key={d.email? d.email : d.user_info.email} data={d}/> 
            )}
        </Fragment>
       
    )
}

export default FlowSection