/* eslint-disable no-unused-vars */
import React from 'react'
import {BsHouse, BsSearch, BsFileEarmarkPlus, BsPencilSquare, BsFileEarmarkCheck, BsFileText, BsGear, BsEggFill} from 'react-icons/bs'
import HomePage from './components/Home'
import NewHomePage from './components/NewHome'
import CreatePage from './components/Create'
import SearchPage from './components/Search'
import Form from './components/Form'
import Procedure from './components/Procedure'
import Playground from 'components/Verify'
const pageList = [
    {icon: <BsHouse size="24px"/>, text: "Home", path: "/", link: "/", comp: <HomePage/>},
    {icon: <BsHouse size="24px"/>, text: "New Home (Prototype)", path: "/newhome", link: "/newhome", comp: <NewHomePage/>},
    {icon: <BsSearch size="24px"/>, text: "Search Document", path: "/search/*", link: "/search", comp: <SearchPage/>},
    {icon: <BsFileEarmarkPlus size="24px"/>, text: "Create Document", path: "/create", link: "/create", comp: <CreatePage/>},
    {icon: <BsPencilSquare size="24px"/>, text: "Sign Document", path: "/sign/*", link: "/sign", comp: <SearchPage mode="sign"/>},
    // {icon: <BsFileEarmarkCheck size="24px"/>, text: "Verify Document", path: "/verify", link: "/verify", comp: <VerifyPage/>},
    {icon: <BsFileText size="24px"/>, text: "Manage Form", path: "/form/*", link: "/form", comp: <Form/>},
    {icon: <BsGear size="24px"/>, text: "Manage Procedure", path: "/procedure/*", link: "/procedure", comp: <Procedure/>},
    {icon: <BsEggFill size="24px"/>, text: "React Playground", path: "/playground/*", link: "/playground", comp: <Playground/>},

]

export default pageList