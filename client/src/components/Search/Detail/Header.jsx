/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import {format} from 'date-fns'
import Button from "components/Base/Button";
import { BiDislike, BiLike, BiRevision } from "react-icons/bi";
import { BsChevronLeft, BsClock } from "react-icons/bs";
import { GiPauseButton } from "react-icons/gi";
import { navigate } from "@reach/router";
import useMediaQuery from "hooks/useMediaQuery";
const ContentInfo = styled.div`
	display: flex;
	background: ${props => props.theme.color.background.primary};
	border-bottom: 1px solid ${(props) => props.theme.color.border.primary};
	padding-left: 0.5rem;
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
	flex: 1;
	padding: 1rem 1rem 1rem 0.5rem;
	& .search-header-title {
		flex: 1;
		display: flex;
		flex-direction: column;
		& > * + * {
			margin-top: 0.5rem;
		}
	}
	& > * + * {
		margin-left: 0.5rem;
	}
`
const Right = styled.div`
	display: flex;
	align-items: center;
`
const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	& > * + * {
		margin-left: 1rem;
	}
`
const Header = ({id, title, status, type, updatedAt, mode}) => {
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
                return <BiRevision/>
            default:
                return <GiPauseButton/>
        }
    }
	let device = useMediaQuery()
	return (
		<ContentInfo>
			{device === "PHONE" && 
				<Button type="ghost" padding="0.4rem" onClick={() => navigate(`/${mode}`)}><BsChevronLeft/></Button>
			}
			<Left>
				<div className="search-header-title">
					<p className="content-modified">{format(updatedAt, "'Last updated at ' HH:mm dd/MM/yyyy")}</p>
					<p className="content-title">{title}</p>
					<TitleContainer>
						<Button readOnly gap="0.4rem" color={genColor()} padding="0.2rem 0.4rem" fontSize="0.8rem" type="fill" weight="400">
							{renderIcon()}<p>{status}</p>
						</Button>
						<Button readOnly gap="0.2rem" variant={"abc"} padding="0.2rem 0.4rem" fontSize="0.8rem" weight="400">{type}</Button>
					</TitleContainer>
				</div>
				{device === "PC" && (
				status === "Draft" ? <Right><Button color="info" onClick={() => navigate("/draft/" + id)}>Edit</Button></Right> :
				status === "Revising" ? <Right><Button color="info" onClick={() => navigate("/revise/" + id)}>Edit</Button></Right> :
				null)}
			</Left>
		</ContentInfo>
	);
};

export default Header;
