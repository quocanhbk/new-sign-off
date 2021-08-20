import Cardv2 from "./Cardv2"
import { navigate } from "@reach/router"
import { BsFileEarmarkPlus } from "react-icons/bs"
import useProcedures from "./useProcedures"
import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { SearchBar } from "components/Base"

const List = () => {
    const { data: procedures, render, searchText, setSearchText, users, location } = useProcedures()

    return (
        <Flex direction="column" flex={1} maxW="25rem" h="full" px={2} borderRight="1px" borderColor="gray.200">
            <Flex align="center" px={2} pt={4} pb={2} pos="relative">
                <SearchBar searchText={searchText} setSearchText={setSearchText} />
            </Flex>
            <Flex justify="space-between" p={2}>
                <Text>
                    Result:{" "}
                    {procedures &&
                        procedures.filter(procedure => procedure.title.toLowerCase().includes(searchText.toLowerCase()))
                            .length}
                </Text>
                <Button
                    leftIcon={<BsFileEarmarkPlus />}
                    size="xs"
                    onClick={() => navigate("/procedure/create")}
                    variant="ghost"
                    bg="gray.50"
                >
                    Add
                </Button>
            </Flex>
            <Box flex={1} overflow="auto" p={2} pos="relative">
                {render(
                    procedures && users ? (
                        <>
                            {procedures
                                .filter(procedure => procedure.title.toLowerCase().includes(searchText.toLowerCase()))
                                .map(procedure => (
                                    <Cardv2
                                        key={procedure.id}
                                        title={procedure.title}
                                        isActive={procedure.isActive}
                                        createdBy={users.find(u => u.id === procedure.createdBy)}
                                        onClick={() => navigate("/procedure/view/" + procedure.id)}
                                        active={procedure.id.toString() === location[location.length - 1]}
                                    />
                                ))}
                        </>
                    ) : null
                )}
            </Box>
        </Flex>
    )
}

export default List
