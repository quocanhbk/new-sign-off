import React from 'react'
import styled from "styled-components";
import {BsInfoCircle, BsX} from 'react-icons/bs'
import pt from 'prop-types'

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
    color: ${props => props.theme.color.fill[props.color]};
    background: ${props => props.theme.color.background.primary};
    & svg {
        margin-bottom: 0.5rem;
    }
    & .headline {
        font-size: 1.2rem;
        font-weight: 600;
    }
    & .sub {
        color: ${props => props.theme.color.text.secondary};
        font-size: 0.8rem;
    }
`
const types = [
    {id: "NOT_FOUND", text: "Data not found", sub: "Try again later", Icon: BsX, color: "danger"},
    {id: "PROCEDURE_NOT_SELECTED", text: "Select procedure to view", sub: "No procedure is selected", Icon: BsInfoCircle, color: "secondary"}
]


const Placeholder = ({type}) => {
    const myType = types.find(_ => _.id === type)
    return (
        <Container color={myType.color}>
            <myType.Icon size="3rem" />
            <p className="headline">{myType.text}</p>
            <p className="sub">{myType.sub}</p>
        </Container>
    )
}

Placeholder.propTypes = {
    type: pt.oneOf(["NOT_FOUND", "PROCEDURE_NOT_SELECTED"])
}

export default Placeholder