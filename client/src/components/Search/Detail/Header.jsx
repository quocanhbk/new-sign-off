/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import {format} from 'date-fns'
import Button from "components/Base/Button";
import { BsChevronLeft } from "react-icons/bs";
import { navigate } from "@reach/router";
import useMediaQuery from "hooks/useMediaQuery";
import { useStoreState } from "easy-peasy";
import {admins} from 'constant'
import { useMsal } from "@azure/msal-react";
import StatusTag from '../StatusTag'
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
		margin-left: 0.5rem;
	}
`
const Header = ({id, title, status, type, updatedAt, mode, setCancelPopup, onDeleteDraft}) => {

	let device = useMediaQuery()
	const users = useStoreState(state => state.users)
	const { accounts } = useMsal();
	const curUser = users.find(u => u.email === accounts[0].username)
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
						<StatusTag readOnly status={status}/>
						<Button readOnly gap="0.2rem" variant={"abc"} padding="0.2rem 0.4rem" fontSize="0.8rem" weight="400">{type}</Button>
					</TitleContainer>
				</div>
				{device === "PC" && mode === "search" && (
				status === "Draft" ? 
					<>
					<Right><Button color="info" onClick={() => navigate("/draft/" + id)}>Edit</Button></Right>
					<Right><Button color="danger" onClick={onDeleteDraft}>Delete</Button></Right>
					</> :
				status === "Revising" ? <Right><Button color="info" onClick={() => navigate("/revise/" + id)}>Edit</Button></Right> :
				null)}
				{(device === "PC" && status === "Pending" && admins.includes(curUser.id)) && mode === "search" &&
					<Right><Button color="danger" onClick={() => setCancelPopup(true)}>Cancel</Button></Right>
				}
				{device === "PC" && status === "Approved" &&
					<Right><Button color="success">Export</Button></Right>
				}
			</Left>
		</ContentInfo>
	);
};

export default Header;
