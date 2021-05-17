import React from 'react'
import {BsHouse, BsSearch, BsFileEarmarkPlus, BsPencilSquare, BsFileEarmarkCheck, BsGear} from 'react-icons/bs'
import HomePage from './components/Home'
import CreatePage from './components/Create'
import SearchPage from './components/Search'
import SignPage from './components/Sign'
import VerifyPage from './components/Verify'
import PlaygroundPage3 from './components/Playground3'
import Form from './components/Form'
const pageList = [
    {icon: <BsHouse size="24px"/>, text: "Home", path: "/", link: "/", comp: <HomePage/>},
    {icon: <BsSearch size="24px"/>, text: "Search", path: "/search", link: "/search", comp: <SearchPage/>},
    {icon: <BsFileEarmarkPlus size="24px"/>, text: "Create", path: "/create", link: "/create", comp: <CreatePage/>},
    {icon: <BsPencilSquare size="24px"/>, text: "Sign", path: "/sign", link: "/sign", comp: <SignPage/>},
    {icon: <BsFileEarmarkCheck size="24px"/>, text: "Verify", path: "/verify", link: "/verify", comp: <VerifyPage/>},
    {icon: <BsGear size="24px"/>, text: "Form", path: "/form/*", link: "/form", comp: <Form/>},
    {icon: <BsGear size="24px"/>, text: "Playground3", path: "/playground3/*", link: "/playground3", comp: <PlaygroundPage3/>},
]

export default pageList