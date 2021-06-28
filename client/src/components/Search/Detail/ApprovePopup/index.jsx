/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import styled, { css } from "styled-components";
import {BsChevronUp, BsChevronDown} from "react-icons/bs"
import { getFader } from "utils/color";
import useClickOutside from "hooks/useClickOutside";
import ApprovalOpinionCard from './ApprovalOpinionCard'
import Button from 'components/Button'
import {approveRequest} from 'api/request'
const Container = styled.div`
    position: relative;
    width: calc(100% - 2rem);
    transform: translateX(1rem);
    z-index: 99;
    max-height: ${props => props.expand ? "30rem" : "3rem"};
    transition: max-height 0.25s ease-in-out;
`
const Block = styled.div`
    height: 30rem;
    background: ${props => props.theme.color.background.primary};
    border: 1px solid ${props => props.theme.color.border.primary};
    box-shadow: ${props => props.theme.shadow};
`
const Header = styled.div`
    display: flex;
    height: 3rem;
    justify-content: space-between;
    padding: 0 1rem;
    align-items: center;
    box-shadow: ${props => props.theme.shadow};
    background: ${props => props.theme.color.fill.secondary};
    background: ${props => "linear-gradient(to right, " + props.theme.color.fill.secondary + ", " + getFader(props.theme.color.fill.secondary, 0.8) + ")"};
    color: ${props => props.theme.color.background.primary};
    border-radius: 0.2rem 0.2rem 0 0;
    & p {
        font-weight: 500;
        font-size: 1.1rem;
    }
`
const Body = styled.div`
    padding: 1rem 1rem 0 1rem;
    display: flex;
    flex-direction: column;
    height: 27rem;
`
const ApproveBlock = styled.div`
    display: flex;
    gap: 0.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
`
const Opinion = styled.textarea`
    flex: 1;
    resize: none;
    background: transparent;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    outline: none;
    border: 1px solid ${props => props.theme.color.border.primary};
    color: ${props => props.theme.color.text.primary};
    border-radius: 0.2rem;
    padding: 0.5rem;
    font-size: 1rem;
    &:focus {
        border: 1px solid ${props => props.theme.color.fill.primary};
    }
    ${props => props.error && css`
        ::placeholder {
            color: ${props => props.theme.color.fill.danger};
        }
    `}
`
const ButtonGroup = styled.div`
    display: flex;
    gap: 0.5rem;
`

const OpinionContainer = styled.div`
    overflow: overlay;
    ::-webkit-scrollbar {
        width: 0.5rem;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: ${props => getFader(props.theme.color.fill.secondary, 0.5)};
        border-radius: 99px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: ${props => props.theme.color.fill.secondary};
    }
`
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`
const ApprovePopup = ({id}) => {
    const [expand, setExpand] = useState(false)
    const [comment, setComment] = useState("Đồng ý")
    const [error, setError] = useState(false)
    let ref = useClickOutside(() => setExpand(false))
    const approve = (decision, type) => {
        if (comment === "") {
            setError(true)
            return
        }
        else {
            // TODO
            console.log(decision, type);
            //approveRequest(id, {decision, comment})
        }
    }
    const handleInputChange = (e) => {
        if (error) setError(false)
        setComment(e.target.value)
    }
    return (
        <Container expand={expand} ref={ref}>
            <Block className="block">
                <Header onClick={() => setExpand(!expand)}>
                    <p>Approve</p>
                    {expand ? <BsChevronDown size="1.2rem"/> : <BsChevronUp size="1.2rem"/>}
                </Header>
                <Body className="body">
                    <ApproveBlock>
                        <Opinion 
                            error={error}
                            placeholder="Write your approval opinion..."
                            spellCheck="false"
                            value={comment}
                            onChange={handleInputChange}
                        />
                        <ButtonGroup>
                            <ButtonContainer>
                                <Button color="success" onClick={() => approve("Approved", "no-opinion")}>Approve</Button>
                                <Button color="warning" onClick={() => approve("Approved", "with-opinion")}>Approve With New Opinion</Button>
                            </ButtonContainer>
                            <Button color="danger" onClick={() => approve("Rejected", "no-opinion")}>Reject</Button>
                        </ButtonGroup>
                    </ApproveBlock>
                    <OpinionContainer>
                        <ApprovalOpinionCard createdBy="La Quoc Anh" createdDate="02/01/2020"/>
                        <ApprovalOpinionCard createdBy="La Quoc Anh" createdDate="02/01/2020"/>
                    </OpinionContainer>
                </Body>
            </Block>
        </Container>
    )
}

export default ApprovePopup