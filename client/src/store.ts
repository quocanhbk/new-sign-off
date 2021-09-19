import { navigate } from "@reach/router"
import { createStore, action, Action, createTypedHooks } from "easy-peasy"

interface StoreModel {
    path: string
    setPath: Action<StoreModel, string>
    setPathNoNavigate: Action<StoreModel, string>
}

const store = createStore<StoreModel>({
    path: "/" + window.location.pathname.split("/")[1],
    setPath: action((state, payload) => {
        state.path = "/" + payload.split("/")[1]
        navigate(payload)
    }),
    setPathNoNavigate: action((state, payload) => {
        state.path = "/" + payload.split("/")[1]
    }),
})
const typedHooks = createTypedHooks<StoreModel>()

export const useStoreActions = typedHooks.useStoreActions
export const useStoreDispatch = typedHooks.useStoreDispatch
export const useStoreState = typedHooks.useStoreState
export default store
