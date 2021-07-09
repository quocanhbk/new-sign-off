/* eslint-disable react/prop-types */
import React from 'react'
import styled from "styled-components";

const Container = styled.div``

const DocumentTitle = styled.h2`
  text-transform: uppercase;
  font-size: 400;
  padding-bottom: 1rem;
  border-bottom: 1px solid black;
`;

const QRCodeDisplay = styled.div`
  position: absolute;
  right: 0.5cm;
  top: 0.5cm;
`;

const Title = ({qrCode, query, title}) => {
    return (
        <Container>
            <QRCodeDisplay>
                <img src={qrCode} width={query.width || 56} height={query.height || 56} alt="qrcode" onLoad={() => window.print()}/>
            </QRCodeDisplay>
            <DocumentTitle>{title}</DocumentTitle>
        </Container>
    )
}

export default Title