import { Flex } from "@chakra-ui/react"
import { navigate } from "@reach/router"
import { getPositions, getUsers, IPosition, IProcedureInput } from "api"
import { FormControl, MultipleSelect, PositionTag } from "components/Base"
import { useState } from "react"
import { useQuery } from "react-query"
import { Id } from "types"
interface ParticipantsProps {
    advisors: Id[]
    approvers: Id[]
    observators: Id[]
    setValue: (field: keyof IProcedureInput, value: any) => void
}

type PostitionItem = Pick<IPosition, "title" | "id" | "userId"> & { name: string; email: string; display: JSX.Element }

const Participants = ({ advisors, approvers, observators, setValue }: ParticipantsProps) => {
    const toProper = str => {
        return str
            .split(" ")
            .map(word => word[0] + word.slice(1, word.length).toLowerCase())
            .join(" ")
    }
    const { data: users } = useQuery("users", () => getUsers())
    const { isLoading } = useQuery("positions", () => getPositions(), {
        enabled: !!users,
        onSuccess: data =>
            setMappedData(
                data.map(d => ({
                    ...d,
                    display: (
                        <PositionTag
                            name={toProper(users!.find(user => user.id === d.userId)!.name)}
                            jobTitle={d.title}
                        />
                    ),
                    name: users!.find(user => user.id === d.userId)!.name,
                    email: users!.find(user => user.id === d.userId)!.email,
                }))
            ),
        onError: () => navigate("/procedure"),
    })
    const [mappedData, setMappedData] = useState<PostitionItem[]>([])

    return !isLoading ? (
        <Flex direction="column">
            <FormControl
                label={"Advisor List"}
                error={advisors.some(v => approvers.concat(observators).includes(v)) ? "Duplicate" : ""}
            >
                <MultipleSelect
                    searchable
                    selection={mappedData}
                    value={advisors.map(id => mappedData.find(user => user.id === id) as PostitionItem)}
                    onSelect={newValue => {
                        setValue(
                            "advisors",
                            newValue.map(_ => _.id)
                        )
                    }}
                    displayField={"display"}
                />
            </FormControl>
            <FormControl
                label={"Approver List"}
                error={approvers.some(v => advisors.concat(observators).includes(v)) ? "Duplicate" : ""}
            >
                <MultipleSelect
                    searchable
                    selection={mappedData}
                    value={approvers.map(id => mappedData.find(user => user.id === id) as PostitionItem)}
                    onSelect={newValue =>
                        setValue(
                            "approvers",
                            newValue.map(_ => _.id)
                        )
                    }
                    displayField={"display"}
                />
            </FormControl>
            <FormControl
                label={"Observator List"}
                error={observators.some(v => approvers.concat(advisors).includes(v)) ? "Duplicate" : ""}
            >
                <MultipleSelect
                    searchable
                    selection={mappedData}
                    value={observators.map(id => mappedData.find(user => user.id === id) as PostitionItem)}
                    onSelect={newValue =>
                        setValue(
                            "observators",
                            newValue.map(_ => _.id)
                        )
                    }
                    displayField={"display"}
                />
            </FormControl>
        </Flex>
    ) : null
}

export default Participants
