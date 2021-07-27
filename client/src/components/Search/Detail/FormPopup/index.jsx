/* eslint-disable react/prop-types */
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import Button from "components/Base/Button"
import FormControl from "components/FormControl"
import React, { useState } from "react"
import { BsDownload } from "react-icons/bs"
import styled from "styled-components"
import { getFader } from "utils/color"
import DocContent from "./DocContent"
import Slider from "components/Slider"
import ButtonGroup from "components/Base/ButtonGroup"
import useClickOutside from "hooks/useClickOutside"
import { downloadForm3 } from "api/file"
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    border: 2px solid ${(props) => props.theme.color.border.primary};
    overflow: hidden;
    border-radius: 0.5rem;
    background: ${(props) => props.theme.color.background.primary};
`
const DocWrapper = styled.div`
    flex: 1;
    position: relative;
    overflow: overlay;
    ::-webkit-scrollbar {
        width: 0.5rem;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: ${(props) =>
            getFader(props.theme.color.fill.secondary, 0.5)};
        border-radius: 99px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: ${(props) => props.theme.color.fill.secondary};
    }
`
const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    font-weight: 500;
    border-bottom: 1px solid ${(props) => props.theme.color.border.primary};
`
const BtnContainer = styled.div`
    display: flex;
    & > * + * {
        margin-left: 0.5rem;
    }
`
const QrPopup = styled.div`
    position: absolute;
    min-height: 5rem;
    min-width: 20rem;
    background: ${(props) => props.theme.color.background.primary};
    border: 1px solid ${(props) => props.theme.color.fill.primary};
    z-index: 5;
    top: 1rem;
    right: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
`
const FormPopup = ({ attachment, requestId, isApproved }) => {
    const [popup, setPopup] = useState(false)
    const [size, setSize] = useState(48)
    const [position, setPosition] = useState("right")
    const ref = useClickOutside(() => setPopup(false))
    return (
        <Container>
            <Title>
                <p>{attachment.name}</p>
                <BtnContainer>
                    <Button
                        padding="0.2rem 0.4rem"
                        type="ghost"
                        gap="0.4rem"
                        color="info"
                        fontSize="0.9rem"
                        onClick={() =>
                            downloadForm3({
                                name: attachment.name,
                                file: attachment.file,
                                fields: attachment.fields,
                                requestId,
                                isApproved: false,
                            })
                        }
                    >
                        <BsDownload />
                        <p>Original</p>
                    </Button>
                    {isApproved && (
                        <Button
                            padding="0.2rem 0.4rem"
                            type="ghost"
                            gap="0.4rem"
                            color="info"
                            fontSize="0.9rem"
                            onClick={() => setPopup(true)}
                        >
                            <BsDownload />
                            <p>Stamped</p>
                        </Button>
                    )}
                </BtnContainer>
            </Title>
            <DocWrapper>
                {popup && (
                    <QrPopup ref={ref}>
                        <FormControl headline="QR stamp size">
                            <Slider
                                step={1}
                                min={24}
                                max={72}
                                value={size}
                                onChange={(newValue) => setSize(newValue)}
                            />
                        </FormControl>
                        <FormControl headline="QR stamp position">
                            <ButtonGroup
                                value={position}
                                onSelect={(newValue) => setPosition(newValue)}
                            >
                                <Button value="left">Left</Button>
                                <Button value="right">Right</Button>
                            </ButtonGroup>
                        </FormControl>
                        <Button
                            fullWidth
                            type="fade"
                            onClick={() =>
                                downloadForm3({
                                    name: attachment.name,
                                    file: attachment.file,
                                    fields: attachment.fields,
                                    position,
                                    size,
                                    requestId,
                                    isApproved: true,
                                })
                            }
                        >
                            Download
                        </Button>
                    </QrPopup>
                )}
                <DocContent attachment={attachment} />
            </DocWrapper>
        </Container>
    )
}

export default FormPopup
