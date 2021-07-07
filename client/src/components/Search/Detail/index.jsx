/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { approveRequest, getLastSignRequest, remindApprove } from 'api/request';
import AbsoluteModal from 'components/AbsoluteModal';
import ApprovalFlow from "./ApprovalFlow";
import Tab from "./Tab";
import TabPane from "./TabPane";
import { useStoreActions } from "easy-peasy";
import React, { useEffect, useState, memo } from "react";
import styled from "styled-components";
import ApprovalInfo from "./ApprovalInfo";
import ApproveWindow from './ApproveWindow';
import ConfirmPopup from './ConfirmPopup';
import Content from "./Content";
import Header from "./Header";
import FormPopup from './FormPopup'
import useMediaQuery from 'hooks/useMediaQuery';
import useRequest from './useRequest'
import { useQueryClient } from 'react-query';
import CancelPopup from './CancelPopup'

const Container = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
`

const  DisplayContent = ({id, mode}) => {
	// used for displaying approve confirm popup
	const [confirmPopup, setConfirmPopup] = useState("")
	const [opinionId, setOpinionId] = useState(null)
	// used for storing approve comment
	const [comment, setComment] = useState("")
	const [logs, setLogs] = useState([]);
	// used for storing viewing attachment
	const [editingAttachment, setEditingAttachment] = useState(null)
	// used for displaying cancel request popup
	const [cancelPopup, setCancelPopup] = useState(false)
	const [reason, setReason] = useState("")
	const setPath = useStoreActions(s => s.setPath)
	const device = useMediaQuery()
	const {data: request, render} = useRequest(id, mode)
	const queryClient = useQueryClient()

	useEffect(() => {
		if (request) setLogs(request.logs)
	}, [request])

	const handleConfirmApprove = async () => {
		// need to catch error
		await approveRequest(id, {code: confirmPopup, comment, opinionId})
		getLastSignRequest().then(id => {
			setConfirmPopup("")
			if (id) setPath(`/sign/${id}`)
			else setPath(`/sign`)
			queryClient.fetchQuery('requests')
		})
		setComment("")
	}
	const handleConfirmCancel = async () => {
		
	}
	const remindApprover = async (userId) => {
		await remindApprove(id, userId)
	}
    return (
		<Container className="container">
			<AbsoluteModal 
				visible={editingAttachment !== null} 
				onClickOutside={() => setEditingAttachment(null)}
				fixed overflow="overlay" height={device === "PC" ? "80%" : "100%"} width={device === "PC" ? "70%" : "100%"}
				maxWidth="880px"
			>
				{editingAttachment && 
					<FormPopup
						attachment={(editingAttachment.type === "approval" ? request.approvalAttachments : request.referenceAttachments)
							.find(_ => _.id === editingAttachment.id)}
					/>
				}
			</AbsoluteModal>
			{render(request && (
				<>
					<Header
						id={id}
						title={request.title}
						status={request.status}
						type={request.type}
						updatedAt={request.updatedAt}
						mode={mode}
					/>
					<Tab fullHeight className="tab-container">
						<TabPane name="Content" key={1} value={1}>
							<Content request={request} logs={logs} setLogs={setLogs} setEditingAttachment={setEditingAttachment}/>
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
						width="80%"
						maxWidth="360px"
						// max-width="480px"
					>
						<ConfirmPopup 
							decision={confirmPopup}
							onConfirmClick={handleConfirmApprove}
							onCancelClick={() => setConfirmPopup("")}
							comment={comment}
							setComment={setComment}
						/>
					</AbsoluteModal>
					<AbsoluteModal 
						visible={confirmPopup !== ""} 
						onClickOutside={() => setCancelPopup(false)} 
						width="80%"
						maxWidth="360px"
						// max-width="480px"
					>
						<CancelPopup
							onConfirmClick={handleConfirmCancel}
							onCancelClick={() => setCancelPopup(false)}
							reason={reason}
							setReason={setReason}
						/>
					</AbsoluteModal>
				</>
			))}
		</Container>
    );
}

export default memo(DisplayContent);
