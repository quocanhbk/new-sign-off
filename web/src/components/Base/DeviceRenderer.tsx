// * DESCRIPTION: will render when device is equal to props

import { useMediaQuery } from "hooks"

interface DeviceRendererProps {
    device: "PHONE" | "PC"
    children: JSX.Element
}

const DeviceRenderer = ({ device, children }: DeviceRendererProps) => {
    const currentDevice = useMediaQuery()
    return currentDevice === device ? children : null
}

export default DeviceRenderer
