import NormalLoader from "components/NormalLoader"
import Placeholder from "components/Placeholder"
const useNormalLoading = (isFetching: boolean, isError: boolean) => {
    const render = (body: JSX.Element | JSX.Element[] | null | undefined) => {
        return (
            <>
                {isFetching && <NormalLoader />}
                {isError ? <Placeholder type="NOT_FOUND" /> : body}
            </>
        )
    }
    return render
}

export default useNormalLoading
