import { navigate, useLocation } from "@reach/router"
import { BsFileEarmarkPlus } from "react-icons/bs"
import useForms from "./useForms"
import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { SearchBar } from "components/Base"

const List = () => {
    const { data, count, render, searchText, setSearchText } = useForms()
    const location = useLocation().pathname.split("/")
    return (
        <Flex
            direction="column"
            flex={1}
            maxW="25rem"
            h="full"
            px={2}
            borderRight="1px"
            borderColor="gray.200"
            overflow="hidden"
        >
            <Flex align="center" px={2} pt={4} pb={2} pos="relative">
                <SearchBar searchText={searchText} setSearchText={setSearchText} />
            </Flex>
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
                              <Flex
                                  key={form.id}
                                  onClick={() => navigate(`/form/view/${form.id}`)}
                                  bg="gray.50"
                                  direction="column"
                                  mb={2}
                                  p={2}
                                  rounded="md"
                                  shadow={form.id.toString() === location[location.length - 1] ? "md" : "base"}
                                  border="1px"
                                  borderColor={
                                      form.id.toString() === location[location.length - 1]
                                          ? "fill.light"
                                          : "transparent"
                                  }
                                  cursor="pointer"
                                  _hover={{ bg: "gray.100" }}
                                  overflow="hidden"
                              >
                                  <Text isTruncated>{form.name}</Text>
                              </Flex>
                          ))
                        : null
                )}
            </Box>
        </Flex>
    )
}

export default List
