/* eslint-disable react/prop-types */
import { Box, Button, Flex, Heading } from "@chakra-ui/react"

const Header = ({ mode, openSubmit, openDraft }) => {
    return (
        <Flex justify="space-between" align="center" px={4} py={4} shadow="sm">
            <Heading size="md" color="fill.light">
                {mode === "create"
                    ? "Create New Approval Document"
                    : mode === "draft"
                    ? "Edit Draft Document"
                    : "Edit Revising Document"}
            </Heading>
            <Box>
                {mode !== "revise" && (
                    <Button onClick={openDraft} variant="ghost">
                        Save Draft
                    </Button>
                )}
                <Button onClick={openSubmit} ml={4}>
                    Submit
                </Button>
            </Box>
        </Flex>
    )
}

export default Header
