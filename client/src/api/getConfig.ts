import baseURL from "./baseURL"
import { msalInstance } from "../index"
import { InteractionRequiredAuthError, PopupRequest, SilentRequest } from "@azure/msal-browser"

let request: SilentRequest | PopupRequest
const getConfig = async () => {
    try {
        const accounts = msalInstance.getAllAccounts()
        request = {
            scopes: ["api://f8626081-3f81-4909-bcef-14f0a974f079/search_list"],
            account: accounts[0],
        }
        const token = await msalInstance.acquireTokenSilent(request)
        const config = {
            baseURL,
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
            },
        }
        return config
    } catch (err) {
        if (err instanceof InteractionRequiredAuthError) {
            await msalInstance.acquireTokenPopup(request)
        } else {
            throw new Error("Press F for token refresh")
        }
    }
}

export default getConfig
