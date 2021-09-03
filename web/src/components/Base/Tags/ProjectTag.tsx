// * DESCRIPTION: Overdue request tag

import { Tag } from "@chakra-ui/react"

interface ProjectTagProps {
    onClick?: () => void
    project: string
}

export const ProjectTag = ({ onClick, project }: ProjectTagProps) => {
    return (
        <Tag cursor="pointer" colorScheme="cyan" onClick={onClick}>
            {project}
        </Tag>
    )
}

export default ProjectTag
