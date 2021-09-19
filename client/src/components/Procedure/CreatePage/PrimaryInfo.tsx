import FormControl from "components/Base/FormControl"
import { Box, Input } from "@chakra-ui/react"
import { IProcedureInput } from "api"
import { useQuery } from "react-query"
import { getDepartments, IDepartment } from "api/department"
import { MultipleSelect } from "components/Base"

interface PrimaryInfoProps {
    values: IProcedureInput
    set: (field: keyof IProcedureInput, value: any) => void
    errors: Record<keyof IProcedureInput, string>
}

const PrimaryInfo = ({ values, set, errors }: PrimaryInfoProps) => {
    const { title, description, type, departments } = values
    const { data } = useQuery("departments", getDepartments, {
        initialData: [],
    })
    return (
        <Box>
            <FormControl label="Title" error={errors.title}>
                <Input value={title} onChange={e => set("title", e.target.value)} spellCheck="false" />
            </FormControl>
            <FormControl label="Description">
                <Input value={description} onChange={e => set("description", e.target.value)} spellCheck="false" />
            </FormControl>
            <FormControl label="Type">
                <Input value={type} onChange={e => set("type", e.target.value)} spellCheck="false" />
            </FormControl>
            {data && (
                <FormControl label="Departments">
                    <MultipleSelect
                        searchable
                        selection={data}
                        value={departments.map(
                            departmentId => data.find(department => department.id === departmentId) as IDepartment
                        )}
                        onSelect={newDepartments =>
                            set(
                                "departments",
                                newDepartments.map(d => d.id)
                            )
                        }
                        displayField="name"
                    />
                </FormControl>
            )}
        </Box>
    )
}

export default PrimaryInfo
