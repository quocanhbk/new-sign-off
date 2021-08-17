/* eslint-disable react/prop-types */
import styled from "styled-components"

const Container = styled.div`
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
`

const DocumentTitle = styled.h2`
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 500;
    flex: 1;
`

const QRCodeDisplay = styled.div`
    right: 0.5cm;
    top: 0.5cm;
`

const Title = ({ qrCode, title }) => {
    return (
        <Container>
            <DocumentTitle>{title}</DocumentTitle>
            <QRCodeDisplay>
                <img src={qrCode} width={56} height={56} alt="qrcode" onLoad={() => window.print()} />
            </QRCodeDisplay>
        </Container>
    )
}

export default Title
