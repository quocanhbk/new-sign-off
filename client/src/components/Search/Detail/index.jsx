/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Tab from "../../Tab";
import TabPane from "../../TabPane";
import Content from "./Content";
import Header from "./Header";
import ApprovalInfo from "./ApprovalInfo";
import styled from "styled-components";
import {getRequestDetail} from 'api/request'
import ApprovalFlow from "components/ApprovalFlow";

const Container = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`

const  DisplayContent = ({id}) => {

	const [request, setRequest] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			let res = await getRequestDetail(id);
			setRequest(res)
      console.log(res);
		}
		fetchData()
	},[id]);

    return (
      <Container className="container">
        {request ? (
          <>
            <Header
              title={request.title}
              status={request.status}
              type={request.type}
            />
            <Tab fullHeight className="tab-container">
              <TabPane name="Content" key={1} value={1}>
                <Content request={request} />
              </TabPane>
              <TabPane name="Approval Flow" key={2} value={2}>
                <ApprovalFlow 
									submitter={request.createdBy}
									advisors={request.advisors}
									approvers={request.approvers}
									observators={request.observators}
								/>
              </TabPane>
              <TabPane name="Info" key={3} value={3}>
                <ApprovalInfo request={request}/>
              </TabPane>
            </Tab>
          </>
        ) : null}
      </Container>
    );
}

export default DisplayContent;
