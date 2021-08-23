import { useEffect } from "react"
import styled, { css } from "styled-components"
import { getFader } from "utils/color"
import Dashboard from "./Dashboard"
import { useStoreActions } from "store"
const StyleContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 2rem;
    /* gap: 2rem; */

    // flex-gap work around, fuck this
    & > * + * {
        margin-left: 2rem;
    }
`
const Col = styled.div`
    flex: 1;

    ${props =>
        props.right &&
        css`
            background: ${props =>
                    "linear-gradient(to right," +
                    getFader(props.theme.color.background.primary, 1) +
                    "," +
                    getFader(props.theme.color.background.primary, 0.8) +
                    "," +
                    getFader(props.theme.color.background.primary, 1) +
                    ")"},
                url("/main.png");
            background-size: contain;
        `}
`

const Home = () => {
    const setPath = useStoreActions(action => action.setPath)
    useEffect(() => {
        setPath("/")
    }, [setPath])
    return (
        <StyleContainer>
            <Col right>
                <Dashboard />
            </Col>
        </StyleContainer>
    )
}

export default Home
