// * DESCRIPTION: Search bar

import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react"
import { BsSearch } from "react-icons/bs"

interface SearchBarProps {
    searchText: string
    setSearchText: (searchText: string) => void
}

const SearchBar = ({ searchText, setSearchText }: SearchBarProps) => {
    return (
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
    )
}

export default SearchBar
