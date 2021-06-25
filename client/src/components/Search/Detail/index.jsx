/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
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

const Container = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`

const  DisplayContent = ({id}) => {

	const [request, setRequest] = useState(null)
  const {render, reset, setNotFound, setPercent} = useCustomLoader(true, <Placeholder type="NOT_FOUND"/>)
	useEffect(() => {
		const fetchData = async () => {
      reset()
			let res = await getRequestDetail(id, (p) => setPercent(p)).catch(() => setNotFound(true));
			setRequest(res)
		}
		fetchData()
	},[id]);

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
          </>
        ))}
      </Container>
    );
}

export default DisplayContent;
