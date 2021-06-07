import React, { useState } from 'react'
import ModalContainer from './ModalContainer'
import styled from 'styled-components'
const StyleButton = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  & button {
    padding: 0.2rem 1rem;
    cursor: pointer;
    border-radius: 0.2rem;
    font-size: 1rem;
    border: 1px solid transparent;
  }
  & .btn-stored {
      background: ${(props) => props.theme.color.fill.primary};
      color: ${(props) => props.theme.color.background.primary};
  }
  & .btn-draft {
    background: transparent;
    color: ${(props) => props.theme.color.fill.primary};
    border-color: ${props => props.theme.color.border.primary};
  }
  & .btn-preview {
    background: ${(props) => props.theme.color.fill.success};
    color: ${(props) => props.theme.color.background.primary};
  }
`;
const StyleTitle = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.color.border.primary};
  padding: 0 1rem;
  & h3 {
    color: ${(props) => props.theme.color.fill.primary};
    padding: 1rem 0;
  }
`;
const Header = () => {
    const [modal, setModal] = useState("")
    return (
        <>
            <ModalContainer modal={modal} setModal={setModal}/>
            <StyleTitle>
                <h3>CREATE A NEW APPROVAL DOCUMENT</h3>
                <StyleButton>
                    <button onClick={() => setModal("store")} className="btn-stored">Load from stored</button>
                    <button onClick={() => setModal("draft")} className="btn-draft">Save Draft</button>
                    <button className="btn-preview">Preview</button>
                </StyleButton>
            </StyleTitle>
        </>
    )
}

export default Header