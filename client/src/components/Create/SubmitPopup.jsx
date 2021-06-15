import React from 'react'
import styled from "styled-components";
import Button from '../Button';
const Container = styled.div`

`
const ImgContainer = styled.div``
const ButtonContainer = styled.div`

`
const SubmitPopup = () => {
    return (
        <Container>
            <ImgContainer>
                <img src="/submit.svg" alt=""/>
            </ImgContainer>
            <ButtonContainer>
                <Button>Cancel</Button>
                <Button>Confirm</Button>
            </ButtonContainer>
        </Container>
    )
}

export default SubmitPopup