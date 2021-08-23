import { BsArrowBarUp } from "react-icons/bs"
import { Flex, Input } from "@chakra-ui/react"
import { ChangeEvent } from "react"

interface UploadButtonProps {
    onSubmit: (file: File) => void
}

const UploadButton = ({ onSubmit }: UploadButtonProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSubmit(e.target.files![0])
    }

    return (
        <Flex
            pos="relative"
            rounded="full"
            direction="column"
            cursor="pointer"
            align="center"
            border="1px"
            borderColor="gray.200"
            p={4}
        >
            <BsArrowBarUp size="2rem" />
            Upload
            <Input
                pos="absolute"
                top={0}
                left={0}
                w="full"
                h="full"
                opacity={0}
                type="file"
                onChange={handleChange}
                title=""
                accept={".pdf"}
                cursor="pointer"
            />
        </Flex>
    )
}

export default UploadButton
