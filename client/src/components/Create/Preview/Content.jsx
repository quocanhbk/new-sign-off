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

const dataList=[
    {
        id : 1,
        name: 'Name of doucument in wrap text',
        data_field: [
            {
                id: 1,
                name: 'Date of Request',
                value: '20/04/2021'
            },
            {
                id: 2,
                name: 'Description',
                value: 'TT tiền thanh toán chi phí tiếp khách ABC tại sự kiện DEF ngày 20/04/2021'
            },
            {
                id: 3,
                name: 'Value Excl.VAT',
                value: '17,000,000 vnđ'
            }
        ]
    },
    {
        id : 2,
        name: 'Internal payment request form - Đề nghị thanh toán nội bộ.',
        data_field: []
    },
]
const events = [
    {
        id: 1,
        title: 'Lorem ipsum dolo sit amet',
        create_by: 'Nguyễn Văn Gấu',
        create_date: '16:20 20/04/2021',
    },
    {
        id: 2,
        title: 'Lorem ipsum dolo sit amet',
        create_by: 'Nguyễn Văn Gấu',
        create_date: '16:20 20/04/2021',
    },
    {
        id: 3,
        title: 'Lorem ipsum dolo sit amet',
        create_by: 'Nguyễn Văn Gấu',
        create_date: '16:20 20/04/2021',
    },
    {
        id: 4,
        title: 'Lorem ipsum dolo sit amet consectetur adipisicing elit. Aliquid iure labore officia. Expedita suscipit odit non  Expedita suscipit odit non  Expedita suscipit odit non     eligendi laudantium deserunt perspiciatis. ',        
        create_by: 'Nguyễn Văn Gấu',
        create_date: '16:20 20/04/2021',
    }
]
function Content() {
    const [comment,setComment] = useState(events)
    return (
        <ContentWrapper className="abc">
            <SectionContainer headline="1. Related Project">
                TTG - Tap doan trung thuy
            </SectionContainer>
            <SectionContainer headline="2. Description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, ab. Amet quaerat sunt voluptatibus ab nostrum, temporibus quisquam saepe placeat?
            </SectionContainer>
            <SectionContainer headline="3. Approval File">
                <TableApproval dataList={dataList}/>
            </SectionContainer>
            <SectionContainer headline="4. Reference File">
                <TableApproval dataList={dataList}/>
            </SectionContainer>
            <SectionContainer headline="5. Event & Comments">
                <EventComments dataList={comment} setComment={setComment} />
            </SectionContainer>
        </ContentWrapper>
    );
}

export default Content;