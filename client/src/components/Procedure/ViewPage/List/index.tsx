import { useState } from "react"
import styled from "styled-components"
import Cardv2 from "./Cardv2"
import ListToolbar from "./ListToolbar"
import { getFader } from "utils/color"
import { navigate, useLocation } from "@reach/router"
import { BsFileEarmarkPlus } from "react-icons/bs"
import useProcedures from "./useProcedures"
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
const AddNewContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    justify-content: space-between;
`
const CardList = styled.div`
    width: 100%;
    flex: 1;
    padding-bottom: 0.5rem;
    overflow: auto;
    position: relative;

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

    display: flex;
    flex-direction: column;

    & > * + * {
        margin-top: 0.5rem;
    }
`

function List() {
    // const [procedures, setProcedures] = useState([])
    const [searchText, setSearchText] = useState("")
    const location = useLocation().pathname.split("/")
    const { data: users } = useQuery("users", () => getUsers())
    // const {render, setNotFound, setPercent} = useCustomLoader(true, <Placeholder type="NOT_FOUND"/>)
    const { data: procedures, render } = useProcedures()

    const handle = formId => {
        navigate("/procedure/view/" + formId)
    }

    return (
        <StyleListWrapper>
            <ListToolbar search={searchText} setSearch={setSearchText} />
            <AddNewContainer>
                <p>
                    Result:{" "}
                    {procedures &&
                        procedures.filter(procedure => procedure.title.toLowerCase().includes(searchText.toLowerCase()))
                            .length}
                </p>
                <button onClick={() => navigate("/procedure/create")}>
                    <BsFileEarmarkPlus size="1rem" />
                    <p>Add</p>
                </button>
            </AddNewContainer>
            <CardList>
                {render(
                    procedures && users ? (
                        <>
                            {procedures
                                .filter(procedure => procedure.title.toLowerCase().includes(searchText.toLowerCase()))
                                .map(procedure => (
                                    <Cardv2
                                        key={procedure.id}
                                        title={procedure.title}
                                        isActive={procedure.isActive}
                                        createdBy={users.find(u => u.id === procedure.createdBy)}
                                        onClick={() => handle(procedure.id)}
                                        active={procedure.id.toString() === location[location.length - 1]}
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
