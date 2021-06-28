/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import Tab from "components/Tab";
import TabPane from "components/TabPane";
import Content from "./Content";
import Header from "./Header";
import ApprovalInfo from "./ApprovalInfo";
import styled from "styled-components";
import {getRequestDetail} from 'api/request'
import ApprovalFlow from "components/ApprovalFlow";
import useCustomLoader from "hooks/useCustomLoader";
import Placeholder from "components/Placeholder";
import ApproveWindow from './ApproveWindow'
import AbsoluteModal from 'components/AbsoluteModal'
import ConfirmPopup from './ConfirmPopup'
import {approveRequest} from 'api/request'
import { useStoreState } from "easy-peasy";
import { navigate, Redirect } from "@reach/router";

const Container = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`

const  DisplayContent = ({id, mode}) => {
	const [request, setRequest] = useState(null)
	const [confirmPopup, setConfirmPopup] = useState("")
	const [opinionId, setOpinionId] = useState(null)
	const [comment, setComment] = useState("")
	const users = useStoreState(s => s.users)
	const {render, reset, setNotFound, setPercent} = useCustomLoader(true, <Placeholder type="NOT_FOUND"/>)
	const { accounts } = useMsal();
	const currentUserId = users.find(u => u.email === accounts[0].username).id
	console.log(request);
	useEffect(() => {
		const fetchData = async () => {
			reset()
			let res = await getRequestDetail(id, (p) => setPercent(p)).catch(() => setNotFound(true));
			setRequest(res)
			console.log(res);
		}
		fetchData()
	},[id]);

	const handleConfirm = async () => {
		reset()
		await approveRequest(id, {code: confirmPopup, comment, opinionId}, (p) => setPercent(p))
		setTimeout(() => navigate(`/search/${id}`), 400)
	}
	const handleCancel = async () => {
		setConfirmPopup("")
	}

    return (
		<Container className="container">
			{render(request && (
				<>
					<Header
						title={request.title}
						status={request.status}
						type={request.type}
						updatedAt={request.updatedAt}
					/>
					<Tab fullHeight className="tab-container">
						<TabPane name="Content" key={1} value={1}>
							<Content request={request} />
						</TabPane>
						<TabPane name="Approval Flow" key={2} value={2}>
							<ApprovalFlow 
								submitter={request.submitter}
								advisors={request.advisors}
								approvers={request.approvers}
								observators={request.observators}
								currentApprover={request.currentApprover}
							/>
						</TabPane>
						<TabPane name="Info" key={3} value={3}>
							<ApprovalInfo request={request}/>
						</TabPane>
					</Tab>
					{mode === "sign" && 
						<ApproveWindow 
							opinions={request.opinions} 
							setConfirmPopup={setConfirmPopup}
							setOpinionId={setOpinionId}
						/>
					}
					<AbsoluteModal 
						visible={confirmPopup !== ""} 
						onClickOutside={() => setConfirmPopup("")} 
						width="50%"
					>
						<ConfirmPopup 
							decision={confirmPopup}
							onConfirmClick={handleConfirm}
							onCancelClick={handleCancel}
							comment={comment}
							setComment={setComment}
						/>
					</AbsoluteModal>
				</>
			))}
		</Container>
    );
}

export default DisplayContent;
