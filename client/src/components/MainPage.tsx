import React, { FC } from "react"
import SideBar from "./NavBar"
import pageList from "../pageList"
import { RouteComponentProps, Router } from "@reach/router"
import useMediaQuery from "hooks/useMediaQuery"
import BottomBar from "components/NavBar/BottomBar"
import { Box, Flex } from "@chakra-ui/react"

interface MainPageProps extends RouteComponentProps {}

const MainPage: FC<MainPageProps> = () => {
    let device = useMediaQuery()
    return (
        <Flex h="100vh" w="100%" className="main">
            {device === "PC" && <SideBar />}
            <Box flex={18} h="full">
                <Flex h="full" direction="column">
                    <Box overflow="hidden" h="full">
                        <Router style={{ height: "100%" }}>
                            {pageList.map(page => {
                                return React.cloneElement(page.comp, {
                                    key: page.text,
                                    path: page.path,
                                })
                            })}
                        </Router>
                    </Box>
                    {device === "PHONE" && <BottomBar />}
                </Flex>
            </Box>
        </Flex>
    )
}

export default MainPage
