import { Fragment } from "react"
import FilterBar from "./FilterBar"
import { RouteComponentProps, useLocation } from "@reach/router"
import InfiniteScroll from "react-infinite-scroll-component"
import useRequests from "../useRequests"
import { Box, Flex, Tag, Text, Wrap } from "@chakra-ui/react"
import { UrgentTag, ProjectTag, StatusTag } from "components/Base/Tags"
import { RequestCard } from "components/Base"
import { useMediaQuery } from "hooks"

interface ListProps extends RouteComponentProps {
    mode: "search" | "sign"
    useRequestsHook: ReturnType<typeof useRequests>
    scroll?: number
    setScroll?: (scroll: number) => void
}
// I use the same component for Search and Sign, mode = "search" | "sign"
const List = ({ mode, scroll, setScroll, useRequestsHook }: ListProps) => {
    const location = useLocation().pathname.split("/")
    const device = useMediaQuery()
    const {
        data,
        fetchNextPage,
        hasNextPage,
        onChangeTitleSearch,
        query,
        queryTags,
        render,
        setQueryParam,
    } = useRequestsHook
    const genTag = (tag: { key: string; text: string; onClick: () => void }) => {
        if (tag.key === "status")
            return (
                <StatusTag
                    status={tag.text as "Approved" | "Pending" | "Rejected" | "Revising" | "Draft"}
                    onClick={tag.onClick}
                    key={tag.key}
                />
            )
        if (tag.key === "priority" && tag.text === "Urgent") return <UrgentTag onClick={tag.onClick} />
        if (tag.key === "project") return <ProjectTag project={tag.text} onClick={tag.onClick} />
        return (
            <Tag key={tag.key} onClick={tag.onClick} cursor="pointer" colorScheme="twitter">
                {tag.text}
            </Tag>
        )
    }
    return (
        <Flex direction="column" flex={1} maxW={device === "PHONE" ? "100%" : "25rem"} h="full" px={2}>
            <FilterBar setQueryTitle={v => onChangeTitleSearch(v)} query={query} setQueryParam={setQueryParam} />

            <Flex align="center" p={2}>
                <Text mr={2}>Filter: </Text>
                <Wrap spacing={2}>{queryTags.map(tag => genTag(tag))}</Wrap>
            </Flex>
            <Box flex={1} id="scrollableDiv" pos="relative" overflow="auto">
                {render(
                    <InfiniteScroll
                        dataLength={data ? data.pages.reduce((init, cur) => init.concat(cur), []).length : 0}
                        className="request-scroller"
                        next={() => fetchNextPage()}
                        hasMore={!!hasNextPage}
                        height="100%"
                        style={{ padding: "0.5rem" }}
                        loader={null}
                        initialScrollY={scroll || 0}
                        onScroll={v => {
                            if (setScroll) setScroll((v.target as HTMLDivElement).scrollTop)
                        }}
                    >
                        {data &&
                            data.pages.map((page, i) => (
                                <Fragment key={i}>
                                    {page.map(request => (
                                        <RequestCard
                                            key={request.id}
                                            data={request}
                                            page={mode}
                                            active={request.id.toString() === location[location.length - 1]}
                                            setQueryParam={setQueryParam}
                                        />
                                    ))}
                                </Fragment>
                            ))}
                    </InfiniteScroll>
                )}
            </Box>
        </Flex>
    )
}

export default List
