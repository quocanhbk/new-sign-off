/* eslint-disable react/prop-types */
import React from "react";
import styled, {  } from "styled-components";
import { BsBellFill, BsCheck, BsEyeFill, BsFillCircleFill, BsPlayFill, BsThreeDots, BsX } from "react-icons/bs";
import {getFader} from 'utils/color'
import baseURL from "api/baseURL";
import Button from 'components/Button'
const Container = styled.td`
    padding: 0.5rem;
`
const TagWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    //border: 1px solid ${props => props.theme.color.border.primary};
    border-radius: 0.5rem;
    overflow: hidden;
    /* border: 1px solid ${props => 
        props.status === "Approved" ? props.theme.color.fill.success : 
        props.status === "Rejected" ? props.theme.color.fill.danger : 
        (props.status === "Pending" && props.isCurrent) ? props.theme.color.fill.warning : 
        props.status === "Pending" ? props.theme.color.fill.primary : 
        props.theme.color.border.primary
    }; */
    background: ${props => 
        getFader(
            props.status === "Approved" ? props.theme.color.fill.success : 
            props.status === "Rejected" ? props.theme.color.fill.danger : 
            (props.status === "Pending" && props.isCurrent) ? props.theme.color.fill.warning : 
            props.status === "Pending" ? props.theme.color.fill.primary : 
            props.theme.color.fill.secondary
        , 0.1)};
    
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
    height: ${props => props.last ? "50%" : "150%"};
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
const Status = styled.div`
    align-self: stretch;
    padding: 0.5rem;
    display: grid;
    place-items: center;
    color: ${props => props.theme.color.background.primary};
    background: ${props => 
        props.status === "Approved" ? props.theme.color.fill.success : 
        props.status === "Rejected" ? props.theme.color.fill.danger : 
        (props.status === "Pending" && props.isCurrent) ? props.theme.color.fill.warning : 
        props.status === "Pending" ? props.theme.color.fill.primary : 
        props.theme.color.fill.secondary
    };
`
const Body = styled.div`
    display: flex;
    padding: 0.5rem 1rem 0.5rem 0.5rem;
    gap: 1rem;
    align-items: center;
`

// decision : "Approved" | "Rejected" | "Pending"
const FlowTag = ({data, last, isCurrent}) => {
    const notify = (userId) => {
        alert(userId)
    }
    return (
        <tr>
            <Side>
                <CheckContainer>
                    <CheckWrapper>
                        <BsFillCircleFill size="12px"/>
                    </CheckWrapper>
                </CheckContainer>
                <Vertical last={last}/>
            </Side>
            <Container>
                <TagWrapper status={data.decision} isCurrent={isCurrent}>
                    <Status status={data.decision} isCurrent={isCurrent}>
                        {
                            data.decision === "Approved" ? <BsCheck/> : 
                            data.decision === "Rejected" ? <BsX/> : 
                            (data.decision === "Pending" && isCurrent) ? <BsPlayFill/> : 
                            data.decision === "Pending" ? <BsThreeDots/> : 
                            <BsEyeFill/>
                        }
                    </Status>
                    <Body>
                        <img src={`${baseURL}/api/v1/avatar/${data.email}`}/>
                        <Text>
                            <p className="flow-tag-name">{data.fullname}</p>
                            <p className="flow-tag-email">{data.email}</p>
                        </Text>
                        {data.decision === "Pending" && isCurrent && 
                            <Button 
                                variant="outline" 
                                normalBorder 
                                padding="0.2rem" 
                                radius="99px" 
                                color="warning"
                                onClick={() => notify(data.userId)}
                            >
                                <BsBellFill/>
                            </Button>
                        }
                    </Body>
                </TagWrapper> 
            </Container>
        </tr>
    )
}

export default FlowTag