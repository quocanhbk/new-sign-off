import styled from "styled-components"
import Card from "./Card"
import ListToolbar from "./ListToolbar"
import { getFader } from "utils/color"
import { navigate, useLocation } from "@reach/router"
import { BsFileEarmarkPlus } from "react-icons/bs"
import useForms from "./useForms"
import { useState } from "react"
import { useQuery } from "react-query"
import { getUsers } from "api"

const StyleListWrapper = styled.div`
    flex: 5;
    background-color: ${props => props.theme.color.background.primary};
    color: ${props => props.theme.color.text.primary};
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 0.5rem;
`

const CardList = styled.div`
    width: 100%;
    flex: 1;
    border-top: 1px solid ${props => props.theme.color.border.primary};
    padding-top: 0.5rem;
    overflow: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    & > * + * {
        margin-top: 0.5rem;
    }

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
const AddNewContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    justify-content: space-between;
`
function List() {
    const [searchText, setSearchText] = useState("")
    const location = useLocation().pathname.split("/")
    const { data: users } = useQuery("users", () => getUsers())
    let { data, render, isLoading } = useForms()

    const handle = formId => {
        navigate("/form/view/" + formId)
    }

    return (
        <StyleListWrapper>
            <ListToolbar search={searchText} setSearch={setSearchText} />
            <AddNewContainer>
                <p>
                    Result:{" "}
                    {isLoading || !data
                        ? "..."
                        : data.filter(form => form.name.toLowerCase().includes(searchText.toLowerCase())).length}
                </p>
                <button onClick={() => navigate("/form/create")}>
                    <BsFileEarmarkPlus size="1rem" />
                    <p>Add</p>
                </button>
            </AddNewContainer>
            <CardList>
                {render(
                    data && users ? (
                        <>
                            {data
                                .filter(form => form.name.toLowerCase().includes(searchText.toLowerCase()))
                                .map(form => (
                                    <Card
                                        key={form.id}
                                        name={form.name}
                                        onClick={() => handle(form.id)}
                                        active={form.id == location[location.length - 1]}
                                    />
                                ))}
                        </>
                    ) : null
                )}
            </CardList>
        </StyleListWrapper>
    )
}

export default List
