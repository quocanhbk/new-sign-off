import { useState } from "react"
import styled from "styled-components"
import FormControl from "components/Base/FormControl"
import MultipleSelect from "components/Base/MultipleSelect"
import { useQuery } from "react-query"
import { getPositions, IPosition } from "api/position"
import { navigate } from "@reach/router"
import { getUsers, IProcedureInput } from "api"
import { Id } from "types"
const Container = styled.div`
    display: flex;
    flex-direction: column;
    & > * + * {
        margin-top: 0.5rem;
    }
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
        color: ${props => props.theme.color.text.secondary};
        font-size: 0.8rem;
    }
`
const Tag2 = ({ title, name }) => {
    return (
        <TagContainer2>
            <p className="job-title">{title}</p>
            <p className="avt-name">{name}</p>
        </TagContainer2>
    )
}

interface Participants {
    advisors: Id[]
    approvers: Id[]
    observators: Id[]
    setValue: (field: keyof IProcedureInput, value: any) => void
}

type PostitionItem = Pick<IPosition, "title" | "id" | "userId"> & { name: string; email: string; display: JSX.Element }

const Participants = ({ advisors, approvers, observators, setValue }: Participants) => {
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
                    display: <Tag2 name={toProper(users!.find(user => user.id === d.userId)!.name)} title={d.title} />,
                    name: users!.find(user => user.id === d.userId)!.name,
                    email: users!.find(user => user.id === d.userId)!.email,
                }))
            ),
        onError: () => navigate("/procedure"),
    })
    const [mappedData, setMappedData] = useState<PostitionItem[]>([])

    return !isLoading ? (
        <Container>
            <FormControl
                label={"Advisor List"}
                error={advisors.some(v => approvers.concat(observators).includes(v)) ? "Duplicate" : ""}
            >
                <MultipleSelect
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
        </Container>
    ) : null
}

export default Participants
