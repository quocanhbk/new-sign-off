/* eslint-disable no-unused-vars */
import React from "react"
import {
    BsHouse,
    BsSearch,
    BsFileEarmarkPlus,
    BsPencilSquare,
    BsFileEarmarkCheck,
    BsFileText,
    BsGear,
    BsEggFill,
} from "react-icons/bs"
import NewHomePage from "./components/NewHome"
import CreatePage from "./components/Create"
import SearchPage from "./components/Search"
import Form from "./components/Form"
import Procedure from "./components/Procedure"
const pageList = [
    // {icon: <BsHouse size="24px"/>, text: "Home", path: "/", link: "/", comp: <HomePage/>},
    {
        icon: <BsHouse size="24px" />,
        text: "Home",
        path: "/",
        link: "/",
        comp: <NewHomePage />,
    },
    {
        icon: <BsSearch size="24px" />,
        text: "Search Document",
        path: "/search/*",
        link: "/search",
        comp: <SearchPage />,
    },
    {
        icon: <BsFileEarmarkPlus size="24px" />,
        text: "Create Document",
        path: "/create",
        link: "/create",
        comp: <CreatePage mode="create" />,
        noMobile: true,
    },
    {
        icon: <BsFileEarmarkPlus size="24px" />,
        text: "Create Document",
        path: "/draft/:id",
        link: "/draft",
        comp: <CreatePage mode="draft" />,
        notVisible: true,
        noMobile: true,
    },
    {
        icon: <BsFileEarmarkPlus size="24px" />,
        text: "Create Document",
        path: "/revise/:id",
        link: "/revise",
        comp: <CreatePage mode="revise" />,
        notVisible: true,
        noMobile: true,
    },
    {
        icon: <BsPencilSquare size="24px" />,
        text: "Sign Document",
        path: "/sign/*",
        link: "/sign",
        comp: <SearchPage mode="sign" />,
    },
    // {icon: <BsFileEarmarkCheck size="24px"/>, text: "Verify Document", path: "/verify", link: "/verify", comp: <VerifyPage/>},
    {
        icon: <BsFileText size="24px" />,
        text: "Manage Form",
        path: "/form/*",
        link: "/form",
        comp: <Form />,
        noMobile: true,
    },
    {
        icon: <BsGear size="24px" />,
        text: "Manage Procedure",
        path: "/procedure/*",
        link: "/procedure",
        comp: <Procedure />,
        noMobile: true,
    },
    // {icon: <BsEggFill size="24px"/>, text: "React Playground", path: "/playground/*", link: "/playground", comp: <Playground/>, noMobile: true},
]

export default pageList
