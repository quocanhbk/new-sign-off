// Simpler version of ComboBox, no search, and only select 1 item
import { Box, Collapse, Flex, Input, Text, useDisclosure, useOutsideClick } from "@chakra-ui/react"
import { FC, useEffect, useRef, useState } from "react"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"

interface Option {
    id?: string | number
    [key: string]: any
}
interface SelectProps {
    selection: Option[]
    value: Option | null | undefined
    onSelect?: (option: Option) => void
    displayField?: string
    keyField?: string
    removable?: boolean
    readOnly?: boolean
    searchable?: boolean
    isDisabled?: boolean
}
const Select: FC<SelectProps> = ({
    selection,
    value = null,
    onSelect = () => {},
    displayField = "text",
    keyField = "id",
    removable = false,
    readOnly = false,
    searchable = false,
    isDisabled = false,
}) => {
    const { isOpen, onToggle, onClose } = useDisclosure()
    const ref = useRef<HTMLDivElement>(null)
    useOutsideClick({
        ref: ref,
        handler: onClose,
    })
    const inputRef = useRef<HTMLInputElement>(null)
    const [searchText, setSearchText] = useState("")
    useEffect(() => {
        if (isOpen && inputRef.current) inputRef.current.focus()
    }, [isOpen])
    const isOptionSelected = (option: Option) => value && option[keyField] === value[keyField]
    const handleSelect = (option: Option) => {
        if (isOptionSelected(option)) {
            if (removable) {
                onSelect({ id: "" })
            }
            onClose()
            return
        }
        onSelect(option)
        onClose()
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
        <Box pos="relative" ref={ref} cursor={isDisabled ? "not-allowed" : "auto"}>
            <Flex
                onClick={() => !isDisabled && onToggle()}
                align="center"
                px={4}
                h="full"
                pointerEvents={readOnly ? "none" : "all"}
                bg={isDisabled ? "gray.100" : "transparent"}
                rounded="md"
                border={"1px"}
                borderColor={"inherit"}
                height="2.5rem"
            >
                <Box flex={1} userSelect="none">
                    <Text isTruncated>{value && value[displayField]}</Text>
                </Box>
                {!readOnly && <Box>{isOpen ? <BsChevronUp /> : <BsChevronDown />}</Box>}
            </Flex>
            <Box
                pos="absolute"
                overflow="visible"
                width="100%"
                zIndex="dropdown"
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
                            />
                        )}
                        <Box flex={1} overflow="overlay" maxH="10rem">
                            {selection.filter(selectionFilterer).map((option, idx) => (
                                <Box
                                    key={option[keyField]}
                                    cursor="pointer"
                                    onClick={() => handleSelect(option)}
                                    px={4}
                                    py={2}
                                    _hover={{ bg: isOptionSelected(option) ? "gray.200" : "gray.100" }}
                                    bg={isOptionSelected(option) ? "gray.200" : "transparent"}
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
