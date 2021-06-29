/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import Button from 'components/Button'
const StyleButton = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
	/* & button {
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
	} */
`;
const StyleTitle = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid ${props => props.theme.color.border.primary};
	padding: 0 1rem;
`;
const Title = styled.h3`
	color: ${(props) => props.theme.color.fill.primary};
	padding: 1rem 0;
	font-weight: 500;
`
const Header = ({openSubmit, openDraft}) => {
    return (
		<StyleTitle>
			<Title>CREATE A NEW APPROVAL DOCUMENT</Title>
			<StyleButton>
				<Button onClick={() => {}} className="btn-stored">Load from stored</Button>
				<Button color="secondary" onClick={openDraft} normalBorder className="btn-draft">Save Draft</Button>
				<Button color="success" onClick={openSubmit} className="btn-preview">Submit</Button>
			</StyleButton>
		</StyleTitle>
    )
}

export default Header