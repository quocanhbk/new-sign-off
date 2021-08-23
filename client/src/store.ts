import { navigate } from "@reach/router"
import { createStore, action, Action, createTypedHooks } from "easy-peasy"

interface StoreModel {
    theme: boolean
    setTheme: Action<StoreModel>
    path: string
    setPath: Action<StoreModel, string>
}

const store = createStore<StoreModel>({
    theme: localStorage.getItem("ttgTheme") ? localStorage.getItem("ttgTheme") === "true" : false,
    setTheme: action(state => {
        state.theme = !state.theme
        localStorage.setItem("ttgTheme", state.theme.toString())
    }),

    path: "/" + window.location.pathname.split("/")[1],
    setPath: action((state, payload) => {
        state.path = "/" + payload.split("/")[1]
        navigate(payload)
    }),
})
const typedHooks = createTypedHooks<StoreModel>()

export const useStoreActions = typedHooks.useStoreActions
export const useStoreDispatch = typedHooks.useStoreDispatch
export const useStoreState = typedHooks.useStoreState
export default store
