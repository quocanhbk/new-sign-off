/* eslint-disable react/react-in-jsx-scope */
import styled from "styled-components";
import NoFile from "./NoFile";
import DisplayContent from "./DisplayContent";
import List from "./List";
import {Router} from '@reach/router'
import { getFader } from "../../../utils/color";

const Container = styled.div`
    display: flex;
    height: 100%;
`
const StyleContentWrapper = styled.div`
    flex: 10;
    height: 100%;
    background-color: ${(props) => props.theme.color.background.secondary};
    color: ${(props) => props.theme.color.text.primary};
    border-left: 1px solid ${(props) => props.theme.color.border.primary};
    height: 100%;
    position: relative;
    overflow-y: overlay;
    overflow-x: hidden;
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
    & .form-router {
        height: 100%;
    }

`;
const ViewPage = () => {    
    return (
        <Container>
            <List/>
            <StyleContentWrapper>
                <Router className="form-router">
                    <DisplayContent path="/:id"/>
                    <NoFile default/>
                </Router>
            </StyleContentWrapper>
        </Container>
    )
}

export default ViewPage