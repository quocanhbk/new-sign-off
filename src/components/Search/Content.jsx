import React from 'react';
import styled from 'styled-components'

const ContentWrapper = styled.div`

`
const ContentInfo = styled.div`
    display: flex;
    
    padding-bottom: 1rem;
    border-bottom: 3px solid ${(props) => props.theme.color.text.secondary};
`
const ContentTitle = styled.div`
    display:flex;
    flex-direction: column;
    flex: 10;
    & p{
        color: ${(props) => props.theme.color.text.primary};
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
`
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
        </ContentWrapper>
    );
}

export default Content;