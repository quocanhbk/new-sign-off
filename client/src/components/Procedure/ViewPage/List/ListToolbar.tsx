import styled from "styled-components"
import Searchbar from "components/Searchbar"

const StyleToolbar = styled.div`
    display: flex;
    & > * + * {
        margin-left: 0.5rem;
    }
    align-items: center;
    padding: 1rem 0 0.5rem;
`

function ListToolbar({ search, setSearch }) {
    return (
        <StyleToolbar>
            <Searchbar search={search} setSearch={setSearch} />
        </StyleToolbar>
    )
}

export default ListToolbar
