import React from "react";
import styled from "styled-components";

const ContentInfo = styled.div`
  display: flex;
  flex: 1;

  padding-bottom: 0.5rem;
  border-bottom: 3px solid ${(props) => props.theme.color.text.secondary};
`;
const ContentTitle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 10;
  padding: 0 1rem;
  & p {
    color: ${(props) => props.theme.color.text.secondary};
    flex: 1;
  }
  & .content-modified {
    font-size: 0.8rem;
  }
  & .content-title {
    font-weight: bold;
  }
`;
const ContentProperties = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;

  & span {
    text-align: center;
    font-weight: bold;
    padding: 0.3rem 0.5rem;
  }
  & .content-status {
    background: ${(props) => props.theme.color.fill.success};
    color: ${(props) => props.theme.color.background.primary};
  }
  & .content-approved {
    background: ${(props) => props.theme.color.border.primary};
    color: ${(props) => props.theme.color.text.primary};

    margin-top: 0.5rem;
  }
`;

const ContentHeaderTab = () => {
  return (
    <ContentInfo>
      <ContentTitle>
        <p className="content-modified">Last modified at 05:35 pm 04/05/2021</p>
        <p className="content-title">
          Đề nghị thanh toán chi phí tiếp khách ABC 20/04/2021
        </p>
      </ContentTitle>
      <ContentProperties>
        <span className="content-status">Approved</span>
        <span className="content-approved">Flexible</span>
      </ContentProperties>
    </ContentInfo>
  );
};

export default ContentHeaderTab;
