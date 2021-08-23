import FormControl from "components/Base/FormControl"
import { Box, Input } from "@chakra-ui/react"
import { IProcedureInput } from "api"

interface PrimaryInfoProps {
    title: string
    description: string
    set: (field: keyof IProcedureInput, value: any) => void
    errors: Record<keyof IProcedureInput, string>
}

const PrimaryInfo = ({ title, description, set, errors }: PrimaryInfoProps) => {
    return (
        <Box>
            <FormControl label="Procedure Name" error={errors.title}>
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
