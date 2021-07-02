/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { approveRequest, getRequestDetail, remindApprove } from 'api/request';
import AbsoluteModal from 'components/AbsoluteModal';
import ApprovalFlow from "components/ApprovalFlow";
import Placeholder from "components/Placeholder";
import Tab from "components/Tab";
import TabPane from "components/TabPane";
import { useStoreActions } from "easy-peasy";
import useCustomLoader from "hooks/useCustomLoader";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ApprovalInfo from "./ApprovalInfo";
import ApproveWindow from './ApproveWindow';
import ConfirmPopup from './ConfirmPopup';
import Content from "./Content";
import Header from "./Header";
import FormPopup from './FormPopup'

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
	const setPath = useStoreActions(s => s.setPath)
	const {render, reset, setNotFound, setPercent} = useCustomLoader(true, <Placeholder type="NOT_FOUND"/>)
	const [logs, setLogs] = useState([]);
	const [editingAttachment, setEditingAttachment] = useState(null)
	// to prevent setting state to Unmounted component, we use the "mounted" variable
	// "mounted" will be false once component unmount, and that will prevent any set state statement from happenning
	useEffect(() => {
		let mounted = true
		const fetchData = () => {
			reset()
			setRequest(null)
			getRequestDetail(id, mode === "sign", (p) => {if (mounted) setPercent(p)})
				.then(data => {
					if (mounted) {
						setRequest(data)
						setLogs(data.logs)
					}
				})
				.catch(() => {
					if (mounted) setNotFound(true)
				});
		}
		fetchData()
		return (() => {mounted = false})
	},[id]);

	const handleConfirm = async () => {
		reset()
		await approveRequest(id, {code: confirmPopup, comment, opinionId}, (p) => setPercent(p))
		setTimeout(() => setPath(`/search/${id}`), 400)
	}
	const handleCancel = () => {
		setConfirmPopup("")
	}
	const remindApprover = async (userId) => {
		await remindApprove(id, userId)
	}
    return (
		<Container className="container">
			<AbsoluteModal 
				visible={editingAttachment !== null} 
				onClickOutside={() => setEditingAttachment(null)}
				fixed overflow="overlay" height="80%" width="70%"
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
