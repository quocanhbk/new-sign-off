/* eslint-disable react/react-in-jsx-scope */
import { Redirect } from "@reach/router"
import { cloneElement } from "react"
const AdminRoute = ({ valid, children, ...props }) => {
    if (!valid) return <Redirect to="/" noThrow />
    return cloneElement(children, {
        ...props,
    })
}

export default AdminRoute
