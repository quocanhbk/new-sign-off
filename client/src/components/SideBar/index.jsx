import React from 'react';
import styled, {css} from 'styled-components';
import { BsThreeDotsVertical} from 'react-icons/bs';
import Avatar from '../Avatar';
import ThemeToggle from '../ThemeToggle'
import pageList from '../../pageList'
import { getFader } from '../../utils/color';
import {useStoreActions, useStoreState} from 'easy-peasy'
const SidebarContainer = styled.div`
  background-color: ${props => props.theme.color.background.secondary};
  padding-top: 0.5rem;
  width: 100%;
  box-shadow: ${props => props.theme.shadow};
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Logo = styled.img`
  height: 64px;
`;

const UserDisplayCard = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin: 0.5rem 0.5rem 0 0.5rem;
  border: 1px solid ${props => props.theme.color.border.primary};
  border-radius: 1rem;
  color: ${props => props.theme.color.fill.primary};
  & h3 {
    font-size: 1rem;
    color: ${props => props.theme.color.text.primary};
  }
  & p {
    font-size: 0.8rem;
    color: ${props => props.theme.color.text.secondary};
  }
`;
const UserDisplayCardInfo = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
  gap: 0.1rem;
`;

const NavItem = styled.div`
  padding: 1rem 2rem;
  margin: 0 0.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: background 0.15s ease-in;
  &:hover{
    background-color: ${props => getFader(props.theme.color.border.primary, 0.5)};
  }
  ${props => props.active && css`
    background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    color: ${props => props.theme.color.fill.primary};
    font-weight: 600;
    &:hover {
      background: ${props => props.theme.color.border.primary};

    }
  `}
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  color: ${props => props.theme.color.text.secondary};
  gap: 0.5rem;
`
const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  & h1 {
    font-size: calc(1.0rem + .4vw);
    color: ${props => props.theme.color.fill.primary};
    font-family: Campton;
  }
`
const Footer = styled.div`
  border-top: 1px solid ${props => props.theme.color.border.primary};
  margin-top: auto;
  display: flex;
  align-items: center;
  & .toggleContainer {
    flex: 1;
    border-right: 1px solid ${props => props.theme.color.border.primary};
    padding: 0.2rem;
    display: flex;
    justify-content: center;
  }
  & p {
    flex: 2;
    color: ${props => props.theme.color.text.secondary};
    font-family: Consolas;
    font-size: 0.8rem;
    padding: 0.2rem;
    display: flex;
    justify-content: center;
  }
`
const SideBar = () => {
  const theme = useStoreState(_ => _.theme)
  const setTheme = useStoreActions(_ => _.setTheme)
  const setPath = useStoreActions(_ => _.setPath)
  const path = useStoreState(_ => _.path)
  
  return (
    <SidebarContainer>
      <Header>
        <Logo src={theme ? '/iconNoTextDark.svg' : '/iconNoTextLight.svg'} />
        <h1>TTG Approval Online</h1>
      </Header>
      <UserDisplayCard>
        <Avatar src={`/avatar.png`} />
        <UserDisplayCardInfo>
          <h3>John Doe</h3>
          <p>johndoe@email.com</p>
        </UserDisplayCardInfo>
        <BsThreeDotsVertical size="20px"/>
      </UserDisplayCard>
      <NavList>
        {pageList.map(item => 
          <NavItem key={item.text} onClick={() =>{setPath(item.link)}} active={item.link === path}>
            {item.icon}
            <p>{item.text}</p>
          </NavItem>  
        )}
      </NavList>
      <Footer>
        <div className="toggleContainer">
          <ThemeToggle value={theme} onSelect={() => setTheme()}/>
        </div>
        <p>Version: v0.01</p>
      </Footer>
    </SidebarContainer>
  );
};

export default SideBar;