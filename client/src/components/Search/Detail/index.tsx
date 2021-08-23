// * DESCRIPTION: provide context
import { RouteComponentProps } from "@reach/router"
import { ViewMode } from "types"
import RequestProvider from "./RequestProvider"
import Detail from "./Detail"
interface IndexProps extends RouteComponentProps {
    id?: string
    mode: ViewMode
}

const Index = ({ id, mode }: IndexProps) => {
    return (
        <RequestProvider id={id!} mode={mode}>
            <Detail />
        </RequestProvider>
    )
}

export default Index
