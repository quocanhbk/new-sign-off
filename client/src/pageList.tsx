import { BsHouse, BsSearch, BsFileEarmarkPlus, BsPencilSquare, BsFileText, BsGear } from "react-icons/bs"
import NewHomePage from "./components/NewHome"
import CreatePage from "./components/Create"
import SearchPage from "./components/Search"
import Form from "./components/Form"
import Procedure from "./components/Procedure"

export interface Page {
    icon: JSX.Element
    text: string
    path: string
    link: string
    comp: JSX.Element
    admin: boolean
    noMobile?: boolean
    notVisible?: boolean
}

const pageList: Page[] = [
    {
        icon: <BsHouse size="24px" />,
        text: "Home",
        path: "/",
        link: "/",
        comp: <NewHomePage />,
        admin: false,
    },
    {
        icon: <BsSearch size="24px" />,
        text: "Search Document",
        path: "/search/*",
        link: "/search",
        comp: <SearchPage mode="search" />,
        admin: false,
    },
    {
        icon: <BsFileEarmarkPlus size="24px" />,
        text: "Create Document",
        path: "/create",
        link: "/create",
        comp: <CreatePage mode="create" />,
        noMobile: true,
        admin: false,
    },
    {
        icon: <BsFileEarmarkPlus size="24px" />,
        text: "Create Document",
        path: "/draft/:id",
        link: "/draft",
        comp: <CreatePage mode="draft" />,
        notVisible: true,
        noMobile: true,
        admin: false,
    },
    {
        icon: <BsFileEarmarkPlus size="24px" />,
        text: "Create Document",
        path: "/revise/:id",
        link: "/revise",
        comp: <CreatePage mode="revise" />,
        notVisible: true,
        noMobile: true,
        admin: false,
    },
    {
        icon: <BsPencilSquare size="24px" />,
        text: "Sign Document",
        path: "/sign/*",
        link: "/sign",
        comp: <SearchPage mode="sign" />,
        admin: false,
    },
    {
        icon: <BsFileText size="24px" />,
        text: "Manage Form",
        path: "/form/*",
        link: "/form",
        comp: <Form />,
        noMobile: true,
        admin: true,
    },
    {
        icon: <BsGear size="24px" />,
        text: "Manage Procedure",
        path: "/procedure/*",
        link: "/procedure",
        comp: <Procedure />,
        noMobile: true,
        admin: true,
    },
]

export default pageList
