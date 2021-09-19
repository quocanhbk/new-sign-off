// * DESCRIPTION:

import { Flex, Text } from "@chakra-ui/layout"
import { Page } from "pageList"
import { useStoreActions, useStoreState } from "store"

interface NavBarCardProps {
    page: Page
}

const NavBarCard = ({ page }: NavBarCardProps) => {
    const setPath = useStoreActions(_ => _.setPath)
    const path = useStoreState(_ => _.path)
    return (
        <Flex
            w="full"
            px={8}
            py={4}
            _hover={{ bg: "gray.100" }}
            rounded="md"
            cursor="pointer"
            color={page.link === path ? "fill.light" : "inherit"}
            fontWeight={page.link === path ? "bold" : "normal"}
            onClick={() => setPath(page.link)}
        >
            {page.icon}
            <Text flex={1} ml={4}>
                {page.text}
            </Text>
        </Flex>
    )
}

export default NavBarCard
