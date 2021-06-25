/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {Fragment} from 'react'
import { BsCheck, BsFillCircleFill } from 'react-icons/bs'
import styled, { css } from 'styled-components'
import FlowTag from './FlowTag'

const Headline = styled.td`
    padding: 0.5rem;
    font-weight: 500;
    color: ${props => props.theme.color.fill.secondary};
    font-size: 1.12rem;
    //border: 1px solid black;
`
const Row = styled.tr`
    border-top: 2px solid ${props => props.theme.color.border.primary};
`
const CheckWrapper = styled.div`
    border: 2px solid ${props => props.theme.color.fill.secondary};
    color: ${props => props.theme.color.fill.secondary};
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
    top: ${props => props.type === "submitter" ||  props.type === "observator" ? "50%" : "-2px"};
    width: 2px;
    height: 150%;
    transform: translate(-50%, 0%);
    background: ${props => props.theme.color.fill.secondary};
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
const FlowSection = ({headline, data, type, currentApprover}) => {
    return (
        <Fragment>
            {type === "observator" && 
                <>
                <tr><td style={{height: "1rem"}}></td></tr>
                <Row><td colSpan={2} style={{height: "1rem"}}></td></Row>
                </>
            }
            <tr>
                <Side>
                    <CheckContainer>
                        <CheckWrapper>
                            <BsFillCircleFill size="12px"/>
                        </CheckWrapper>
                    </CheckContainer>
                    <Vertical type={type}/>
                </Side>
                <Headline>{headline}</Headline>
            </tr>
            {data.map((d,idx) => 
                <FlowTag 
                    key={d.email} 
                    data={d}
                    isCurrent={(type === "approver" || type === "advisor") && currentApprover.includes(d.userId)}
                    last={(type === 'approver' || type === "observator") && idx === (data.length -1)}
                /> 
            )}
        </Fragment>
       
    )
}

export default FlowSection