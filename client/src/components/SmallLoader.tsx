import styled from "styled-components"

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    & > * + * {
        margin-top: 0.5rem;
    }
    z-index: 255;
    background: ${props => props.theme.color.background.primary};
`

const ProgressContainer = styled.div`
    height: 0.5rem;
    width: 50%;
    background: ${props => props.theme.color.border.primary};
    border-radius: 99px;
    position: relative;
    overflow: hidden;
`
const ProgressBar = styled.div`
    position: absolute;
    height: 100%;
    width: ${props => props.percent + "%"};
    background: ${props => props.theme.color.fill.primary};
    border-radius: 99px;
    transition: all 0.25s ease-in-out;
`
const SmallLoader = ({ percent }) => {
    return (
        <Container>
            <ProgressContainer>
                <ProgressBar percent={percent} />
            </ProgressContainer>
        </Container>
    )
}

export default SmallLoader
