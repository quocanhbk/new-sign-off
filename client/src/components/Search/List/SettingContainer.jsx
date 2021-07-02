/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components'

const Container = styled.div`
    & .setting-header {
        font-weight: 500;
        border-bottom: 1px solid ${props => props.theme.color.border.primary};
        padding-bottom: 0.2rem;
        margin-bottom: 0.4rem;
    }
    & .setting-body {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

    }
`

const SettingContainer = ({headline, children}) => {
    return (
        <Container>
            <h4 className="setting-header">{headline}</h4>
            <div className="setting-body">
                {children}
            </div>
        </Container>
    )
}

export default SettingContainer