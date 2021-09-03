import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react"
import { BiDislike, BiLike, BiRevision, BsClock, GiPauseButton } from "react-icons/all"

interface StatusTagProps {
    status: "Approved" | "Pending" | "Rejected" | "Revising" | "Draft"
    onClick?: () => void
    readOnly?: boolean
}

export const StatusTag = ({ status, onClick, readOnly }: StatusTagProps) => {
    const gen = () => {
        switch (status) {
            case "Approved":
                return {
                    as: BiLike,
                    colorScheme: "green",
                }
            case "Pending":
                return {
                    as: BsClock,
                    colorScheme: "yellow",
                }
            case "Rejected":
                return {
                    as: BiDislike,
                    colorScheme: "red",
                }
            case "Revising":
                return {
                    as: BiRevision,
                    colorScheme: "blue",
                }
            default:
                return {
                    as: GiPauseButton,
                    colorScheme: "gray",
                }
        }
    }

    return (
        <Tag onClick={onClick} colorScheme={gen().colorScheme} cursor={readOnly ? "auto" : "pointer"}>
            <TagLeftIcon as={gen().as} />
            <TagLabel>{status}</TagLabel>
        </Tag>
    )
}

export default StatusTag
