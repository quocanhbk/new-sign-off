import { useRef, useState } from "react"
import pageList from "pageList"
import { useStoreActions, useStoreState } from "store"
import { BsThreeDots } from "react-icons/bs"
import { Box, Flex, SlideFade, Text, useOutsideClick } from "@chakra-ui/react"
import UserProfilePopup from "./UserProfilePopup"

const BottomBar = () => {
    const setPath = useStoreActions(_ => _.setPath)
    const path = useStoreState(_ => _.path)
    const [popup, setPopup] = useState(false)
    let ref = useRef<HTMLDivElement>(null)
    // let popupRef = useClickOutside(() => setPopup(false), otherRef.current)
    useOutsideClick({
        ref,
        handler: () => setPopup(false),
    })
    return (
        <Flex justify="space-between" py={2} px={4} pos="relative" borderTop="1px" borderColor="gray.200">
            <Box pos="absolute" w="full" top={0} left={0} zIndex="modal" className="box" transform="translateY(-100%)">
                <SlideFade in={popup}>
                    <UserProfilePopup />
                </SlideFade>
            </Box>
            {pageList
                .filter(p => !p.notVisible && !p.noMobile)
                .map(item => (
                    <Flex
                        direction="column"
                        key={item.text}
                        onClick={() => {
                            setPath(item.link)
                        }}
                        fontWeight={item.link === path ? "bold" : "normal"}
                        color={item.link === path ? "fill.light" : "base"}
                        align="center"
                        w="5rem"
                        h="5rem"
                        justify="center"
                        userSelect="none"
                        cursor="pointer"
                    >
                        {item.icon}
                        <Text mt={2}>{item.text.split(" ")[0]}</Text>
                    </Flex>
                ))}
            <Flex
                direction="column"
                align="center"
                w="5rem"
                h="5rem"
                justify="center"
                onClick={() => setPopup(!popup)}
                ref={ref}
                userSelect="none"
                cursor="pointer"
            >
                <BsThreeDots size="24px" />
                <Text mt={2}>More</Text>
            </Flex>
        </Flex>
    )
}

export default BottomBar
