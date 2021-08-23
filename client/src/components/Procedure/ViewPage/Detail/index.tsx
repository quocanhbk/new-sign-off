import Header from "./Header"
import { SectionContainer, FormControl, SubmitConfirmAlert, MultipleSelect } from "components/Base"
import { navigate, RouteComponentProps } from "@reach/router"
import ProcedureChecklist from "../../ProcedureChecklist"
import useProcedure from "./useProcedure"
import { Flex } from "@chakra-ui/react"
interface DetailProps extends RouteComponentProps {
    id?: string
}

const Detail = ({ id }: DetailProps) => {
    const onEditClick = () => {
        navigate("/procedure/create/" + id)
    }

    const {
        data: procedure,
        render,
        deletePopup,
        isGettingPosition,
        mappedPosition,
        mutateDeleteProcedure,
        mutateToggleActive,
        setDeletePopup,
    } = useProcedure(id!)
    return (
        <Flex direction="column" h="full" pos="relative">
            {render(
                procedure && !isGettingPosition ? (
                    <>
                        <SubmitConfirmAlert
                            isOpen={deletePopup}
                            onClose={() => setDeletePopup(false)}
                            title={`Delete ${procedure.title}`}
                            onConfirm={mutateDeleteProcedure}
                            color="red"
                        />
                        <Header
                            title={procedure.title}
                            isActive={procedure.isActive}
                            onDeleteClick={() => setDeletePopup(true)}
                            onEditClick={onEditClick}
                            onToggleActive={mutateToggleActive}
                        />
                        <Flex flex={1} w="full" justify="center">
                            <Flex direction="column" w="full" h="full" p={4} maxW="48rem">
                                <SectionContainer title={"Description"}>{procedure.description}</SectionContainer>
                                <SectionContainer title="Participants">
                                    <FormControl label={"Advisor List"}>
                                        <MultipleSelect
                                            selection={mappedPosition}
                                            value={mappedPosition.filter(u =>
                                                procedure.advisors.map(a => a.id).includes(u.id)
                                            )}
                                            displayField={"display"}
                                            readOnly
                                        />
                                    </FormControl>
                                    <FormControl label={"Approver List"}>
                                        <MultipleSelect
                                            selection={mappedPosition}
                                            value={mappedPosition.filter(u =>
                                                procedure.approvers.map(a => a.id).includes(u.id)
                                            )}
                                            displayField={"display"}
                                            readOnly
                                        />
                                    </FormControl>
                                    <FormControl label={"Observator List"}>
                                        <MultipleSelect
                                            selection={mappedPosition}
                                            value={mappedPosition.filter(u =>
                                                procedure.observators.map(a => a.id).includes(u.id)
                                            )}
                                            displayField={"display"}
                                            readOnly
                                        />
                                    </FormControl>
                                </SectionContainer>
                                <SectionContainer title="Checklist">
                                    <ProcedureChecklist checklist={procedure.checklist} />
                                </SectionContainer>
                            </Flex>
                        </Flex>
                    </>
                ) : null
            )}
        </Flex>
    )
}

export default Detail
