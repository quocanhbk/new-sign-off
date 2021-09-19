import { memo } from "react"
import { FormControl, TeamsCalendar, Select, MultipleSelect } from "components/Base"
import { IProject, priorityList, projectList } from "constant"
import { Flex, Input } from "@chakra-ui/react"
import { IProcedureList, IRequestInput } from "api"

// I use memo so i need to pass separate properties instead of a whole "values" object
interface PrimaryInfoProps
    extends Pick<IRequestInput, "title" | "type" | "procedure" | "priority" | "deadline" | "relatedProjects"> {
    setValue: (field: keyof Omit<IRequestInput, "status">, value: any) => void
    errors: Record<keyof Omit<IRequestInput, "status">, string>
    procedureList: IProcedureList | undefined
}

const PrimaryInfo = ({
    title,
    deadline,
    priority,
    relatedProjects,
    procedure,
    setValue,
    errors,
    procedureList,
}: PrimaryInfoProps) => {
    const calculatedProcedureList = procedureList ? [...procedureList, { id: 0, title: "Flexible" }] : []

    return (
        <Flex direction="column">
            <FormControl label="Document Title" error={errors.title}>
                <Input
                    value={title}
                    onChange={e => setValue("title", e.target.value)}
                    placeholder="Input document title..."
                    spellCheck="false"
                />
            </FormControl>
            <Flex justify="space-between">
                <FormControl label="Procedure" error={errors.procedure}>
                    <Select
                        selection={calculatedProcedureList}
                        value={calculatedProcedureList.find(p => p.id === procedure)}
                        onSelect={newValue => setValue("procedure", newValue.id)}
                        displayField={"title"}
                        searchable
                    />
                </FormControl>
            </Flex>
            <Flex justify="space-between">
                <FormControl label={"Priority"} mr={4}>
                    <Select
                        selection={priorityList}
                        value={priorityList.find(p => p.id === priority)}
                        onSelect={newValue => setValue("priority", newValue.id)}
                    />
                </FormControl>
                <FormControl label={"Deadline"} error={errors.deadline} mr={4}>
                    <TeamsCalendar value={deadline as string | null} onChange={v => setValue("deadline", v)} />
                </FormControl>
                <FormControl label={"Related Project"} error={errors.relatedProjects}>
                    <MultipleSelect
                        selection={projectList}
                        // value={projectList.filter(p => values.relatedProjects.includes(p.id))}
                        value={relatedProjects.map(id => projectList.find(project => project.id === id) as IProject)}
                        onSelect={newValue =>
                            setValue(
                                "relatedProjects",
                                newValue.map(_ => _.id)
                            )
                        }
                    />
                </FormControl>
            </Flex>
        </Flex>
    )
}

export default memo(PrimaryInfo)
