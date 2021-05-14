import React from 'react';
import SideBar from './SideBar';
import styled from 'styled-components';
import pageList from '../pageList';
import {Router} from '@reach/router'
import FileView from './FileView';
const PageContainer = styled.div`
    display: flex;
    height: 100%;
    
`

const BodyContainer = styled.div`
    flex: 18;
    height: 100%;
    & .router {
        height: 100%;
    }
`

const MainPage = () => {
    return (
        <PageContainer>
            <SideBar/>
            <BodyContainer className="abc">
                <Router className="router">
                {
                    pageList.map(page => {
                        return React.cloneElement(page.comp, {key: page.text, path: page.path})
                    })
                }
                    <FileView path="/fileview"/>
                </Router>
            </BodyContainer>
        </PageContainer>
    )
}

export default MainPage;
