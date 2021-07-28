/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"
import { BsCheckCircle } from "react-icons/bs"
import styled from "styled-components"
import { getFader } from "utils/color"
import Avatar from "components/Avatar"
import { useStoreState } from "easy-peasy"
import { getAvatar } from "api/user"
const Main = styled.div`
    display: flex;
    padding: 1rem 0;
    & > * + * {
        margin-left: 0.5rem;
    }
    border-bottom: 1px solid ${(props) => props.theme.color.border.primary};
`
const DivAvatar = styled.div`
    padding: 0;
`
const DivInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    & > * + * {
        margin-top: 0.2rem;
    }
    & .create-event {
        display: flex;
        align-items: center;
        & > * + * {
            margin-left: 1rem;
        }

        & .create-by-event {
            font-weight: 600;
            color: ${(props) => props.theme.color.fill.secondary};
        }
        & .create-date-event {
            font-size: 0.8rem;
            color: ${(props) => props.theme.color.text.secondary};
            font-style: italic;
        }
    }

    & .title-event {
        font-size: 1rem;
        line-height: 1.2;
    }
`
const Sub = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 0.4rem;
    & > * + * {
        margin-top: 0.4rem;
    }
`
const Line = styled.div`
    display: flex;
    & > * + * {
        margin-left: 0.5rem;
    }
    align-items: center;
    font-size: 0.9rem;
    font-style: italic;
    color: ${(props) => props.theme.color.text.secondary};

    & .name {
        font-weight: 500;
    }

    & .icon {
        color: ${(props) => props.theme.color.fill.success};
    }
`
const Button = styled.button`
    border: none;
    color: ${(props) => props.theme.color.fill.warning};
    background: transparent;
    align-self: center;
    padding: 0.5rem;
    font-weight: 500;
    width: 8rem;
    cursor: pointer;
    //border: 1px solid ${(props) => props.theme.color.border.primary};
    &:hover {
        background: ${(props) =>
            getFader(props.theme.color.border.primary, 0.5)};
    }
    &:active {
        background: ${(props) => getFader(props.theme.color.border.primary, 1)};
    }
`

function ApprovalOpinionCard({ opinion, onApproveClick }) {
    let users = useStoreState((s) => s.users)
    let curUser = users.find((_) => _.id === opinion.createdBy)
    return (
        <Main>
            <DivAvatar>
                <Avatar
                    width="2rem"
                    height="2rem"
                    src={getAvatar(curUser.email)}
                />
            </DivAvatar>
            <DivInfo>
                <span className="create-event">
                    <p className="create-by-event">{curUser.name}</p>
                </span>
                <p className="title-event">{opinion.comment}</p>
                <Sub>
                    {opinion.inAgreement.map((userId) => (
                        <Line key={userId}>
                            <BsCheckCircle className="icon" />
                            <Avatar
                                width="1.2rem"
                                height="1.2rem"
                                src={getAvatar(
                                    users.find((u) => u.id === userId).email,
                                    "48x48"
                                )}
                            />
                            <p>
                                <span className="name">
                                    {users.find((u) => u.id === userId).name}
                                </span>{" "}
                                approved this opinion
                            </p>
                        </Line>
                    ))}
                </Sub>
            </DivInfo>
            {!opinion.isFinal && (
                <Button onClick={() => onApproveClick(opinion.id)}>
                    Approve With This Opinion
                </Button>
            )}
        </Main>
    )
}

export default ApprovalOpinionCard
