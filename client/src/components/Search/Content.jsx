import React, { useState } from 'react';
import styled from 'styled-components'
import {getFader} from '../../utils/color'
import EventComents from './EventComents';
import TableApproval from './TableApproval';
import TableReference from './TableReference';

const ContentWrapper = styled.div`
    display:flex;
    flex-direction: column;
    flex: 10;
    padding: 1rem;
    height: 80%;
    overflow: auto;
    position: relative;
    
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
const ContentContainer = styled.div`
    flex: 10;
`
const DivContent = styled.div`
    padding: 0.5rem 0;
`
const Label = styled.p`
    font-weight: bold;
    color: ${props => props.theme.color.text.primary};
`
const TextFill  = styled.p`
    padding: 0.3rem 0;

    color: ${props => props.theme.color.text.primary};
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
        <ContentWrapper>
            <ContentContainer>
                <DivContent>
                    <Label>RELATED PROJECT</Label>
                    <TextFill>TTG - Tập đoàn Trung Thủy</TextFill>
                </DivContent>
                <DivContent>
                    <Label>Description</Label>
                    <TextFill>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit cum dolor dolorem soluta illum recusandae expedita consectetur? Nesciu
                            nt qui modi dolore similique? Molestias odit explicabo consequatur molestiae in ducimus modi. Lorem ipsum dolor sit amet 
                            consectetur adipisicing elit. Aliquid iure labore officia. Expedita suscipit odit non eligendi laudantium deserunt perspiciatis. 
                            Alias possimus quas, accusantium neque minus asperiores natus error magnam!, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit cum dolor dolorem soluta illum recusandae expedita consectetur? Nesciu
                            nt qui modi dolore similique? Molestias odit explicabo consequatur molestiae in ducimus modi. Lorem ipsum dolor sit amet 
                            consectetur adipisicing elit. Aliquid iure labore officia. Expedita suscipit odit non eligendi laudantium deserunt perspiciatis. 
                            Alias possimus quas, accusantium neque minus asperiores natus error magnam!
                            rem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit cum dolor dolorem soluta illum recusandae expedita consectetur? Nesciu
                            nt qui modi dolore similique? Molestias odit explicabo consequatur molestiae in ducimus modi. Lorem ipsum dolor sit amet 
                            consectetur adipisicing elit. Aliquid iure labore officia. Expedita suscipit odit non eligendi laudantium deserunt perspiciatis. 
                            Alias possimus quas, accusantium neque minus asperiores natus error magnam!, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit cum dolor dolorem soluta illum recusandae expedita consectetur? Nesciu
                            nt qui modi dolore similique? Molestias odit explicabo consequatur molestiae in ducimus modi. Lorem ipsum dolor sit amet 
                            consectetur adipisicing elit. Aliquid iure labore officia. Expedita suscipit odit non eligendi laudantium deserunt perspiciatis. 
                            Alias possimus quas, accusantium neque minus asperiores natus error magnam!
                            rem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit cum dolor dolorem soluta illum recusandae expedita consectetur? Nesciu
                            nt qui modi dolore similique? Molestias odit explicabo consequatur molestiae in ducimus modi. Lorem ipsum dolor sit amet 
                            consectetur adipisicing elit. Aliquid iure labore officia. Expedita suscipit odit non eligendi laudantium deserunt perspiciatis. 
                            Alias possimus quas, accusantium neque minus asperiores natus error magnam!, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit cum dolor dolorem soluta illum recusandae expedita consectetur? Nesciu
                            nt qui modi dolore similique? Molestias odit explicabo consequatur molestiae in ducimus modi. Lorem ipsum dolor sit amet 
                            consectetur adipisicing elit. Aliquid iure labore officia. Expedita suscipit odit non eligendi laudantium deserunt perspiciatis. 
                            Alias possimus quas, accusantium neque minus asperiores natus error magnam!
                            rem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit cum dolor dolorem soluta illum recusandae expedita consectetur? Nesciu
                            nt qui modi dolore similique? Molestias odit explicabo consequatur molestiae in ducimus modi. Lorem ipsum dolor sit amet 
                            consectetur adipisicing elit. Aliquid iure labore officia. Expedita suscipit odit non eligendi laudantium deserunt perspiciatis. 
                            Alias possimus quas, accusantium neque minus asperiores natus error magnam!, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit cum dolor dolorem soluta illum recusandae expedita consectetur? Nesciu
                            nt qui modi dolore similique? Molestias odit explicabo consequatur molestiae in ducimus modi. Lorem ipsum dolor sit amet 
                            consectetur adipisicing elit. Aliquid iure labore officia. Expedita suscipit odit non eligendi laudantium deserunt perspiciatis. 
                            Alias possimus quas, accusantium neque minus asperiores natus error magnam!
                    </TextFill>
                </DivContent>
                <DivContent>
                    <TableApproval dataList={dataList}/>
                </DivContent>
                <DivContent>
                    <TableReference dataList={dataList}/>
                </DivContent>
                <DivContent>
                    <EventComents dataList={comment} setComment={setComment} />
                </DivContent>
            </ContentContainer>
        </ContentWrapper>
    );
}

export default Content;