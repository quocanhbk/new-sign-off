import { CircularProgress, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"

interface ProgressLoaderProps {
    percent: number
}

const ProgressLoader = ({ percent }: ProgressLoaderProps) => {
    const [isOut, setIsOut] = useState(false)

    useEffect(() => {
        if (percent === 100) {
            setTimeout(() => setIsOut(true), 200)
            //setTimeout(() => setIsOut(false), 300)
        }
    }, [percent])

    return !isOut ? (
        <Flex
            pos="absolute"
            top={0}
            left={0}
            w="full"
            h="full"
            align="center"
            justify="center"
            direction="column"
            bg="white"
            isOut={isOut}
        >
            <CircularProgress value={percent}>{`${percent}%`}</CircularProgress>
        </Flex>
    ) : null
}

export default ProgressLoader
