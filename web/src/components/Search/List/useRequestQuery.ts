/* eslint-disable no-unused-vars */
import useFormCore from "hooks/useFormCore"

export type RequestQueryProps = { value: string | null; text: string; hidden: boolean }
export type RequestQueryKey =
    | "title"
    | "priority"
    | "status"
    | "createdBy"
    | "project"
    | "type"
    | "sortBy"
    | "sortOrder"
export type RequestQuery = Record<RequestQueryKey, RequestQueryProps>
const initState: RequestQuery = {
    title: { value: "", text: "", hidden: true },
    priority: { value: null, text: "", hidden: false },
    status: { value: null, text: "", hidden: false },
    createdBy: { value: null, text: "", hidden: false },
    project: { value: null, text: "", hidden: false },
    type: { value: null, text: "", hidden: false },
    sortBy: { value: "updated_at", text: "updated_at", hidden: true },
    sortOrder: { value: "desc", text: "desc", hidden: true },
}

const useRequestQuery = () => {
    const { values: query, setValue } = useFormCore<RequestQuery>(initState)

    const setQueryParam = (field: RequestQueryKey, value: string | null, text: string) => {
        setValue(field, { ...query[field], value, text })
    }

    const onChangeTitleSearch = (text: string) => setQueryParam("title", text, text)

    return {
        query,
        queryString: Object.entries(query)
            .filter(([, s]) => s.value !== null)
            .map(([key, s]) => `${key}=${s.value}`)
            .join("&"),
        setQueryParam,
        onChangeTitleSearch,
        queryTags: Object.entries(query)
            .filter(([, s]) => !s.hidden && s.value !== null)
            .map(([key, s]) => ({
                key: key,
                text: `${s.text}`,
                onClick: () => setQueryParam(key as RequestQueryKey, null, ""),
            })),
    }
}

export default useRequestQuery
