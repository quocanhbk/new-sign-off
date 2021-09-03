import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { deleteProcedure, getProcedureDetail, toggleActive } from "api/procedure"
import { useChakraToast, useGetPositions, useGetUsers, useLoader } from "hooks"
import { Id } from "types"
import { IPosition } from "api"
import { PositionTag } from "components/Base"
import { navigate } from "@reach/router"

const useProcedure = (id: Id) => {
    const toast = useChakraToast()
    const queryClient = useQueryClient()
    const { render, setNotFound, setIsLoading } = useLoader()
    const [deletePopup, setDeletePopup] = useState(false)
    const [mappedPosition, setMappedData] = useState<
        (Pick<IPosition, "title" | "userId" | "id"> & { display: JSX.Element })[]
    >([])

    // * QUERY: get users
    const [users] = useGetUsers()
    // * QUERY: get procedure detail
    const { data, isLoading } = useQuery(["procedure", id], () => getProcedureDetail(id), {
        onError: () => setNotFound(true),
    })

    useEffect(() => {
        setIsLoading(isLoading)
    }, [isLoading, setIsLoading])

    // * MUTATE: toggle procedure
    const { mutate: mutateToggleActive } = useMutation<unknown, unknown, boolean>(v => toggleActive(id, v), {
        onSettled: () => {
            queryClient.invalidateQueries("procedure")
            queryClient.invalidateQueries("procedures")
        },
    })

    // * QUERY: get positions
    const [, isGettingPosition] = useGetPositions({
        enabled: !!users,
        onSuccess: data =>
            setMappedData(
                data.map(d => ({
                    ...d,
                    display: <PositionTag name={users!.find(user => user.id === d.userId)!.name} jobTitle={d.title} />,
                }))
            ),
    })

    // * MUTATION: delete procedure
    const { mutate: mutateDeleteProcedure } = useMutation(() => deleteProcedure(id), {
        onError: () => {
            toast({ status: "error", title: "Failed to delete procedure!", description: "Try again later" })
        },
        onSuccess: () => {
            toast({ status: "success", title: "Delete procedure successfully!" })
            navigate("/procedure")
        },
    })

    return {
        data,
        render,
        mutateToggleActive,
        deletePopup,
        setDeletePopup,
        mutateDeleteProcedure,
        isGettingPosition,
        mappedPosition,
    }
}

export default useProcedure
