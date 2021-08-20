import FormControl from "components/Base/FormControl"
import { Box, Input } from "@chakra-ui/react"

const PrimaryInfo = ({ title, description, set, error }) => {
    return (
        <Box>
            <FormControl label="Procedure Name" error={error.title}>
                <Input
                    value={title}
                    onChange={e => set("title", e.target.value)}
                    placeholder="Input document title..."
                    spellCheck="false"
                />
            </FormControl>
            <FormControl label="Procedure Description">
                <Input
                    value={description}
                    onChange={e => set("description", e.target.value)}
                    placeholder="Input document title..."
                    spellCheck="false"
                />
            </FormControl>
        </Box>
    )
}

export default PrimaryInfo
