import { useToast, UseToastOptions } from "@chakra-ui/react"

export const useChakraToast = () => {
    const toast = useToast()

    return ({ status, title, description }: Pick<UseToastOptions, "status" | "title" | "description">) =>
        setTimeout(
            () =>
                toast({
                    status,
                    title,
                    description,
                    duration: 2000,
                    isClosable: true,
                }),
            250
        )
}

export default useChakraToast
