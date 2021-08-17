import styled from "styled-components"
import { format } from "date-fns"
import { BsChevronLeft } from "react-icons/bs"
import { navigate } from "@reach/router"
import useMediaQuery from "hooks/useMediaQuery"
import { admins } from "constant"
import { useMsal } from "@azure/msal-react"
import { StatusTag } from "components/Base/Tags"
import { useQuery } from "react-query"
import { getUsers, IUser } from "api"
import { useState } from "react"
const ContentInfo = styled.div`
    display: flex;
    background: ${props => props.theme.color.background.primary};
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
    padding-left: 0.5rem;
    & .content-modified {
        font-size: 0.8rem;
        font-style: italic;
        color: ${props => props.theme.color.text.secondary};
    }

    & .content-title {
        font-size: 1.2rem;
        font-weight: 600;
    }
`
const Left = styled.div`
    display: flex;
    flex: 1;
    padding: 1rem 1rem 1rem 0.5rem;
    & .search-header-title {
        flex: 1;
        display: flex;
        flex-direction: column;
        & > * + * {
            margin-top: 0.5rem;
        }
    }
    & > * + * {
        margin-left: 0.5rem;
    }
`
const Right = styled.div`
    display: flex;
    align-items: center;

    & .export-link {
        text-decoration: none;
        color: inherit;
    }
`
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    & > * + * {
        margin-left: 0.5rem;
    }
`
const Header = ({ id, title, status, type, updatedAt, mode, setCancelPopup, onDeleteDraft, createdBy, request }) => {
    let device = useMediaQuery()
    const [curUser, setCurUser] = useState<IUser>()
    const { data: users } = useQuery("users", () => getUsers(), {
        onSuccess: () => setCurUser(users.find(u => u.email === accounts[0].username)),
    })
    const { accounts } = useMsal()

    return (
        <ContentInfo>
            {device === "PHONE" && (
                <button onClick={() => navigate(`/${mode}`)}>
                    <BsChevronLeft />
                </button>
            )}
            <Left>
                <div className="search-header-title">
                    <p className="content-modified">{format(updatedAt, "'Last updated at ' HH:mm dd/MM/yyyy")}</p>
                    <p className="content-title">{title}</p>
                    <TitleContainer>
                        <StatusTag readOnly status={status} />
                        <button>{type}</button>
                    </TitleContainer>
                </div>
                {device === "PC" &&
                    mode === "search" &&
                    (status === "Draft" && accounts[0].username === createdBy ? (
                        <>
                            <Right>
                                <button onClick={() => navigate("/draft/" + id)}>Edit</button>
                            </Right>
                            <Right>
                                <button onClick={onDeleteDraft}>Delete</button>
                            </Right>
                        </>
                    ) : status === "Revising" && accounts[0].username === createdBy ? (
                        <Right>
                            <button onClick={() => navigate("/revise/" + id)}>Edit</button>
                        </Right>
                    ) : null)}
                {device === "PC" &&
                    status === "Pending" &&
                    admins.includes((curUser?.id as string) || "") &&
                    mode === "search" && (
                        <Right>
                            <button onClick={() => setCancelPopup(true)}>Cancel</button>
                        </Right>
                    )}
                {/* {device === "PC" && status === "Approved" && (
                    <Right>
                        <Button
                            color="success"
                            onClick={() => downloadRequest(request)}
                        >
                            Export
                        </Button>
                    </Right>
                )} */}
                {device === "PC" && status === "Approved" && (
                    <Right>
                        <button>
                            <a className="export-link" href={`/export/${id}`} target="_blank" rel="noreferrer">
                                Export
                            </a>
                        </button>
                    </Right>
                )}
            </Left>
        </ContentInfo>
    )
}

export default Header
