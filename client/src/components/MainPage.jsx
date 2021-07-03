import React, { useEffect } from 'react';
import SideBar from './NavBar'
import styled from 'styled-components';
import pageList from '../pageList';
import {Router} from '@reach/router'
import { useStoreActions } from 'easy-peasy';
import useMediaQuery from 'hooks/useMediaQuery';
import BottomBar from 'components/NavBar/BottomBar'
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
const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`
const Main = styled.div`
    flex: 1;
    overflow: hidden;
`
const MainPage = () => {
    const getUsers = useStoreActions(s => s.getUsers)
    const getForms = useStoreActions(s => s.getForms)
    useEffect(() => {
        getUsers()
        getForms()
    }, [])
    let device = useMediaQuery()
    return (
        <PageContainer className="main">
            {device === "PC" && <SideBar/>}
            <BodyContainer>
                <Wrapper className="Wrrappper">
                    <Main className="app-main-body">
                        <Router className="router">
                        {
                            pageList.map(page => {
                                return React.cloneElement(page.comp, {key: page.text, path: page.path})
                            })
                        }
                        </Router>
                    </Main>
                    {device === "PHONE" && <BottomBar/>}
                </Wrapper>
            </BodyContainer>
        </PageContainer>
    )
}

export default MainPage;
