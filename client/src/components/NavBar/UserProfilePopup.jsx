/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useMsal } from "@azure/msal-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {getAsyncAvatar} from 'api/user'
import Avatar from 'components/Avatar'
import { useStoreActions, useStoreState } from "easy-peasy";
import ThemeToggle from "./ThemeToggle";
import { BsPower } from "react-icons/bs";
const Container = styled.div`
    position: absolute;
    padding: 1rem;
    top: 0;
    right: 0;
    width: calc(100% - 2rem);
    transform: translate(-1rem, calc(-100% - 1rem));
    box-shadow: ${props => props.theme.shadow};
    border-radius: 0.5rem;
    border: 1px solid ${props => props.theme.color.border.primary};
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
const UserDisplayCardInfo = styled.div`
	flex: 1 1 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 1rem;
	gap: 0.1rem;
    & h3 {
		font-size: 1rem;
		color: ${props => props.theme.color.text.primary};
	}
	& p {
		font-size: 0.8rem;
		color: ${props => props.theme.color.text.secondary};
	}
`;
const UserDisplayCard = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${props => props.theme.color.border.primary};
`
const Item = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`
const IconContainer = styled.div`
    margin-left: auto;
    padding: 0.5rem;
    border-radius: 99px;
    display: grid;
    place-items: center;
`
const UserProfilePopup = ({reff}) => {
    const theme = useStoreState(_ => _.theme)
    const setTheme = useStoreActions(_ => _.setTheme)
    const { instance, accounts } = useMsal();
    const name = accounts[0].name.split("-")[accounts[0].name.split("-").length - 1]
    const [photo, setPhoto] = useState(null)
    useEffect(() => {
		const fetchPhoto = async () => {
			let newPhoto = await getAsyncAvatar(accounts[0].username)
			setPhoto(newPhoto)
		}
		fetchPhoto()
	}, [])
    
    return (
        <Container ref={reff}>
            <UserDisplayCard>
                <Avatar src={photo} height="32px" width="32px"/>
                <UserDisplayCardInfo>
                    <h3>{name}</h3>
                    <p>{accounts[0].username}</p>
                </UserDisplayCardInfo>
                <IconContainer onClick={() => instance.logoutRedirect()}>
                    <BsPower size="1.2rem"/>
                </IconContainer>
            </UserDisplayCard>
            <Item>
                <ThemeToggle value={theme} onSelect={() => setTheme()}/>
                <p>{theme ? "Dark Theme" : "Light Theme"}</p>
            </Item>
        </Container>
    )
}

export default UserProfilePopup