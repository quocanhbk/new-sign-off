/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import {format} from 'date-fns'
import Button from "components/Button";
import { BiDislike, BiLike } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { GiPauseButton } from "react-icons/gi";
import { FaPen } from "react-icons/fa";
import { navigate } from "@reach/router";
const ContentInfo = styled.div`
	display: flex;
	gap: 0.5rem;
	padding: 1rem;
	background: ${props => props.theme.color.background.primary};
	border-bottom: 1px solid ${(props) => props.theme.color.border.primary};

	& .content-modified {
		font-size: 0.8rem;
		font-style: italic;
		color: ${props => props.theme.color.text.secondary};
	}

	& .content-title {
		font-size: 1.2rem;
		font-weight: 600;
	}
`;
const Left = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	flex: 1;
`
const Right = styled.div`
	display: flex;
	align-items: center;
`
const TitleContainer = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
`
const Header = ({id, title, status, type, updatedAt}) => {
	const genColor = () => {
		switch (status) {
			case "Approved":
				return "success"
			case "Rejected":
				return "danger"
			case "Draft":
				return "secondary"
			case "Pending":
				return "warning"
			case "Revising":
				return "info"
			default:
				return "primary"
		}
	}

	const renderIcon = () => {
        switch(status) {
            case "Approved":
                return <BiLike/>
            case "Pending":
                return <BsClock/>
            case "Rejected":
                return <BiDislike/>
            case "Revising":
                return <FaPen/>
            default:
                return <GiPauseButton/>
        }
    }

	return (
		<ContentInfo>
			<Left>
				<p className="content-modified">{format(updatedAt, "'Last updated at ' HH:mm dd/MM/yyyy")}</p>
				<p className="content-title">{title}</p>
				<TitleContainer>
					<Button readOnly gap="0.4rem" color={genColor()} padding="0.2rem 0.4rem" fontSize="0.8rem">{renderIcon()}{status}</Button>
					<Button readOnly gap="0.2rem" variant={"abc"} padding="0.2rem 0.4rem" fontSize="0.8rem">{type}</Button>
				</TitleContainer>
			</Left>
			{status === "Draft" && 
			<Right>
				<Button color="info" onClick={() => navigate("/draft/" + id)}>Edit</Button>
			</Right>}
			{status === "Revising" && 
			<Right>
				<Button color="info" onClick={() => navigate("/revise/" + id)}>Edit</Button>
			</Right>}
		</ContentInfo>
	);
};

export default Header;
