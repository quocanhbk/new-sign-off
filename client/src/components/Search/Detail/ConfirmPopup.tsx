/* eslint-disable react/prop-types */
import { useEffect } from "react"
import styled from "styled-components"
import FormControl from "components/Base/FormControl"
// import useFocus from 'hooks/useFocus'
const Container = styled.div`
    background: ${props => props.theme.color.background.primary};
    overflow: hidden;
    border-radius: 0.2rem;
    box-shadow: ${props => props.theme.shadow};
`
const Header = styled.header`
    background: ${props =>
        props.theme.color.fill[
            props.decision === "APPROVE" ? "success" : props.decision === "REJECT" ? "danger" : "warning"
        ]};
    padding: 0.8rem 1rem;
    color: ${props => props.theme.color.background.primary};
    font-weight: 500;
`
const Body = styled.div`
    padding: 1rem;
`
const TextArea = styled.textarea`
    background: transparent;
    resize: none;
    border: 1px solid ${props => props.theme.color.border.primary};
    font-family: inherit;
    color: inherit;
    font-size: inherit;
    outline: none;
    padding: 0.5rem;
    border-radius: 0.2rem;

    &:focus {
        border: 1px solid ${props => props.theme.color.fill.primary};
    }
`
const BtnContainer = styled.div`
    display: flex;
    justify-content: space-between;
    & > * + * {
        margin-left: 2rem;
    }
    & .confirm-button {
        flex: 1;
    }
`
const ConfirmPopup = ({ onCancelClick, onConfirmClick, decision, comment, setComment }) => {
    // const inputRef = useFocus()
    const genHeadline = () => {
        return decision === "REJECT" ? "Are you sure to reject this request ?" : "Are you sure to approve this request?"
    }
    const genFormTitle = () => {
        return decision === "APPROVE_WITH_OPINION" ? "Opinion" : "Comment"
    }

    useEffect(() => {
        setComment(
            decision === "REJECT"
                ? "I rejected because"
                : decision === "APPROVE_WITH_OPINION"
                ? "I have another opinion, which is"
                : "I agree"
        )
    }, [])

    return (
        <Container>
            {decision && <Header decision={decision}>{genHeadline()}</Header>}
            <Body>
                <FormControl label={genFormTitle()}>
                    <TextArea
                        className="approve-comment"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        spellCheck={"false"}
                    />
                </FormControl>
                <BtnContainer>
                    <button onClick={onCancelClick}>Cancel</button>
                    <button onClick={onConfirmClick}>Confirm</button>
                </BtnContainer>
            </Body>
        </Container>
    )
}

export default ConfirmPopup
