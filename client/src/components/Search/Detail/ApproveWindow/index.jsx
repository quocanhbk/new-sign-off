/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react"
import styled from "styled-components"
import { BsChevronUp, BsChevronDown } from "react-icons/bs"
import { getFader } from "utils/color"
import ApprovalOpinionCard from "./ApprovalOpinionCard"
import Button from "components/Base/Button"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css" // optional
import "tippy.js/animations/perspective-subtle.css"

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
    & .approve-button {
        flex: 1;
        border-radius: 0.2rem;
        width: 100%;
    }
    & .opinion-button {
        flex: 2;
        border-radius: 0.2rem;
        width: 100%;
    }
    & .reject-button {
        flex: 1;
        border-radius: 0.2rem;
        width: 100%;
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
                        <Tippy
                            content="Approve and close this request"
                            placement="bottom"
                            delay={250}
                            animation="perspective-subtle"
                        >
                            <Button
                                padding="0.5rem"
                                className="approve-button approve"
                                color="success"
                                onClick={() => approve("APPROVE")}
                            >
                                Approve
                            </Button>
                        </Tippy>
                        <Tippy
                            content="Approve with an opinion for submitter to revise later"
                            placement="bottom"
                            delay={250}
                            animation="perspective-subtle"
                        >
                            <Button
                                padding="0.5rem"
                                className="opinion-button"
                                color="warning"
                                onClick={() => approve("APPROVE_WITH_OPINION")}
                            >
                                Approve With New Opinion
                            </Button>
                        </Tippy>
                        <Tippy
                            content="Reject and close this request"
                            placement="bottom"
                            delay={250}
                            animation="perspective-subtle"
                        >
                            <Button
                                padding="0.5rem"
                                className="reject-button"
                                color="danger"
                                onClick={() => approve("REJECT")}
                            >
                                Reject
                            </Button>
                        </Tippy>
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
