import { useState, useEffect, useRef } from "react"
import { BsFunnelFill, BsSearch } from "react-icons/bs"
import FilterForm from "./FilterForm"
import { Box, Collapse, Flex, IconButton, Input, InputGroup, InputLeftElement, useOutsideClick } from "@chakra-ui/react"
import { RequestQuery, RequestQueryKey } from "./useRequestQuery"

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
    }, [searchText])

    useOutsideClick({
        ref: popupRef,
        handler: () => setSettingPopup(false),
    })
    return (
        <Flex align="center" px={2} pt={4} pb={2} pos="relative">
            <InputGroup>
                <InputLeftElement pointerEvents="none" children={<BsSearch />} />
                <Input
                    _hover={{ bg: "gray.100" }}
                    _focus={{ bg: "gray.100" }}
                    variant="filled"
                    rounded="full"
                    placeholder="Search..."
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                />
            </InputGroup>
            <Box pos="relative" ref={popupRef}>
                <IconButton
                    onClick={() => setSettingPopup(!settingPopup)}
                    icon={<BsFunnelFill />}
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
                    border="1px"
                    borderColor="gray.200"
                    rounded="md"
                    overflow="hidden"
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
