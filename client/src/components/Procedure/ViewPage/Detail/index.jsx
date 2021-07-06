/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styled from "styled-components";
import { deleteProcedure } from "api/procedure";
import ContentHeader from "./ContentHeader";
import SectionContainer from 'components/SectionContainer'
import FormControl from "components/FormControl";
import { useStoreState } from "easy-peasy";
import ControlledCombox from "components/ControlledCombox";
import { navigate } from "@reach/router";
import Snackbar from "components/Snackbar";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import Checklist from './Checklist'
import baseURL from "api/baseURL";
import useProcedure from './useProcedure'
const Container = styled.div`
	position: relative;
	height: 100%;
	display: flex;
	flex-direction: column;
`
const ParticipantsContainer = styled.div`
	display: flex;
	flex-direction: column;
	& > * + * {
		margin-top: 0.5rem;
	}
`
const Body = styled.div`
	flex: 1;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	& > * + * {
		margin-top: 1rem;
	}
`
const TagContainer = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    & > * + * {
		margin-left: 0.5rem;
	}
    & img {
        height: 1.2rem;
        border-radius: 99px;
    }
`
const Notify = styled.div`
    padding: 1rem;
    background: ${props => props.theme.color.fill.danger};
    color: ${props => props.theme.color.background.primary};
    display: flex;
    align-items: center;
    & > * + * {
		margin-left: 0.5rem;
	}
    border-radius: 0.5rem;
`
const Tag = ({email, name}) => {
    return (
        <TagContainer>
            <img src={baseURL + "/api/v1/avatar/" + email} alt="" loading="lazy"/>
            <p>{name}</p>
        </TagContainer>
    )
}
const Detail = ({id}) => {
	const [notify, setNotify] = useState(false)
	const users = useStoreState(s => s.users).map(s => ({...s, display: <Tag email={s.email} name={s.name}/>}))
	const onDeleteClick = async () => {
		let message = await deleteProcedure(id)
		if (message === "delete-success")
			navigate('/procedure')
		else setNotify(true)
	}
	
	const onEditClick = () => {
		navigate('/procedure/create/' + id)
	}

	const {data: procedure, render, onToggleActive} = useProcedure(id)

	return (
		<Container>
			{render(
				procedure &&
				<>
					<ContentHeader 
						title={procedure.title} 
						isActive={procedure.isActive} 
						onDeleteClick={onDeleteClick} 
						onEditClick={onEditClick}
						onToggleActive={onToggleActive}
					/>
					<Body>
						<SectionContainer headline={"Description"}>
							{procedure.description}
						</SectionContainer>
						<SectionContainer headline="Participants">
							<ParticipantsContainer>
							<FormControl headline={"Advisor List"} readOnly>
								<ControlledCombox
									multiple
									selection={users}
									value={users.filter(u => procedure.advisors.includes(u.id))}
									displayField={"display"}
									readOnly
								/>
							</FormControl>
							<FormControl headline={"Approver List"} readOnly>
								<ControlledCombox
									multiple
									selection={users}
									value={users.filter(u => procedure.approvers.includes(u.id))}
									displayField={"display"}
									readOnly
								/>
							</FormControl>
							<FormControl headline={"Observator List"} readOnly>
								<ControlledCombox
									multiple
									selection={users}
									value={users.filter(u => procedure.observators.includes(u.id))}
									displayField={"display"}
									readOnly
								/>
							</FormControl>
						</ParticipantsContainer>
						</SectionContainer>
						<SectionContainer headline="Checklist">
							<Checklist checklist={procedure.checklist} readOnly={true}/>
						</SectionContainer>
					</Body>
					<Snackbar visible={notify} onClose={() => setNotify(false)} timeOut={2000}>
						<Notify>
							<BsFillExclamationTriangleFill size="1.2rem"/>
							<p>Procedure is currently in use!</p>
						</Notify>
					</Snackbar>
				</>
			)}
		</Container>
	);
};

export default Detail;
