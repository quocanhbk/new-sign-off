import React from 'react';
import styled from 'styled-components'
import Accordion from '../Accordion';

const StyleWrapepr = styled.div`
    width: 100%;
    box-shadow: ${props =>props.theme.shadow};
    border: 1px solid ${props => props.theme.color.border.primary};
    background-color: ${props => props.theme.color.border.primary};
    z-index: 99;
    padding: 0.5rem 1rem;
`
const PopupContainer = styled.div`
    display:flex;
    flex-direction: row;
    gap : 1rem;
`
const Textarea  = styled.textarea`
    flex: 4;
    resize: none;
    height: 5rem;
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    color: ${props => props.theme.color.text.primary};
    background-color: ${props => props.theme.color.background.primary};

    &:focus{
        border: 1px solid ${props => props.theme.color.fill.primary};
        outline: none;
    }
`
const StyleButton = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5rem;

    & button{
        padding: 0.5rem;
        border: none;
        cursor: pointer;
    }
`
const ButtonApprove = styled.button`
    color: ${props => props.theme.color.background.primary};
    background-color: ${props => props.theme.color.fill.success};
`
const ButtonReject = styled.button`
    color: ${props => props.theme.color.background.primary};
    background-color: ${props => props.theme.color.fill.danger};
`
function Approve() {
    return (
        <StyleWrapepr>
            <Accordion title="Ý kiến phê duyệt">
                <PopupContainer>
                    <Textarea placeholder="Write comment here ..."/>
                    <StyleButton>
                        <ButtonApprove>Approve</ButtonApprove>
                        <ButtonReject>Reject</ButtonReject>
                    </StyleButton>
                </PopupContainer>
            </Accordion>
        </StyleWrapepr>
    );
}

export default Approve;