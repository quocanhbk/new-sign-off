import React, { useEffect } from 'react';
import SideBar from './SideBar'
import styled from 'styled-components';
import pageList from '../pageList';
import {Router} from '@reach/router'
import { useStoreActions } from 'easy-peasy';
const PageContainer = styled.div`
    display: flex;
    height: 100%;
    max-width: 1464px;
    width: 100%;
    background: ${props => props.theme.color.background.primary};
    border-left: 1px solid ${props => props.theme.color.border.primary};
    border-right: 1px solid ${props => props.theme.color.border.primary};
`

const BodyContainer = styled.div`
    flex: 18;
    height: 100%;
    & .router {
        height: 100%;
    }
`

const MainPage = () => {
    const getUsers = useStoreActions(s => s.getUsers)
    const getForms = useStoreActions(s => s.getForms)
    useEffect(() => {
        getUsers()
        getForms()
    })
    return (
        <PageContainer className="main">
            <SideBar/>
            <BodyContainer>
                <Router className="router">
                {
                    pageList.map(page => {
                        return React.cloneElement(page.comp, {key: page.text, path: page.path})
                    })
                }
                </Router>
            </BodyContainer>
        </PageContainer>
    )
}

export default MainPage;
