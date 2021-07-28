/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import ControlledCombox from "components/ControlledCombox"
import FormControl from "components/FormControl"
import { useStoreState } from "easy-peasy"
import { useQuery } from "react-query"
import { getPositions } from "api/position"
import { navigate } from "@reach/router"
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
        color: ${(props) => props.theme.color.text.secondary};
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
const Participants = ({ advisors, approvers, observators, set }) => {
    const toProper = (str) => {
        return str
            .split(" ")
            .map((word) => word[0] + word.slice(1, word.length).toLowerCase())
            .join(" ")
    }

    const users = useStoreState((s) => s.users)
    const { data } = useQuery("positions", () => getPositions(), {
        onError: () => navigate("/procedure"),
    })
    const [mappedData, setMappedData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (data) {
            setMappedData(
                data.map((d) => ({
                    ...d,
                    display: (
                        <Tag2
                            name={toProper(
                                users.find((user) => user.id === d.userId).name
                            )}
                            title={d.title}
                        />
                    ),
                    name: users.find((user) => user.id === d.userId).name,
                    email: users.find((user) => user.id === d.userId).email,
                }))
            )
            setLoading(false)
        }
    }, [data])
    return !loading ? (
        <Container>
            <FormControl
                headline={"Advisor List"}
                errorText={
                    advisors.some((v) =>
                        approvers.concat(observators).includes(v)
                    ) && "Duplicate"
                }
            >
                <ControlledCombox
                    multiple
                    searchable
                    selection={mappedData}
                    value={advisors.map((id) =>
                        mappedData.find((user) => user.id === id)
                    )}
                    onSelect={(newValue) => {
                        set(
                            "advisors",
                            newValue.map((_) => _.id)
                        )
                    }}
                    displayField={"display"}
                />
            </FormControl>
            <FormControl
                headline={"Approver List"}
                errorText={
                    approvers.some((v) =>
                        advisors.concat(observators).includes(v)
                    ) && "Duplicate"
                }
            >
                <ControlledCombox
                    multiple
                    searchable
                    selection={mappedData}
                    value={approvers.map((id) =>
                        mappedData.find((user) => user.id === id)
                    )}
                    onSelect={(newValue) =>
                        set(
                            "approvers",
                            newValue.map((_) => _.id)
                        )
                    }
                    displayField={"display"}
                />
            </FormControl>
            <FormControl
                headline={"Observator List"}
                errorText={
                    observators.some((v) =>
                        approvers.concat(advisors).includes(v)
                    ) && "Duplicate"
                }
            >
                <ControlledCombox
                    multiple
                    searchable
                    selection={mappedData}
                    value={observators.map((id) =>
                        mappedData.find((user) => user.id === id)
                    )}
                    onSelect={(newValue) =>
                        set(
                            "observators",
                            newValue.map((_) => _.id)
                        )
                    }
                    displayField={"display"}
                />
            </FormControl>
        </Container>
    ) : null
}

export default Participants
