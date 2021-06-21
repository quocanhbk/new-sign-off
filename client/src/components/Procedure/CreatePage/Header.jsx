/* eslint-disable react/prop-types */
import { navigate } from '@reach/router';
import React, {  } from 'react'
import styled from 'styled-components'
import Button from 'components/Button'
import { BsChevronLeft } from 'react-icons/bs';
import { getFader } from 'utils/color';

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
				<Button color="success" padding="0.2rem 1rem" onClick={onSubmit}>Submit</Button>
			</ButtonContainer>
		
		</StyleTitle>
    )
}

export default Header