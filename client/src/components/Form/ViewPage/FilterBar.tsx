import { Flex } from "@chakra-ui/react"
import { SearchBar } from "components/Base"

interface FilterBarProps {
    searchText: string
    setSearchText: (searchText: string) => void
}

const FilterBar = ({ searchText, setSearchText }: FilterBarProps) => {
    return (
        <Flex align="center" px={2} pt={4} pb={2} pos="relative">
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
        </Flex>
    )
}

export default FilterBar
