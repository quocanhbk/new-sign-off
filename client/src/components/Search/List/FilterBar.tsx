import { useState, useEffect, useRef } from "react"
import { BsFunnel } from "react-icons/bs"
import FilterForm from "./FilterForm"
import { Box, Collapse, Flex, IconButton, useOutsideClick } from "@chakra-ui/react"
import { RequestQuery, RequestQueryKey } from "./useRequestQuery"
import { SearchBar } from "components/Base"

interface FilterBarProps {
    setQueryTitle: (text: string) => void
    query: RequestQuery
    setQueryParam: (field: RequestQueryKey, value: string | null, text: string) => void
}

const FilterBar = ({ setQueryTitle, query, setQueryParam }: FilterBarProps) => {
    const [settingPopup, setSettingPopup] = useState(false)
    const [searchText, setSearchText] = useState("")
    const popupRef = useRef<HTMLDivElement>(null)

    // Throttle: 250ms
    useEffect(() => {
        const timeOutId = setTimeout(() => setQueryTitle(searchText), 250)
        return () => clearTimeout(timeOutId)
    }, [searchText, setQueryTitle])

    useOutsideClick({
        ref: popupRef,
        handler: () => setSettingPopup(false),
    })
    return (
        <Flex align="center" px={2} pt={4} pb={2} pos="relative">
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
            <Box pos="relative" ref={popupRef}>
                <IconButton
                    onClick={() => setSettingPopup(!settingPopup)}
                    icon={<BsFunnel />}
                    aria-label="filter-popup"
                    rounded="full"
                    variant="ghost"
                    bg="gray.100"
                    ml={4}
                    colorScheme="gray"
                />
                <Box
                    pos="absolute"
                    top="100%"
                    right={0}
                    transform="translateY(0.5rem)"
                    zIndex="dropdown"
                    overflow="hidden"
                    rounded="md"
                    shadow="lg"
                    bg="gray.50"
                >
                    <Collapse unmountOnExit in={settingPopup} animateOpacity>
                        <FilterForm query={query} setQueryParam={setQueryParam} />
                    </Collapse>
                </Box>
            </Box>
        </Flex>
    )
}

export default FilterBar
