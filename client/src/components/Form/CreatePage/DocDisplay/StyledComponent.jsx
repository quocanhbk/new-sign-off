import styled from 'styled-components'
import { getFader } from '../../../../utils/color'

export const MainContainer = styled.div`
    flex: 5;
    display: flex;
    flex-direction: column;
`
export const Bar = styled.div`
    display: flex;
    padding: 0.5rem;
    border-bottom: 1px solid ${props => props.theme.color.border.primary};

    & div {
        display: flex;
        gap: 0.5rem;
    }
`
export const DocWrapper = styled.div`
    flex: 1;
    position: relative;
    overflow: overlay;
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