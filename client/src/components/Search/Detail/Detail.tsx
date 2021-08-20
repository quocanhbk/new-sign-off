import ApprovalFlow from "./ApprovalFlow"
import { memo } from "react"
import ApprovalInfo from "./ApprovalInfo"
import ApproveWindow from "./ApproveWindow"
import ConfirmPopup from "./ConfirmPopup"
import Content from "./Content"
import Header from "./Header"
import CancelnDeletePopup from "./CancelnDeletePopup"
import { Tabs, TabList, TabPanels, TabPanel, Text, Tab, Flex } from "@chakra-ui/react"
import { useRequestContext } from "./RequestProvider"

const TabButton = ({ children }) => {
    return (
        <Tab
            _selected={{
                fontWeight: "bold",
                borderBottom: "2px",
                borderColor: "fill.light",
                color: "fill.light",
            }}
            _focus={{
                border: "none",
            }}
        >
            <Text>{children}</Text>
        </Tab>
    )
}

const Detail = ({}) => {
    const { request, render, mode } = useRequestContext()
    return (
        <Flex direction="column" h="full" overflow="hidden" className="detail-body">
            {render(
                request ? (
                    <>
                        <Header />
                        <Tabs variant="line" isFitted flex={1} display="flex" flexDir="column" overflow="hidden">
                            <TabList>
                                <TabButton>Content</TabButton>
                                <TabButton>Approval Flow</TabButton>
                                <TabButton>Info</TabButton>
                            </TabList>
                            <TabPanels flex={1} className="tab-panels" overflow="overlay">
                                <TabPanel h="full">
                                    <Content />
                                </TabPanel>
                                <TabPanel>
                                    <ApprovalFlow />
                                </TabPanel>
                                <TabPanel>
                                    <ApprovalInfo />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>

                        {mode === "sign" && <ApproveWindow />}
                        <CancelnDeletePopup />
                        <ConfirmPopup />
                    </>
                ) : null
            )}
        </Flex>
    )
}

export default memo(Detail)
