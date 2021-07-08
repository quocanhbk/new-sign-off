import React, { useEffect } from 'react';
import styled from 'styled-components';
const Container = styled.div`
  background-color: white;
  color: black;
  width: 21cm;
  height: 29.7cm;
  padding: 1cm 0.5cm;
`;

const Playground = () => {
  useEffect(() => {
    document.title = 'Exported PDF';
  }, []);
  return (
    <Container>
      <Export />
    </Container>
  );
};

const DocumentTitle = styled.h2`
  text-align: left;
  text-transform: uppercase;
  padding-bottom: 0.5rem;
`;

const Section = styled.section`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const SectionHeader = styled.h5`
    margin: 1rem 0;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const FileInfoItem = styled.div`
  padding: 0.4rem;
  flex-basis: 50%;
  box-sizing: border-box;
`;

const DocumentTable = styled.table`
  width: 100%;
  border: 1px black solid;
  border-collapse: collapse;
  & > tr > td,
  th {
    border: 1px black solid;
    padding-left: 0.2rem;
  }
`;

const Export = () => {
  return (
    <div>
      <DocumentTitle>request.title</DocumentTitle>
      <hr />
      <br />
      <Section>
        <SectionHeader>FILE INFO</SectionHeader>
        <FileInfo>
          <FileInfoItem>File ID: request.id</FileInfoItem>
          <FileInfoItem>File Type: request.type</FileInfoItem>
          <FileInfoItem>Request deadline: request.deadline</FileInfoItem>
          <FileInfoItem>Priority: request.priority</FileInfoItem>
          <FileInfoItem>Creator: request.author</FileInfoItem>
          <FileInfoItem>Final Approver: stupid shit</FileInfoItem>
          <FileInfoItem>Created Date: request.created_at</FileInfoItem>
          <FileInfoItem>Approved Date: request.updated_at</FileInfoItem>
        </FileInfo>
      </Section>
      <Section>
        <SectionHeader>RELATED PROJECT</SectionHeader>
        <div>request.relatedProjects.join()</div>
      </Section>
      <Section>
        <SectionHeader>APPROVAL DOCUMENT(S)</SectionHeader>
        <DocumentTable>
        <tr>
            <th>Document name</th>
            <th colSpan={2}>Approved data</th>
        </tr>
        <tr>
            <td>Document 1</td>
            <td>123</td>
            <td>234</td>
        </tr>
        </DocumentTable>
      </Section>
    </div>
  );
};

export default Playground;
