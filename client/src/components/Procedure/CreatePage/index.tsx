import { useState } from "react"
import styled, { css } from "styled-components"
import { getFader } from "utils/color"
import Participants from "./Participants"
import Snackbar from "components/Snackbar"
import PrimaryInfo from "./PrimaryInfo"
import Header from "./Header"
import SectionContainer from "components/SectionContainer"
import useCreateProcedure from "../useCreateProcedure"
import AttachmentChecklist from "./AttachmentChecklist"
import { BsPlus, BsFillExclamationTriangleFill } from "react-icons/bs"
import { RouteComponentProps } from "@reach/router"

const StyleContainer = styled.div`
    flex: 10;
    display: flex;
    flex-direction: column;
    border-left: 1px solid ${props => props.theme.color.border.primary};
    height: 100%;
    position: relative;
`
const ContainerItems = styled.div`
    flex: 1;
    display: flex;
    & > * + * {
        margin-left: 1rem;
    }
    padding: 1rem;
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
const Column = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    & > * + * {
        margin-top: 1rem;
    }

    ${props =>
        props.borderLeft &&
        css`
            border-left: 1px solid ${props => props.theme.color.border.primary};
            padding-left: 1rem;
        `}
`
const Notify = styled.div`
    padding: 1rem;
    background: ${props => props.theme.color.fill.danger};
    color: ${props => props.theme.color.background.primary};
    display: flex;
    align-items: center;
    & > * + * {
        margin-left: 0.5rem;
    }
    border-radius: 0.5rem;
`
const AddCheckListWrapper = styled.div`
    padding: 0;
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0 2rem 0;
`
interface CreatePageProps extends RouteComponentProps {
    id?: string
}

const CreatePage = ({ id }: CreatePageProps) => {
    const {
        title,
        description,
        advisors,
        approvers,
        observators,
        checklist,
        checklistUtil,
        set,
        error,
        isSubmittable,
        submitProcedure,
        render,
    } = useCreateProcedure(id)

    const [errorNotify, setErrorNotify] = useState(false)

    const handleSubmit = () => {
        if (!isSubmittable()) setErrorNotify(true)
        else submitProcedure()
    }

    return (
        <StyleContainer>
            {render(
                <>
                    <Header onSubmit={handleSubmit} id={id} />
                    <ContainerItems>
                        <Column>
                            {/* SECTION PRIMARY INFO */}
                            <SectionContainer headline="Primary Information" haveBorder>
                                <PrimaryInfo title={title} description={description} set={set} error={error} />
                            </SectionContainer>

                            {/* SECTION PARTICIPANTS */}
                            <SectionContainer headline="Participants" haveBorder>
                                <Participants
                                    advisors={advisors}
                                    approvers={approvers}
                                    observators={observators}
                                    set={set}
                                />
                            </SectionContainer>
                        </Column>
                        <Column borderLeft>
                            {/* SECTION CHECKLIST ATTACHMENT */}
                            <SectionContainer headline="Attachment Checklist" haveBorder>
                                <AttachmentChecklist checklist={checklist} util={checklistUtil} />
                                <AddCheckListWrapper>
                                    <button onClick={() => checklistUtil.addCheckItem()}>
                                        <BsPlus size="1.2rem" /> Add Check Item
                                    </button>
                                </AddCheckListWrapper>
                            </SectionContainer>
                        </Column>
                    </ContainerItems>
                </>
            )}

            <Snackbar visible={errorNotify} onClose={() => setErrorNotify(false)} timeOut={2000}>
                <Notify>
                    <BsFillExclamationTriangleFill size="1.2rem" />
                    <p>Please fix all fields before submitting!</p>
                </Notify>
            </Snackbar>
        </StyleContainer>
    )
}

export default CreatePage
