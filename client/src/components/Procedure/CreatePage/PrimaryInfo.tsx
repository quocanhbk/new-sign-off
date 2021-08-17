import { useEffect, useRef } from "react"
import styled from "styled-components"
import FormControl from "components/Base/FormControl"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    & > * + * {
        margin-top: 0.5rem;
    }
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    & > * + * {
        margin-left: 1rem;
    }
`

const Input = styled.input`
    background-color: ${props => props.theme.color.background.secondary};
    color: ${props => props.theme.color.text.primary};
    border: 1px solid ${props => props.theme.color.border.primary};
    outline: none;
    border-radius: 4px;
    padding: 0.4em 0.8em;
    font-size: 1rem;
    font-weight: 400;

    &:focus {
        border: 1px solid ${props => props.theme.color.fill.primary};
    }
`

const PrimaryInfo = ({ title, description, set, error }) => {
    const inputRef = useRef<HTMLInputElement>()

    useEffect(() => {
        inputRef.current!.focus()
    }, [])

    return (
        <Container>
            <Row>
                <FormControl label="Procedure Name" error={error.title}>
                    <Input
                        ref={inputRef}
                        value={title}
                        onChange={e => set("title", e.target.value)}
                        placeholder="Input document title..."
                        spellCheck="false"
                    />
                </FormControl>
            </Row>
            <Row>
                <FormControl label="Procedure Description">
                    <Input
                        value={description}
                        onChange={e => set("description", e.target.value)}
                        placeholder="Input document title..."
                        spellCheck="false"
                    />
                </FormControl>
            </Row>
        </Container>
    )
}

export default PrimaryInfo
