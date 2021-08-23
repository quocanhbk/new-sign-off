import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Flex, Text } from "@chakra-ui/react"

const DateBoard = () => {
    const [time, setTime] = useState(format(new Date(), "HH:mm"))
    useEffect(() => {
        let timeout = setTimeout(() => {
            setTime(format(new Date(), "HH:mm"))
        }, 60000)
        return () => {
            clearTimeout(timeout)
        }
    })

    return (
        <Flex direction="column" align="center" userSelect="none">
            <Text fontSize="6xl" fontWeight="semibold" color="fill.light">
                {time}
            </Text>
            <Text fontSize="xl" color="gray.500">
                {format(new Date(), "eeee, MMMM do, yyyy")}
            </Text>
        </Flex>
    )
}

export default DateBoard
