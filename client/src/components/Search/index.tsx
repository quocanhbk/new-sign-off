import { Box, Flex } from "@chakra-ui/react"
import { Router } from "@reach/router"
import { Placeholder } from "components/Base"
import useMediaQuery from "hooks/useMediaQuery"
import { useEffect, useState } from "react"
import { useStoreActions } from "store"
import { ViewMode } from "types"
import Detail from "./Detail"
import List from "./List"
import useRequests from "./useRequests"

interface SearchPageProps {
    mode: ViewMode
}

const Search = ({ mode }: SearchPageProps) => {
    let device = useMediaQuery()
    const setPath = useStoreActions(action => action.setPathNoNavigate)
    const [scroll, setScroll] = useState(0)
    useEffect(() => {
        setPath(`/${mode}`)
    }, [setPath, mode])
    // place hook out here so it won't be re-created on mobile
    const useRequestsHook = useRequests({ mode })
    return (
        <Flex w="full" h="full" className="search-page">
            {device === "PC" ? (
                <>
                    <List mode={mode} useRequestsHook={useRequestsHook} />
                    <Box flex={2} pos="relative" h="full" borderLeft="1px" borderColor="gray.200">
                        <Router style={{ height: "100%" }}>
                            <Detail path="/:id" mode={mode} />
                            <Placeholder type="REQUEST_NOT_SELECTED" default />
                        </Router>
                    </Box>
                </>
            ) : (
                <Box flex={2} pos="relative" h="full" borderLeft="1px" borderColor="gray.200">
                    <Router style={{ height: "100%" }}>
                        <Detail path="/:id" mode={mode} />
                        <List
                            mode={mode}
                            default
                            scroll={scroll}
                            setScroll={setScroll}
                            useRequestsHook={useRequestsHook}
                        />
                    </Router>
                </Box>
            )}
        </Flex>
    )
}

Search.defaultProps = {
    mode: "search",
}

export default Search
