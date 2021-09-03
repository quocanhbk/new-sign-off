import Participants from "./Participants"
import Header from "./Header"
import { SectionContainer, SubmitConfirmAlert } from "components/Base"
import useCreateProcedure from "./useCreateProcedure"
import { BsPlus } from "react-icons/bs"
import { RouteComponentProps } from "@reach/router"
import { Button, chakra, Flex } from "@chakra-ui/react"
import PrimaryInfo from "./PrimaryInfo"
import AddCheckItemPopup from "./AddCheckItemPopup"
import ProcedureChecklist from "../ProcedureChecklist"
import { ICheckItem } from "api"

interface CreatePageProps extends RouteComponentProps {
    id?: string
}

const CreatePage = ({ id }: CreatePageProps) => {
    const {
        addCheckItem,
        updateCheckItem,
        removeCheckItem,
        addCheckItemPopup,
        setAddCheckItemPopup,
        values,
        setValue,
        errors,
        render,
        submitProcedure,
        submitPopup,
        setSubmitPopup,
        isSubmitting,
        openSubmitPopup,
    } = useCreateProcedure(id)
    const { title, description, advisors, approvers, observators, checklist } = values
    const handleSubmit = (checkItem: ICheckItem) => {
        if (addCheckItemPopup && addCheckItemPopup.mode === "update") {
            updateCheckItem(addCheckItemPopup.id!, checkItem)
        } else addCheckItem(checkItem)
        setAddCheckItemPopup(null)
    }
    return (
        <Flex direction="column" flex={1} h="full" pos="relative">
            {render(
                <>
                    <AddCheckItemPopup
                        isOpen={!!addCheckItemPopup}
                        onClose={() => setAddCheckItemPopup(null)}
                        onSubmit={handleSubmit}
                        mode={addCheckItemPopup?.mode || ""}
                        initialData={
                            addCheckItemPopup?.mode === "update"
                                ? {
                                      name: checklist.find(cItem => cItem.id === addCheckItemPopup.id)!.name,
                                      forms: checklist
                                          .find(cItem => cItem.id === addCheckItemPopup.id)!
                                          .defaultForms.map(form => form.id),
                                  }
                                : undefined
                        }
                    />
                    <SubmitConfirmAlert
                        isOpen={submitPopup}
                        onClose={() => setSubmitPopup(false)}
                        title={`Create procedure`}
                        description={
                            <span>
                                Are you sure to create{" "}
                                <chakra.span color="fill.light" fontWeight="semibold">
                                    {values.title}
                                </chakra.span>
                            </span>
                        }
                        onConfirm={submitProcedure}
                        isLoading={isSubmitting}
                    />
                    <Header onSubmit={openSubmitPopup} id={id} />
                    <Flex flex={1} w="full" justify="center">
                        <Flex h="full" w="full" maxW="60rem" p={4} overflow="auto" position="relative">
                            <Flex flex={1} direction="column">
                                <SectionContainer title="Primary Information">
                                    <PrimaryInfo
                                        title={title}
                                        description={description}
                                        set={setValue}
                                        errors={errors}
                                    />
                                </SectionContainer>
                                <SectionContainer title="Participants">
                                    <Participants
                                        advisors={advisors}
                                        approvers={approvers}
                                        observators={observators}
                                        setValue={setValue}
                                    />
                                </SectionContainer>
                            </Flex>
                            <Flex flex={1} direction="column" ml={4}>
                                {/* SECTION CHECKLIST ATTACHMENT */}
                                <SectionContainer title="Attachment Checklist">
                                    {/* <AttachmentChecklist checklist={checklist} util={checklistUtil} /> */}
                                    {checklist.length > 0 ? (
                                        <ProcedureChecklist
                                            checklist={checklist}
                                            onDeleteCheckItem={removeCheckItem}
                                            onUpdateClick={checkItemId =>
                                                setAddCheckItemPopup({ mode: "update", id: checkItemId })
                                            }
                                        />
                                    ) : null}
                                    <Button
                                        leftIcon={<BsPlus size="1.2rem" />}
                                        w="full"
                                        onClick={() => setAddCheckItemPopup({ mode: "add" })}
                                        mt={2}
                                    >
                                        Add Check Item
                                    </Button>
                                </SectionContainer>
                            </Flex>
                        </Flex>
                    </Flex>
                </>
            )}
        </Flex>
    )
}

export default CreatePage
