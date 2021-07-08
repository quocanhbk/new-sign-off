import React, { useEffect, useState} from 'react';
import styled from 'styled-components';
import { getRequestDetail } from 'api/request';
import { format } from 'date-fns';
import QRCode from 'qrcode';
import baseURL from 'api/baseURL';
import PropTypes from 'prop-types';
import { getCheckList } from 'api/procedure';
import { useQuery } from 'utils/utils';


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
  & > tbody > tr > td,
  th {
    border: 1px black solid;
    padding-left: 0.2rem;
  }
`;

const FieldsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-sizing: border-box;
  & > tbody > tr > td,
  th {
    border-right: 1px solid black;
    padding-left: 0.2rem;
  }
`

const DescriptionContainer = styled.div`
    border: 1px black solid;
    padding: 0.5rem 0.2rem;
`;

const LogsContainer = styled.div`
    margin-left: 1rem;
`;

const QRCodeDisplay = styled.div`
  text-align: right;
`;

const CheckListCell = ({checkListId}) => {
  const [checkList, setCheckList] = useState({});
  const handleCheckList = async () => {
    const result = await getCheckList(checkListId)
    setCheckList(result.data);
  }
  useEffect(() => {
    handleCheckList();
  }, [checkListId])
  return (<td>✔ {checkList.name}</td>)
}
CheckListCell.propTypes = {
  checkListId: PropTypes.number,
}

const Export = ({id}) => {
  const [request, setRequest] = useState(null);
  const [qrCode, setQRCode] = useState('');
  const query = useQuery();
  const getRequest = async () => {
    const fetched = await getRequestDetail(id);
    setRequest(fetched.status === 'Approved' ? fetched : null);
    setQRCode(await QRCode.toDataURL(`${baseURL}/search/${id}`));
    document.title = fetched.title;
    window.print();
  }
  useEffect(() => {
    getRequest()
  }, [id]);
  return request ? (
    <div>
      <QRCodeDisplay>
        <img src={qrCode} width={query.width || 80} height={query.height || 80} alt="qrcode" />
      </QRCodeDisplay>
      <DocumentTitle>{request.title}</DocumentTitle>
      <hr />
      <br />
      <Section>
        <SectionHeader>FILE INFO</SectionHeader>
        <FileInfo>
          <FileInfoItem>File ID: {id}</FileInfoItem>
          <FileInfoItem>File Type: {request.type}</FileInfoItem>
          <FileInfoItem>
            Request deadline: {format(request.deadline, 'dd/MM/yyyy')}
          </FileInfoItem>
          <FileInfoItem>Priority: {request.priority}</FileInfoItem>
          <FileInfoItem>Creator: {request.submitter[0].fullname}</FileInfoItem>
          <FileInfoItem>
            Final Approver:{' '}
            {request.approvers[request.approvers.length - 1].fullname}
          </FileInfoItem>
          <FileInfoItem>
            Created Date: {format(request.createdAt, 'dd/MM/yyyy')}
          </FileInfoItem>
          <FileInfoItem>
            Approved Date: {format(request.updatedAt, 'dd/MM/yyyy')}
          </FileInfoItem>
        </FileInfo>
      </Section>
      <Section>
        <SectionHeader>RELATED PROJECT</SectionHeader>
        <div>{request.relatedProjects.join(', ')}</div>
      </Section>
      <Section>
        <SectionHeader>APPROVAL DOCUMENT(S)</SectionHeader>
        <DocumentTable>
          <tbody>
            <tr>
              {request.type === 'Procedure' && <th>Checklist</th>}
              <th>Document name</th>
              <th>Approved data</th>
            </tr>
            {request.approvalAttachments.map((attachment) => (
              <tr key={attachment.id}>
                {attachment.checklistItemId && <CheckListCell checkListId={attachment.checklistItemId} />}
                <td>{attachment.name}</td>
                <td>
                  {attachment.fields.length > 0 ? (
                    <FieldsTable>
                      <tbody>
                        {attachment.fields.map((field) => (
                          <tr key={field.id}>
                            <td>{field.name}</td>
                            <td>{field.content}</td>
                          </tr>
                        ))}
                      </tbody>
                    </FieldsTable>
                  ) : (
                    'No fields'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </DocumentTable>
      </Section>
      <Section>
        <SectionHeader>DESCRIPTION</SectionHeader>
        <DescriptionContainer
          dangerouslySetInnerHTML={{ __html: request.description }}
        ></DescriptionContainer>
      </Section>
      <Section>
        <SectionHeader>LOGS</SectionHeader>
        <LogsContainer>
          <ul>
            {request.logs.map((log) => (
              <li key={log.id}>
                {log.author.name} {log.description.toLowerCase()} at{' '}
                {format(new Date(log.createdAt), 'dd/MM/yyyy hh:mm')}
              </li>
            ))}
          </ul>
        </LogsContainer>
      </Section>
    </div>
  ) : (
    <div>Error 404: Not found</div>
  );
};

Export.propTypes = {
  id: PropTypes.string,
}

export default Export;