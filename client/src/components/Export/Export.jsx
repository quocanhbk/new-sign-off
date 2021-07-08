/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Fragment, useEffect, useState} from 'react';
import styled from 'styled-components';
import { getRequestDetail } from 'api/request';
import { format } from 'date-fns';
import QRCode from 'qrcode';
import baseURL from 'api/baseURL';
import PropTypes from 'prop-types';
import { useQuery } from 'utils/utils';
import Title from './Title'
import {projectList} from 'constant'
import FieldTable from './FieldTable';
import {BsCheck, BsCheckCircle} from 'react-icons/bs'

const Container = styled.div`
  
`;

const Section = styled.section`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const SectionHeader = styled.h4`
    margin: 1rem 0 0.5rem 0;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const FileInfoItem = styled.div`
  padding: 0.4rem;
  flex-basis: 50%;
`;

const DocumentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  & th, td {
    padding: 0.5rem;
    border: 1px solid black;
  }
  & th {
    font-size: 1rem;
    font-weight: 500;
  }
`;

const DescriptionContainer = styled.div`
    border: 1px black solid;
    padding: 0.5rem 0.2rem;
`;

const LogsContainer = styled.div`
    margin-left: 1rem;
`;

const CheckItemName = styled.div`
	display: flex;
	align-items: center;
	& > * + * {
		margin-left: 0.5rem;
	}
`

const Export = ({id}) => {
  const [request, setRequest] = useState(null);
  const [qrCode, setQRCode] = useState('');
  const query = useQuery();
  const getRequest = async () => {
    const fetched = await getRequestDetail(id);
    setRequest(fetched.status === 'Approved' ? fetched : null);
    setQRCode(await QRCode.toDataURL(`${baseURL}/search/${id}`));
    document.title = fetched.title;
    console.log(fetched)
  }
  useEffect(() => {
    getRequest()
  }, [id]);
  return request ? (
	<Container>
		<Title title={request.title} qrCode={qrCode} query={query}/>
		<Section>
			<SectionHeader>DOCUMENT INFORMATION</SectionHeader>
			<FileInfo>
			<FileInfoItem>Document ID: {id}</FileInfoItem>
			<FileInfoItem>Document Type: {request.type}</FileInfoItem>
			<FileInfoItem>Request deadline: {format(request.deadline, 'dd/MM/yyyy')}</FileInfoItem>
			<FileInfoItem>Priority: {request.priority}</FileInfoItem>
			<FileInfoItem>Creator: {request.submitter[0].fullname}</FileInfoItem>
			<FileInfoItem>Final Approver:{' '}{request.approvers[request.approvers.length - 1].fullname}</FileInfoItem>
			<FileInfoItem>Created Date: {format(request.createdAt, 'dd/MM/yyyy')}</FileInfoItem>
			<FileInfoItem>Approved Date: {format(request.updatedAt, 'dd/MM/yyyy')}</FileInfoItem>
			</FileInfo>
		</Section>

		<Section>
			<SectionHeader>RELATED PROJECT</SectionHeader>
			<div>{request.relatedProjects.map(pid => projectList.find(p => p.id === pid).text).join(', ')}</div>
		</Section>
		
		<Section>
			<SectionHeader>APPROVAL ATTACHMENTS</SectionHeader>
			<DocumentTable>
			{request.type === "Flexible" ?
				<tbody>
					<tr>
						<th>Attachment name</th>
						<th>Approved data</th>
					</tr>
					{request.approvalAttachments.map((attachment) => (
						<tr key={attachment.id}>
							<td>{attachment.name}</td>
							<td><FieldTable attachment={attachment}/></td>
						</tr>
					))}
				</tbody> :
				<tbody>
					<tr>
						<th>Check Item</th>
						<th>Attachment name</th>
						<th>Approved data</th>
					</tr>
					{request.checklist.map(checkItem => (
						<Fragment key={checkItem.id}>
							<tr>
								<td rowSpan={request.approvalAttachments.filter(a => a.checklistItemId === checkItem.id).length}>
									<CheckItemName>
										<BsCheckCircle/>
										<p>{checkItem.name}</p>
									</CheckItemName>
								</td>
								<td>{request.approvalAttachments[0].name}</td>
								<td><FieldTable attachment={request.approvalAttachments[0]}/></td>
							</tr>
							{request.approvalAttachments.slice(1).map(attachment => (
								<tr key={attachment.id}>
									<td>{attachment.name}</td>
									<td><FieldTable attachment={attachment}/></td>
								</tr>
							))}
						</Fragment>
					))}
				</tbody>
			}
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
	</Container>
) : (
	<div>Error 404: Not found</div>
);
};

Export.propTypes = {
  id: PropTypes.string,
}

export default Export;