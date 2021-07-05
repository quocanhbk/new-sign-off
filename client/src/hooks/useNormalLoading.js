import React from 'react'
import NormalLoader from 'components/NormalLoader'
import Placeholder from 'components/Placeholder'
const useNormalLoading = (isFetching, isError) => {
    const render = (body) => {
        return (
            <>
            {isFetching && <NormalLoader/>}
            {isError ? <Placeholder type="NOT_FOUND"/> : body}
            </>
        )
    }
    return render
}

export default useNormalLoading