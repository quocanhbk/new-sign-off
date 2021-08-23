import { BsChevronLeft } from "react-icons/bs"
import { navigate, RouteComponentProps } from "@reach/router"
import { Box, Flex, Grid, Heading, IconButton } from "@chakra-ui/react"
import { FormView } from "components/Base"
import useCreateForm from "./useCreateForm"
import FileUpload from "./FileUpload"
interface CreatePageProps extends RouteComponentProps {
    id?: string
}

const CreatePage = ({ id }: CreatePageProps) => {
    const { attachment, render, saveForm, init, isSubmitting } = useCreateForm(id)
    return (
        <Flex h="full" w="full" direction="column" pos="relative">
            {render(
                <>
                    <Flex p={4} align="center" borderBottom="1px" borderColor="gray.200">
                        <IconButton
                            icon={<BsChevronLeft size="1.2rem" />}
                            aria-label="go-back"
                            onClick={() => navigate("/form")}
                            rounded="full"
                            variant="ghost"
                        />
                        <Heading ml={2} color="fill.light" fontWeight="semibold">
                            {id ? "Edit Form" : "Create Form"}
                        </Heading>
                    </Flex>
                    <Box flex={1} overflow="overlay" pos="relative">
                        {attachment.file ? (
                            <FormView
                                attachment={attachment}
                                onSave={saveForm}
                                addable={true}
                                isSaving={isSubmitting}
                            />
                        ) : !id ? (
                            <Grid h="full" w="full" placeItems="center">
                                <FileUpload onSubmit={init} />
                            </Grid>
                        ) : null}
                    </Box>
                </>
            )}
        </Flex>
    )
}

export default CreatePage
