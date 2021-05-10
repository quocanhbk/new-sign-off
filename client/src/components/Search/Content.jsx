import React from 'react';
import styled from 'styled-components'
import {getFader} from '../../utils/color'
import TableApproval from './TableApproval';

const ContentWrapper = styled.div`
    display:flex;
    flex-direction: column;
`
const ContentInfo = styled.div`
    display: flex;
    flex: 1;

    padding-bottom: 0.5rem;
    border-bottom: 3px solid ${(props) => props.theme.color.text.secondary};
`
const ContentTitle = styled.div`
    display:flex;
    flex-direction: column;
    flex: 10;
    padding: 0 1rem;
    & p{
        color: ${props => props.theme.color.text.secondary};
        flex: 1;
    }
    & .content-modified{
        font-size : 0.8rem;
    }
    & .content-title{
        font-weight: bold;
    }
`
const ContentProperties = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    font-size : 0.8rem;

    & span{
        text-align: center;
        font-weight: bold;
        padding: 0.3rem 0.5rem;
    }
    & .content-status{
        background: ${(props) => props.theme.color.fill.success};
        color: ${props => props.theme.color.background.primary};
    }
    & .content-approved{
        background: ${props => props.theme.color.border.primary};
        color: ${(props) => props.theme.color.text.primary};

        margin-top: 0.5rem; 
    }
`
const ContentContainer = styled.div`
    flex: 10;

    padding: 0.5rem 1rem;

    overflow: overlay;
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
const DivContent = styled.div`
    padding: 0.5rem 0;
`
const Label = styled.p`
    font-weight: bold;
    color: ${props => props.theme.color.text.secondary};
`
const TextFill  = styled.p`
    padding: 0.3rem 0;

    color: ${props => props.theme.color.text.secondary};
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
function Content() {
    return (
        <ContentWrapper>
            <ContentInfo>
                <ContentTitle>
                    <p className="content-modified">Last modified at 05:35 pm 04/05/2021</p>
                    <p className="content-title">Đề nghị thanh toán chi phí tiếp khách ABC 20/04/2021</p>
                </ContentTitle>
                <ContentProperties>
                    <span className="content-status">Approved</span>
                    <span className="content-approved">Flexible</span>
                </ContentProperties>
            </ContentInfo>
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
                    </TextFill>
                </DivContent>
                <DivContent>
                    <TableApproval dataList={dataList}/>
                </DivContent>
            </ContentContainer>
        </ContentWrapper>
    );
}

export default Content;