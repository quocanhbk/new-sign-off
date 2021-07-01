/* eslint-disable react/prop-types */
import { navigate } from '@reach/router';
import React, {  } from 'react'
import styled from 'styled-components'
import { BsChevronLeft } from 'react-icons/bs';
import Button from 'components/Base/Button'

const StyleTitle = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 1px solid ${props => props.theme.color.border.primary};
	gap: 0.5rem;
	padding: 0 1rem;
	& h3 {
		color: ${(props) => props.theme.color.fill.primary};
		padding: 1rem 0;
		font-weight: 500;
	}
`;
const ButtonContainer = styled.div`
	margin-left: auto;
`
const Header = ({onSubmit, id}) => {
    return (
		<StyleTitle>
			<div onClick={() => navigate('/procedure')}>
                <BsChevronLeft/>
            </div>
            <h3>{id ? "EDIT PROCEDURE" : "CREATE PROCEDURE"}</h3>
			<ButtonContainer>
				<Button type="fill" color="success" padding="0.4rem 1rem" onClick={onSubmit}>Submit</Button>
			</ButtonContainer>
		
		</StyleTitle>
    )
}

export default Header