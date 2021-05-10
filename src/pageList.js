import React from 'react'
import {BsHouse, BsSearch, BsFileEarmarkPlus, BsPencilSquare, BsFileEarmarkCheck, BsFileEarmarkMinus} from 'react-icons/bs'
import HomePage from './components/Home'
import CreatePage from './components/Create'
import DeletedPage from './components/Deleted'
import SearchPage from './components/Search'
import SignPage from './components/Sign'
import CompletedPage from './components/Completed'


const pageList = [
    {icon: <BsHouse size="24px"/>, text: "Home", path: "/", comp: <HomePage/>},
    {icon: <BsSearch size="24px"/>, text: "Search Document", path: "/search", comp: <SearchPage/>},
    {icon: <BsFileEarmarkPlus size="24px"/>, text: "Create Document", path: "/create", comp: <CreatePage/>},
    {icon: <BsPencilSquare size="24px"/>, text: "Sign Document", path: "/sign", comp: <SignPage/>},
    {icon: <BsFileEarmarkCheck size="24px"/>, text: "Completed Document", path: "/completed", comp: <CompletedPage/>},
    {icon: <BsFileEarmarkMinus size="24px"/>, text: "Deleted Document", path: "/deleted", comp: <DeletedPage/>},
]

export default pageList