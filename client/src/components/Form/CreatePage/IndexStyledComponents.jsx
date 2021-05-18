import styled from 'styled-components'
import { getFader } from '../../../utils/color'

export const Container = styled.div`
    display:flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`
export const Wrapper = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
    overflow-y: auto;
`
export const StyleTitle = styled.h3`
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
    overflow: auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    & div {
        display: grid;
        place-items: center;
        padding: 0.5rem;
        border-radius: 99px;
        cursor: pointer;
        &:hover {
            background: ${props => getFader(props.theme.color.border.primary, 0.5)};
        }
    }
    & {  
        padding: 1rem;
    }
`
export const Toolbar = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border-right: 1px solid ${props => props.theme.color.border.primary};
    & h3 {
        font-weight: 500;
        font-size: 1rem;
    }
`
export const ToolbarContainer = styled.div`
    padding: 0.5rem;
    border: 1px solid ${props => props.theme.color.border.primary};
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`
export const ToolbarElement = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`
export const NoField = styled.div`
    font-style: italic;
    color: ${props => props.theme.color.text.secondary};
`
export const FormNameInput = styled.input`
    border: 1px solid ${props => props.theme.color.border.primary};
    background: transparent;
    padding: 0.5rem;
    color: ${props => props.theme.color.text.primary};
    outline: none;
    border-radius: 0.5rem;
    font-size: 1rem;
`
