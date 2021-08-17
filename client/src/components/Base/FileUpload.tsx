import { BsArrowBarUp } from "react-icons/bs"
import { Flex, Input } from "@chakra-ui/react"

interface UploadButtonProps {
    onSubmit: (file: File[]) => void
    acceptExt?: string
}

const UploadButton = ({ onSubmit, acceptExt }: UploadButtonProps) => {
    // const [dragging, setDragging] = useState(false)

    const handleChange = e => {
        let files = e.target.files
        onSubmit(Object.values(files).slice(0, files.length) as File[])
    }

    return (
        <Flex
            pos="relative"
            rounded="md"
            direction="column"
            cursor="pointer"
            align="center"
            border="1px"
            borderColor="gray.200"
            p={4}
        >
            <BsArrowBarUp size="2rem" />
            Click to choose or drop file here
            <Input
                pos="absolute"
                top={0}
                left={0}
                w="full"
                h="full"
                opacity={0}
                type="file"
                multiple
                onChange={handleChange}
                title=""
                accept={acceptExt}
            />
        </Flex>
    )
}

export default UploadButton
