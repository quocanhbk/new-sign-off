import { navigate } from "@reach/router"
import { BsFileEarmarkPlus } from "react-icons/bs"
import useForms from "./useForms"
import FilterBar from "./FilterBar"
import { Box, Button, Flex, Text } from "@chakra-ui/react"

const List = () => {
    const { data, count, render, searchText, setSearchText } = useForms()
    return (
        <Flex direction="column" flex={1} maxW="25rem" h="full" px={2} borderRight="1px" borderColor="gray.200">
            <FilterBar searchText={searchText} setSearchText={setSearchText} />
            <Flex justify="space-between" p={2}>
                <Text>Result: {count}</Text>
                <Button
                    leftIcon={<BsFileEarmarkPlus />}
                    size="xs"
                    onClick={() => navigate("/form/create")}
                    variant="ghost"
                    bg="gray.50"
                >
                    Add
                </Button>
            </Flex>
            <Box flex={1} overflow="overlay" p={2} pos="relative">
                {render(
                    data
                        ? data.map(form => (
                              <Box
                                  key={form.id}
                                  onClick={() => navigate(`/form/view/${form.id}`)}
                                  bg="gray.50"
                                  mb={2}
                                  p={2}
                                  rounded="md"
                                  shadow="base"
                                  cursor="pointer"
                                  _hover={{ bg: "gray.100" }}
                              >
                                  {form.name}
                              </Box>
                          ))
                        : null
                )}
            </Box>
        </Flex>
    )
}

export default List
