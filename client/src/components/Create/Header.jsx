/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import Button from 'components/Base/Button'
const StyleButton = styled.div`
	display: flex;
	& > * + * {
		margin-left: 1rem;
	}
	align-items: center;
`

const StyleTitle = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid ${props => props.theme.color.border.primary};
	padding: 0 1rem;
`;
const Title = styled.h3`
	color: ${(props) => props.theme.color.fill.primary};
	padding: 1rem 0;
	font-weight: 500;
`
const Header = ({mode, openSubmit, openDraft}) => {
    return (
		<StyleTitle>
			<Title>
				{
					mode === "create" ? "CREATE A NEW APPROVAL DOCUMENT" : 
					mode === "draft" ? "EDIT DRAFT DOCUMENT" :
					"EDIT REVISING DOCUMENT"
				}
			</Title>
			<StyleButton>
				{mode !== "revise" && 
					<Button padding="0.5rem 1.5rem" color="success" onClick={openDraft} variant="outline">Save Draft</Button>
				}
				<Button padding="0.5rem 1.5rem" type="fill" color="success" onClick={openSubmit}>Submit</Button>
			</StyleButton>
		</StyleTitle>
    )
}

export default Header