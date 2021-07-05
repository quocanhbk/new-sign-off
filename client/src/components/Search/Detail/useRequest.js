import { useQuery } from "react-query"  
import {getRequestDetail} from "api/request"
import useNormalLoading from "hooks/useNormalLoading"
const useRequest = (id, mode) => {
    // const {render, setNotFound, setPercent} = useCustomLoader(true, <Placeholder type="NOT_FOUND"/>)

    const {data, isError} = useQuery(["request", id], () => getRequestDetail(id, mode === "sign"))

    const render = useNormalLoading(false, isError)

    return {data, render}
}

export default useRequest