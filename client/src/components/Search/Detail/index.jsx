/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { navigate } from "@reach/router";
import { approveRequest, getRequestDetail, remindApprove } from 'api/request';
import AbsoluteModal from 'components/AbsoluteModal';
import ApprovalFlow from "components/ApprovalFlow";
import Placeholder from "components/Placeholder";
import Tab from "components/Tab";
import TabPane from "components/TabPane";
import useCustomLoader from "hooks/useCustomLoader";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ApprovalInfo from "./ApprovalInfo";
import ApproveWindow from './ApproveWindow';
import ConfirmPopup from './ConfirmPopup';
import Content from "./Content";
import Header from "./Header";

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
	const {render, reset, setNotFound, setPercent} = useCustomLoader(true, <Placeholder type="NOT_FOUND"/>)

	useEffect(() => {
		let mounted = true
		const fetchData = async () => {
			reset()
			getRequestDetail(id, (p) => {if (mounted) setPercent(p)})
				.then(data => {
					if (mounted) {
						setRequest(data)
						console.log(data);
					}
				})
				.catch(() => {
					if (mounted)
						setNotFound(true)
				});
		}
		fetchData()
		return (() => {mounted = false})
	},[id]);

	const handleConfirm = async () => {
		reset()
		await approveRequest(id, {code: confirmPopup, comment, opinionId}, (p) => setPercent(p))
		setTimeout(() => navigate(`/search/${id}`), 400)
	}
	const handleCancel = async () => {
		setConfirmPopup("")
	}
	const remindApprover = async (userId) => {
		await remindApprove(id, userId)
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
								remindApprover={remindApprover}
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
