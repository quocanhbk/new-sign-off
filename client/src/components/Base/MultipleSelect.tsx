// Simpler version of ComboBox, no search, and only select 1 item
import { Box, Collapse, Flex, Input, useDisclosure, useOutsideClick, Wrap, WrapItem } from "@chakra-ui/react"
import { FC, useEffect, useRef, useState } from "react"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"

interface Option {
    id?: string | number
    [key: string]: any
}

type MultiSelectMode =
    | { readOnly?: false; onSelect: (options: Option[]) => void }
    | { readOnly: true; onSelect?: (options: Option[]) => void }
type MultiSelect = MultiSelectMode & {
    value: Option[]
    selection: Option[]
    displayField?: string
    keyField?: string
    searchable?: boolean
}

const Select: FC<MultiSelect> = ({
    selection,
    value,
    onSelect,
    displayField = "text",
    keyField = "id",
    readOnly = false,
    searchable = false,
}) => {
    const { isOpen, onToggle, onClose } = useDisclosure()
    const ref = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [searchText, setSearchText] = useState("")
    useOutsideClick({ ref, handler: onClose })
    useEffect(() => {
        if (isOpen && inputRef.current) inputRef.current.focus()
    }, [isOpen])

    const isOptionSelected = (option: Option) => value && value.map(v => v[keyField]).includes(option[keyField])

    const handleSelect = (option: Option) => {
        if (isOptionSelected(option)) {
            onSelect!((value as Option[]).filter(v => v[keyField] !== option[keyField]))
            return
        }
        onSelect!([...(value as Option[]), option])
    }
    const formatOption = (opt: Option) =>
        Object.values(opt)
            .map(value => {
                if (typeof value !== "string") return value.toString().toLowerCase()
                else return value.toLowerCase()
            })
            .join(" ")

    const selectionFilterer = (opt: Option) => formatOption(opt).includes(searchText.toLowerCase())

    useEffect(() => {
        if (!isOpen) setSearchText("")
    }, [isOpen])

    return (
        <Box pos="relative" rounded="md" ref={ref}>
            <Flex
                onClick={onToggle}
                align="center"
                h="full"
                minH="2.5rem"
                px={4}
                py={1}
                pointerEvents={readOnly ? "none" : "all"}
                bg={readOnly ? "whiteAlpha.200" : "transparent"}
                rounded="md"
                border={"1px"}
                borderColor={"inherit"}
            >
                <Wrap flex={1}>
                    {value.map(v => (
                        <WrapItem
                            key={v.id}
                            bg="gray.100"
                            py={0.5}
                            px={2}
                            rounded="md"
                            cursor="pointer"
                            onClick={e => {
                                e.stopPropagation()
                                handleSelect(v)
                            }}
                            userSelect="none"
                        >
                            {v[displayField]}
                        </WrapItem>
                    ))}
                </Wrap>
                {!readOnly && <Box className="Chevr">{isOpen ? <BsChevronUp /> : <BsChevronDown />}</Box>}
            </Flex>
            <Box
                pos="absolute"
                overflow="visible"
                width="100%"
                zIndex={3}
                top={"100%"}
                transform={"translateY(0.5rem);"}
            >
                <Collapse in={isOpen} animateOpacity unmountOnExit>
                    <Flex
                        direction="column"
                        width="100%"
                        shadow="base"
                        bg="gray.50"
                        rounded="md"
                        py={1}
                        border="1px"
                        borderColor="gray.200"
                        h="full"
                    >
                        {searchable && (
                            <Input
                                value={searchText}
                                onChange={e => setSearchText(e.target.value)}
                                ref={inputRef}
                                variant="flushed"
                                mb={1}
                                placeholder="Search..."
                                px={4}
                                autoComplete="off"
                            />
                        )}
                        <Box flex={1} overflow="overlay" maxH="10rem">
                            {selection.filter(selectionFilterer).map(option => (
                                <Box
                                    key={option[keyField]}
                                    cursor="pointer"
                                    onClick={() => handleSelect(option)}
                                    px={4}
                                    py={2}
                                    _hover={{ bg: isOptionSelected(option) ? "gray.200" : "gray.100" }}
                                    bg={isOptionSelected(option) ? "gray.300" : "transparent"}
                                    color={isOptionSelected(option) ? "fill.light" : "inherit"}
                                    fontWeight={isOptionSelected(option) ? "semibold" : "normal"}
                                >
                                    {option[displayField]}
                                </Box>
                            ))}
                        </Box>
                    </Flex>
                </Collapse>
            </Box>
        </Box>
    )
}

export default Select
