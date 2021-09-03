import Date from "./Date"
import DashboardBody from "./DashboardBody"
import { Flex } from "@chakra-ui/react"

const Dashboard = () => {
    return (
        <Flex align="center" direction="column" h="full" py={8} px={0}>
            <Date />
            <DashboardBody />
        </Flex>
    )
}

export default Dashboard
