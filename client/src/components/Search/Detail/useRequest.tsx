import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import {
    approveRequest,
    cancelRequest,
    deleteRequest,
    getLastSignRequest,
    getRequestDetail,
    IApproveCommmand,
    postComment,
    remindApprove,
} from "api"
import { useChakraToast, useLoader } from "hooks"
import { AttachmentType, Id } from "types"
import { navigate } from "@reach/router"
import { useStoreActions } from "store"
const useRequest = (id: Id, mode: "search" | "sign") => {
    const toast = useChakraToast()
    const queryClient = useQueryClient()
    const { render, setIsLoading, setNotFound } = useLoader()
    const [confirmPopup, setConfirmPopup] = useState<Pick<IApproveCommmand, "code" | "opinionId"> | null>(null)
    const setPath = useStoreActions(action => action.setPath)
    const [popup, setPopup] = useState<"cancel" | "delete" | null>(null)
    const [viewingAttachment, setViewingAttachment] = useState<{ id: Id; type: AttachmentType } | null>(null)

    // * QUERY: GET REQUEST DETAIL
    const { data, isLoading } = useQuery(["request", id], () => getRequestDetail(id, { sign: mode === "sign" }), {
        onError: () => setNotFound(true),
    })
    useEffect(() => {
        setIsLoading(isLoading)
    }, [isLoading, setIsLoading])

    // * MUTATE: POST COMMENT
    const { mutate: mutatePostComment } = useMutation<unknown, unknown, string>(comment => postComment(id, comment), {
        onSuccess: () => queryClient.invalidateQueries(["request", id]),
        onError: () => {
            toast({ status: "error", title: "Failed to comment" })
        },
    })

    // * MUTATE: REMIND APPROVE
    const { mutate: mutateRemindApprove } = useMutation<unknown, unknown, string>(userId => remindApprove(id, userId))

    // * MUTATE: DELETE DRAFT REQUEST
    const { mutate: mutateDeleteDraft } = useMutation(() => deleteRequest(id), {
        onSuccess: () => {
            queryClient.invalidateQueries("requests")
            navigate("/search")
            toast({ status: "success", title: "Delete request successfully" })
        },
        onError: () => {
            toast({ status: "error", title: "Unable to delete request", description: "Try again later" })
        },
    })

    // * MUTATE: CANCEL REQUEST
    const { mutate: mutateCancelRequest } = useMutation<unknown, unknown, string>(reason => cancelRequest(id, reason), {
        onError: () => {
            toast({ status: "error", title: "Unable to cancel request", description: "Try again later" })
        },
        onSuccess: () => {
            queryClient.invalidateQueries("requests")
        },
    })

    // * QUERY: GET LAST SIGN REQUEST
    const { refetch: queryLastSignRequest } = useQuery("last_sign_request", getLastSignRequest, {
        enabled: false,
        onSuccess: id => {
            setPath(`/sign/${id ? id : ""}`)
        },
        onError: () => {
            toast({ status: "error", title: "Unable to approve request", description: "Try again later" })
        },
    })

    // * MUTATE: APPROVE & REJECT
    const { mutate: mutateApproveRequest, isLoading: isApproving } = useMutation<unknown, unknown, IApproveCommmand>(
        command => approveRequest(id, command),
        {
            onError: () => {
                toast({ status: "error", title: "Unable to approve request", description: "Try again later" })
            },
            onSuccess: (_, command) => {
                toast({
                    status: "success",
                    title:
                        command.code === "REJECT" ? "Rejected document successfully" : "Approved document successfully",
                })
                setConfirmPopup(null)
                queryClient.invalidateQueries("requests")
                queryLastSignRequest()
            },
        }
    )

    const mutator = {
        postComment: mutatePostComment,
        remindApprove: mutateRemindApprove,
        approveRequest: mutateApproveRequest,
        cancelRequest: mutateCancelRequest,
        deleteRequest: mutateDeleteDraft,
    }
    return {
        request: data,
        isLoading,
        render,
        mutator,
        confirmPopup,
        setConfirmPopup,
        id,
        mode,
        popup,
        setPopup,
        viewingAttachment,
        setViewingAttachment,
        isApproving,
    }
}

export default useRequest
