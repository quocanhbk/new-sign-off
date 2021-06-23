/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components'
import {getFader} from '../../../utils/color'
import EventComments from './EventComments';
import TableApproval from './TableApproval';
import SectionContainer from '../../SectionContainer';

const ContentWrapper = styled.div`
    display:flex;
    flex-direction: column;
    flex: 1;
    padding: 1rem;
    gap: 1rem;
    height: 100%;
    overflow: auto;

    ::-webkit-scrollbar {
        width: 0.5rem;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: ${props => getFader(props.theme.color.fill.secondary, 0.5)};
        border-radius: 99px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: ${props => props.theme.color.fill.secondary};
    }
`

function Content({request}) {
    const [comment,setComment] = useState('');
    return (
        <ContentWrapper className="abc">
            <SectionContainer headline="1. Related Project">
                {request.title}
            </SectionContainer>
            <SectionContainer headline="2. Description">
                <div dangerouslySetInnerHTML={{__html: request.description}}></div>
            </SectionContainer>
            <SectionContainer headline="3. Approval File">
                <TableApproval dataList={request.attachments}/>
            </SectionContainer>
            <SectionContainer headline="4. Reference File">
                <TableApproval dataList={request.attachments}/>
            </SectionContainer>
            <SectionContainer headline="5. Event & Comments">
                <EventComments logs={request.logs} dataList={comment} setComment={setComment} />
            </SectionContainer>
        </ContentWrapper>
    );
}

export default Content;