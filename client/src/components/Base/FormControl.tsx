import { cloneElement, FC } from "react"
import { FormControl as FControl, FormLabel, FormErrorMessage, BoxProps } from "@chakra-ui/react"
interface FormControlProps extends BoxProps {
    label: string
    children: JSX.Element | JSX.Element[]
    error?: string
    isDisabled?: boolean
}
const FormControl: FC<FormControlProps> = ({ label, children, error, isDisabled, ...props }) => {
    const isArray = (childr: JSX.Element | JSX.Element[]): childr is JSX.Element[] => {
        return "length" in childr
    }
    const render = () => {
        if (isArray(children)) {
            return children.map((child, index) => cloneElement(child, { isDisabled, key: index }))
        }
        return cloneElement(children, { isDisabled })
    }
    return (
        <FControl mb={4} {...props} isInvalid={!!error} isDisabled={isDisabled}>
            <FormLabel mb={1}>{label}</FormLabel>
            {render()}
            {error && <FormErrorMessage mt={0.5}>{error}</FormErrorMessage>}
        </FControl>
    )
}

export default FormControl
