/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import styled from "styled-components";
import DisplayContent from "./DisplayContent";
import List from "./List";

const Container = styled.div`
    display: flex;
    height: 100%;
`

const ViewPage = () => {
    
    const [selectedForm, setSelectedForm] = useState()

    return (
        <Container>
            <List setSelectedForm={setSelectedForm}/>
            <DisplayContent form={selectedForm}/>
        </Container>
    )
}

export default ViewPage