import pageList from "pageList"
import { useMsal } from "@azure/msal-react"
import { adminEmails } from "constant"
import { Flex, Heading, Image, VStack } from "@chakra-ui/react"
import NavBarCard from "./NavBarCard"
import UserCard from "./UserCard"
import { useQuery } from "react-query"
import { getUser } from "api"

const SideBar = () => {
    const { accounts } = useMsal()
    useQuery(["user", "anh.lq@ttgvn.com"], () => getUser("anh.lq@ttgvn.com"), {
        onSuccess: console.log,
    })
    return (
        <Flex direction="column" flex={5} maxW="25rem" px={4} py={2} shadow="base">
            <Flex align="center" px={2}>
                <Image h="4rem" src="/iconNoTextLight.svg" />
                <Heading size="lg" color="fill.light" fontFamily="Campton">
                    Approval Online
                </Heading>
            </Flex>
            <UserCard />
            <VStack mt={4} color="text.secondary.light" spacing={2}>
                {pageList
                    .filter(p => !p.notVisible)
                    .filter(page => !page.admin || adminEmails.includes(accounts[0].username))
                    .map(item => (
                        <NavBarCard key={item.text} page={item} />
                    ))}
            </VStack>
        </Flex>
    )
}

export default SideBar
