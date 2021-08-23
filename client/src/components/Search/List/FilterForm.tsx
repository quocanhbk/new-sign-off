import { priorityList, approvalTypeList, projectList } from "constant"
import { Select, FormControl } from "components/Base"
import { Box, Flex, Heading } from "@chakra-ui/react"
import { RequestQuery, RequestQueryKey } from "./useRequestQuery"

const statusSelection = [
    { id: "Draft", text: "Draft" },
    { id: "Pending", text: "Pending" },
    { id: "Approved", text: "Approved" },
    { id: "Rejected", text: "Rejected" },
    { id: "Revising", text: "Revising" },
]
const sortSelection = [
    { id: "updated_at", text: "Updated Time" },
    { id: "created_at", text: "Created Time" },
    { id: "deadline", text: "Deadline" },
]
const sortOrderSelection = [
    { id: "asc", text: "Ascending" },
    { id: "desc", text: "Descending" },
]

interface FilterFormProps {
    query: RequestQuery
    setQueryParam: (field: RequestQueryKey, value: string | null, text: string) => void
}

const FilterForm = ({ query, setQueryParam }: FilterFormProps) => {
    return (
        <Box w="16rem">
            <Box p={2}>
                <Heading size="sm" fontWeight="bold" color="fill.light">
                    View Setting
                </Heading>
            </Box>
            <Flex direction="column" p={2}>
                <FormControl label="Status">
                    <Select
                        removable={true}
                        selection={statusSelection}
                        value={statusSelection.find(q => q.id === query.status.value)}
                        onSelect={v => setQueryParam("status", v?.id?.toString() || null, v?.text || "")}
                    />
                </FormControl>
                <FormControl label="Approval Type">
                    <Select
                        removable={true}
                        selection={approvalTypeList}
                        value={approvalTypeList.find(q => q.id === query.type.value)}
                        onSelect={v => setQueryParam("type", v?.id?.toString() || null, v?.text || "")}
                    />
                </FormControl>
                <FormControl label="Priority">
                    <Select
                        removable={true}
                        selection={priorityList}
                        value={priorityList.find(q => q.id === query.priority.value)}
                        onSelect={v => setQueryParam("priority", v?.id?.toString() || null, v?.text || "")}
                    />
                </FormControl>
                <FormControl label="Project">
                    <Select
                        removable={true}
                        selection={projectList}
                        value={projectList.find(q => q.id === query.project.value)}
                        onSelect={v => setQueryParam("project", v?.id?.toString() || null, v?.text || "")}
                    />
                </FormControl>
                <FormControl label="Sort By">
                    <Select
                        selection={sortSelection}
                        value={sortSelection.find(s => s.id === query.sortBy.value)}
                        onSelect={v => setQueryParam("sortBy", v.id?.toString() || null, v.id?.toString() || "")}
                    />
                </FormControl>
                <FormControl label="Sort Order">
                    <Select
                        selection={sortOrderSelection}
                        value={sortOrderSelection.find(s => s.id === query.sortOrder.value)}
                        onSelect={v => setQueryParam("sortOrder", v.id?.toString() || null, v.id?.toString() || "")}
                    />
                </FormControl>
            </Flex>
        </Box>
    )
}

export default FilterForm
