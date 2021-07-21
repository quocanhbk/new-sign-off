/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { deleteProcedure } from "api/procedure"
import ContentHeader from "./ContentHeader"
import SectionContainer from "components/SectionContainer"
import FormControl from "components/FormControl"
import { useStoreState } from "easy-peasy"
import ControlledCombox from "components/ControlledCombox"
import { navigate } from "@reach/router"
import Snackbar from "components/Snackbar"
import { BsFillExclamationTriangleFill } from "react-icons/bs"
import Checklist from "./Checklist"
import useProcedure from "./useProcedure"
import { useQuery } from "react-query"
import { getPositions } from "api/position"
const Container = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
`
const ParticipantsContainer = styled.div`
    display: flex;
    flex-direction: column;
    & > * + * {
        margin-top: 0.5rem;
    }
`
const Body = styled.div`
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    & > * + * {
        margin-top: 1rem;
    }
`
const Notify = styled.div`
    padding: 1rem;
    background: ${(props) => props.theme.color.fill.danger};
    color: ${(props) => props.theme.color.background.primary};
    display: flex;
    align-items: center;
    & > * + * {
        margin-left: 0.5rem;
    }
    border-radius: 0.5rem;
`
const TagContainer2 = styled.div`
    display: flex;
    flex-direction: column;
    & img {
        height: 1.5rem;
        border-radius: 99px;
        margin-right: 0.5rem;
    }
    & .job-title {
        margin-bottom: 0rem;
    }
    & .avt-name {
        display: flex;
        align-items: center;
        color: ${(props) => props.theme.color.text.secondary};
        font-size: 0.8rem;
    }
`
const Tag2 = ({ title, userId }) => {
    const toProper = (str) => {
        return str
            .split(" ")
            .map((word) => word[0] + word.slice(1, word.length).toLowerCase())
            .join(" ")
    }
    const users = useStoreState((s) => s.users)
    return (
        <TagContainer2>
            <p className="job-title">{title}</p>
            <p className="avt-name">
                {toProper(users.find((user) => user.id === userId).name)}
            </p>
        </TagContainer2>
    )
}
const Detail = ({ id }) => {
    const [notify, setNotify] = useState(false)
    const { data, isLoading } = useQuery("positions", () => getPositions())
    const [mappedData, setMappedData] = useState([])
    useEffect(() => {
        if (data)
            setMappedData(
                data.map((d) => ({
                    ...d,
                    display: <Tag2 userId={d.userId} title={d.title} />,
                }))
            )
    }, [data])

    const onDeleteClick = async () => {
        let message = await deleteProcedure(id)
        if (message === "delete-success") navigate("/procedure")
        else setNotify(true)
    }

    const onEditClick = () => {
        navigate("/procedure/create/" + id)
    }

    const { data: procedure, render, onToggleActive } = useProcedure(id)
    return (
        <Container>
            {render(
                procedure && !isLoading && (
                    <>
                        <ContentHeader
                            title={procedure.title}
                            isActive={procedure.isActive}
                            onDeleteClick={onDeleteClick}
                            onEditClick={onEditClick}
                            onToggleActive={onToggleActive}
                        />
                        <Body>
                            <SectionContainer headline={"Description"}>
                                {procedure.description}
                            </SectionContainer>
                            <SectionContainer headline="Participants">
                                <ParticipantsContainer>
                                    <FormControl
                                        headline={"Advisor List"}
                                        readOnly
                                    >
                                        <ControlledCombox
                                            multiple
                                            selection={mappedData}
                                            value={mappedData.filter((u) =>
                                                procedure.advisors
                                                    .map((a) => a.id)
                                                    .includes(u.id)
                                            )}
                                            displayField={"display"}
                                            readOnly
                                        />
                                    </FormControl>
                                    <FormControl
                                        headline={"Approver List"}
                                        readOnly
                                    >
                                        <ControlledCombox
                                            multiple
                                            selection={mappedData}
                                            value={mappedData.filter((u) =>
                                                procedure.approvers
                                                    .map((a) => a.id)
                                                    .includes(u.id)
                                            )}
                                            displayField={"display"}
                                            readOnly
                                        />
                                    </FormControl>
                                    <FormControl
                                        headline={"Observator List"}
                                        readOnly
                                    >
                                        <ControlledCombox
                                            multiple
                                            selection={mappedData}
                                            value={mappedData.filter((u) =>
                                                procedure.observators
                                                    .map((a) => a.id)
                                                    .includes(u.id)
                                            )}
                                            displayField={"display"}
                                            readOnly
                                        />
                                    </FormControl>
                                </ParticipantsContainer>
                            </SectionContainer>
                            <SectionContainer headline="Checklist">
                                <Checklist
                                    checklist={procedure.checklist}
                                    readOnly={true}
                                />
                            </SectionContainer>
                        </Body>
                        <Snackbar
                            visible={notify}
                            onClose={() => setNotify(false)}
                            timeOut={2000}
                        >
                            <Notify>
                                <BsFillExclamationTriangleFill size="1.2rem" />
                                <p>Procedure is currently in use!</p>
                            </Notify>
                        </Snackbar>
                    </>
                )
            )}
        </Container>
    )
}

export default Detail
