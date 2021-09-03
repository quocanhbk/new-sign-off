import { useRef, KeyboardEvent } from "react"
import { IoMdSend } from "react-icons/all"
import EventCard from "./EventCard"
import format from "date-fns/format"
import { Flex, IconButton, Input, VStack } from "@chakra-ui/react"
import { useRequestContext } from "./RequestProvider"

const EventComments = () => {
    const {
        request,
        mutator: { postComment },
    } = useRequestContext()
    const logs = request!.logs
    const lastApproverId =
        request && request.approvers.length > 0 ? request!.approvers[request!.approvers.length - 1].userId : 0
    const inputRef = useRef<HTMLInputElement>(null)
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            if (inputRef.current && inputRef.current.value !== "") {
                postComment(inputRef.current.value)
                inputRef.current.value = ""
            }
        }
    }
    return (
        <Flex direction="column">
            <Flex>
                <Input
                    rounded="full"
                    placeholder="Write comment here ..."
                    ref={inputRef}
                    flex={1}
                    onKeyDown={handleKeyDown}
                />
                <IconButton
                    ml={2}
                    variant="ghost"
                    icon={<IoMdSend size="1.2rem" />}
                    aria-label="send-comment"
                    rounded="full"
                />
            </Flex>
            <VStack spacing={4} py={4}>
                {logs &&
                    logs.map(log => (
                        <EventCard
                            key={log.id}
                            description={log.description}
                            createdAt={format(new Date(log.createdAt), "HH:mm dd/MM/yyyy")}
                            createdBy={log.author}
                            last={lastApproverId === log.author.id}
                        />
                    ))}
            </VStack>
        </Flex>
    )
}

export default EventComments
