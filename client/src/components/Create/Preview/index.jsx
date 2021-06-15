/* eslint-disable react/prop-types */
import React from "react";
import Tab from "../../Tab";
import TabPane from "../../TabPane";
import Content from "./Content";
import Header from "./Header";
import ApprovalFlow from "./ApprovalFlow";
import ApprovalInfo from "./ApprovalInfo";
import styled from "styled-components";

const Container = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`

const  Preview = ({request}) => {
    return (
		<Container className="ctnn">
			<Header title={request.title} status={request.status} type={request.type}/>
			<Tab fullHeight className="tab-container">
				<TabPane name="Content" key={1} value={1}>
				<Content />
				</TabPane>
				<TabPane name="Approval Flow" key={2} value={2}>
				<ApprovalFlow />
				</TabPane>
				<TabPane name="Info" key={3} value={3}>
				<ApprovalInfo />
				</TabPane>
			</Tab>
		</Container>
    );
}

export default Preview;
