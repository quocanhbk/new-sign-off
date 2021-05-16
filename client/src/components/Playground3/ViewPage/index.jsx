/* eslint-disable react/react-in-jsx-scope */
import styled from "styled-components";
import DisplayContent from "./DisplayContent";
import List from "./List";

const Container = styled.div`
    display: flex;
    height: 100%;
`

const ViewPage = () => {
    return (
        <Container>
            <List/>
            <DisplayContent/>
        </Container>
    )
}

export default ViewPage