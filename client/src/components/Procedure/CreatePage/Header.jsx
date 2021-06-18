/* eslint-disable react/prop-types */
import React, {  } from 'react'
import styled from 'styled-components'
import Button from '../../Button'

const StyleTitle = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid ${props => props.theme.color.border.primary};
	padding: 0 1rem;
	& h3 {
		color: ${(props) => props.theme.color.fill.primary};
		padding: 1rem 0;
		font-weight: 500;
	}
`;
const ButtonContainer = styled.div``
const Header = ({onSubmit}) => {
    return (
		<StyleTitle>
			<h3>CREATE NEW PROCEDURE</h3>
			<ButtonContainer>
				<Button color="success" padding="0.2rem 1rem" onClick={onSubmit}>Submit</Button>
			</ButtonContainer>
		
		</StyleTitle>
    )
}

export default Header