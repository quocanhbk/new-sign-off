/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useRef, useState } from "react"
import styled from "styled-components"
import { BsChevronUp, BsChevronDown } from "react-icons/bs"
import { getFader } from "utils/color"
import ApprovalOpinionCard from "./ApprovalOpinionCard"
import Button from "components/Base/Button"
import { usePopper } from "react-popper"
import useTooltip from "./useTooltip"
const Container = styled.div`
    position: relative;
    width: calc(100% - 2rem);
    transform: translateX(1rem);
    z-index: 33;
    max-height: ${(props) => (props.expand ? "25rem" : "3rem")};
    transition: max-height 0.25s ease-in-out;
`
const Block = styled.div`
    height: 25rem;
    background: ${(props) => props.theme.color.background.primary};
    border: 1px solid ${(props) => props.theme.color.border.primary};
    box-shadow: ${(props) => props.theme.shadow};
`
const Header = styled.div`
    display: flex;
    height: 3rem;
    justify-content: space-between;
    padding: 0 1rem;
    align-items: center;
    box-shadow: ${(props) => props.theme.shadow};
    background: ${(props) => props.theme.color.fill.secondary};
    background: ${(props) =>
        "linear-gradient(to right, " +
        props.theme.color.fill.secondary +
        ", " +
        getFader(props.theme.color.fill.secondary, 0.8) +
        ")"};
    color: ${(props) => props.theme.color.background.primary};
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
    & > * + * {
        margin-left: 0.5rem;
    }
    padding-bottom: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.color.border.primary};
`
const ApproveButtonWrapper = styled.div`
    flex: 1;
    & .approve-button {
        //flex: 1;
        border-radius: 0.2rem;
        width: 100%;
    }
`
const OpinionButtonWrapper = styled.div`
    flex: 2;
    & .opinion-button {
        //flex: 1;
        border-radius: 0.2rem;
        width: 100%;
    }
`
const RejectButtonWrapper = styled.div`
    flex: 1;
    & .reject-button {
        //flex: 1;
        border-radius: 0.2rem;
        width: 100%;
    }
`
const ApprovePopper = styled.div`
    padding: 0.2rem 0.4rem;
    font-size: 0.9rem;
    background: ${(props) => getFader(props.theme.color.border.primary, 0.8)};
    color: ${(props) => props.theme.color.text.secondary};
    border: 1px solid ${(props) => props.theme.color.border.primary};
    border-radius: 0.25rem;
    visibility: hidden;
    pointer-events: none;

    ${ApproveButtonWrapper}:hover & {
        visibility: visible;
        pointer-events: all;
    }
`
const OpinionPopper = styled.div`
    padding: 0.2rem 0.4rem;
    font-size: 0.9rem;
    background: ${(props) => getFader(props.theme.color.border.primary, 0.8)};
    color: ${(props) => props.theme.color.text.secondary};
    border: 1px solid ${(props) => props.theme.color.border.primary};
    border-radius: 0.25rem;
    visibility: hidden;
    pointer-events: none;

    ${OpinionButtonWrapper}:hover & {
        visibility: visible;
        pointer-events: all;
    }
`
const RejectPopper = styled.div`
    padding: 0.2rem 0.4rem;
    font-size: 0.9rem;
    background: ${(props) => getFader(props.theme.color.border.primary, 0.8)};
    color: ${(props) => props.theme.color.text.secondary};
    border: 1px solid ${(props) => props.theme.color.border.primary};
    border-radius: 0.25rem;
    visibility: hidden;
    pointer-events: none;

    ${RejectButtonWrapper}:hover & {
        visibility: visible;
        pointer-events: all;
    }
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
        background: ${(props) =>
            getFader(props.theme.color.fill.secondary, 0.5)};
        border-radius: 99px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: ${(props) => props.theme.color.fill.secondary};
    }
`

const ApproveWindow = ({ opinions, setConfirmPopup, setOpinionId }) => {
    const [expand, setExpand] = useState(false)
    const approve = (decision) => {
        setConfirmPopup(decision)
    }
    const {
        popperRef: approvePopper,
        elementRef: approveElement,
        styles: approveStyles,
        attributes: approveAttrs,
    } = useTooltip()
    const {
        popperRef: opinionPopper,
        elementRef: opinionElement,
        styles: opinionStyles,
        attributes: opinionAttrs,
    } = useTooltip()
    const {
        popperRef: rejectPopper,
        elementRef: rejectElement,
        styles: rejectStyles,
        attributes: rejectAttrs,
    } = useTooltip()

    return (
        <Container expand={expand}>
            <Block className="block">
                <Header onClick={() => setExpand(!expand)}>
                    <p>Approve Window</p>
                    {expand ? (
                        <BsChevronDown size="1.2rem" />
                    ) : (
                        <BsChevronUp size="1.2rem" />
                    )}
                </Header>
                <Body className="body">
                    <ApproveBlock>
                        <ApproveButtonWrapper ref={approveElement}>
                            <Button
                                padding="0.5rem"
                                className="approve-button approve"
                                color="success"
                                onClick={() => approve("APPROVE")}
                            >
                                Approve
                            </Button>
                            <ApprovePopper
                                ref={approvePopper}
                                style={approveStyles.popper}
                                {...approveAttrs.popper}
                            >
                                Approve and close this request
                            </ApprovePopper>
                        </ApproveButtonWrapper>
                        <OpinionButtonWrapper ref={opinionElement}>
                            <Button
                                padding="0.5rem"
                                className="opinion-button"
                                color="warning"
                                onClick={() => approve("APPROVE_WITH_OPINION")}
                            >
                                Approve With New Opinion
                            </Button>
                            <OpinionPopper
                                ref={opinionPopper}
                                style={opinionStyles.popper}
                                {...opinionAttrs.popper}
                            >
                                {/* Giving a new opinion and revising this approval request */}
                                Approve with an opinion for submitter to revise
                                later
                            </OpinionPopper>
                        </OpinionButtonWrapper>
                        <RejectButtonWrapper ref={rejectElement}>
                            <Button
                                padding="0.5rem"
                                className="reject-button"
                                color="danger"
                                onClick={() => approve("REJECT")}
                            >
                                Reject
                            </Button>
                            <RejectPopper
                                ref={rejectPopper}
                                style={rejectStyles.popper}
                                {...rejectAttrs.popper}
                            >
                                Reject and close this request
                            </RejectPopper>
                        </RejectButtonWrapper>
                    </ApproveBlock>
                    <OpinionContainer>
                        {opinions.map((o) => (
                            <ApprovalOpinionCard
                                key={o.id}
                                opinion={o}
                                onApproveClick={(id) => {
                                    setOpinionId(id)
                                    setConfirmPopup(
                                        "APPROVE_WITH_EXISTING_OPINION"
                                    )
                                }}
                            />
                        ))}
                    </OpinionContainer>
                </Body>
            </Block>
        </Container>
    )
}

export default ApproveWindow
