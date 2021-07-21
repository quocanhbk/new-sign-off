/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react"
import styled, { css } from "styled-components"
import { BsPower, BsThreeDotsVertical } from "react-icons/bs"
import Avatar from "components/Avatar"
import ThemeToggle from "./ThemeToggle"
import pageList from "pageList"
import { getFader } from "utils/color"
import { useStoreActions, useStoreState } from "easy-peasy"
import { useMsal } from "@azure/msal-react"
import useClickOutside from "hooks/useClickOutside"
import LazyImage from "components/LazyImage"
import { getAvatar } from "api/user"

const SidebarContainer = styled.div`
    background-color: ${(props) => props.theme.color.background.secondary};
    padding-top: 0.5rem;
    width: 100%;
    box-shadow: ${(props) => props.theme.shadow};
    flex: 5;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`

const Logo = styled.img`
    height: 4rem;
`

export const UserDisplayCard = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    margin: 0.5rem 0.5rem 0 0.5rem;
    border: 1px solid ${(props) => props.theme.color.border.primary};
    border-radius: 1rem;
    color: ${(props) => props.theme.color.fill.primary};
    position: relative;

    & img {
        border-radius: 99px;
    }

    & h3 {
        font-size: 1rem;
        color: ${(props) => props.theme.color.text.primary};
    }
    & p {
        font-size: 0.8rem;
        color: ${(props) => props.theme.color.text.secondary};
    }
    & .user-logout {
        cursor: pointer;
        &:hover {
            color: ${(props) => props.theme.color.fill.danger};
        }
    }
`
export const UserDisplayCardInfo = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 1rem;
    /* gap: 0.1rem; */
    & > * + * {
        margin-top: 0.1rem;
    }
`

const NavItem = styled.div`
    padding: 1rem 2rem;
    margin: 0 0.5rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    /* gap: 1rem; */
    cursor: pointer;
    transition: background 0.15s ease-in;
    & > * + * {
        margin-left: 1rem;
    }
    &:hover {
        background-color: ${(props) =>
            getFader(props.theme.color.border.primary, 0.5)};
    }
    ${(props) =>
        props.active &&
        css`
            background: ${(props) =>
                getFader(props.theme.color.border.primary, 0.5)};
            color: ${(props) => props.theme.color.fill.primary};
            font-weight: 600;
            &:hover {
                background: ${(props) => props.theme.color.border.primary};
            }
        `}
`

const NavList = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    color: ${(props) => props.theme.color.text.secondary};
    /* gap: 0.5rem; */
    & > * + * {
        margin-top: 0.5rem;
    }
`
const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    & h1 {
        font-size: calc(1rem + 0.4vw);
        color: ${(props) => props.theme.color.fill.primary};
        font-family: Campton;
    }
`
const Footer = styled.div`
    border-top: 1px solid ${(props) => props.theme.color.border.primary};
    margin-top: auto;
    display: flex;
    align-items: center;
    & .toggleContainer {
        flex: 1;
        border-right: 1px solid ${(props) => props.theme.color.border.primary};
        padding: 0.2rem;
        display: flex;
        justify-content: center;
    }
    & p {
        flex: 2;
        color: ${(props) => props.theme.color.text.secondary};
        font-family: Consolas;
        font-size: 0.8rem;
        padding: 0.2rem;
        display: flex;
        justify-content: center;
    }
`
const OptionPopup = styled.div`
    position: absolute;
    padding: 0.5rem;
    border: 1px solid ${(props) => props.theme.color.border.primary};
    display: flex;
    align-items: center;
    /* gap: 0.5rem; */
    right: 0;
    top: 50%;
    transform: translate(0, 50%);
    cursor: pointer;
    background: ${(props) => props.theme.color.background.primary};
    border-radius: 0.5rem;
    & > * + * {
        margin-left: 0.5rem;
    }
`
const ThreeDotWrapper = styled.div`
    cursor: pointer;
    user-select: none;
`
const SideBar = () => {
    const theme = useStoreState((_) => _.theme)
    const setTheme = useStoreActions((_) => _.setTheme)
    const setPath = useStoreActions((_) => _.setPath)
    const path = useStoreState((_) => _.path)
    const [popup, setPopup] = useState(false)
    const { instance, accounts } = useMsal()
    const name =
        accounts[0].name.split("-")[accounts[0].name.split("-").length - 1]
    const threeDotRef = useRef()
    const optionRef = useClickOutside(
        () => setPopup(false),
        threeDotRef.current
    )
    return (
        <SidebarContainer>
            <Header>
                <Logo
                    src={theme ? "/iconNoTextDark.svg" : "/iconNoTextLight.svg"}
                />
                <h1>TTG Approval Online</h1>
            </Header>

            <UserDisplayCard>
                <LazyImage
                    src={getAvatar(accounts[0].username)}
                    height="48"
                    width="48"
                />
                <UserDisplayCardInfo>
                    <h3>{name}</h3>
                    <p>{accounts[0].username}</p>
                </UserDisplayCardInfo>
                {/* <BsPower className="user-logout" size="20px" onClick={() => instance.logoutRedirect()}/> */}
                <ThreeDotWrapper
                    ref={threeDotRef}
                    onClick={() => setPopup(!popup)}
                >
                    <BsThreeDotsVertical size="20px" />
                </ThreeDotWrapper>
                {popup && (
                    <OptionPopup
                        className="user-logout"
                        ref={optionRef}
                        onClick={() => instance.logoutRedirect()}
                    >
                        <BsPower size="1.2rem" /> Log out
                    </OptionPopup>
                )}
            </UserDisplayCard>

            <NavList>
                {pageList
                    .filter((p) => !p.notVisible)
                    .map((item) => (
                        <NavItem
                            key={item.text}
                            onClick={() => {
                                setPath(item.link)
                            }}
                            active={item.link === path}
                        >
                            {item.icon}
                            <p>{item.text}</p>
                        </NavItem>
                    ))}
            </NavList>

            <Footer>
                <div className="toggleContainer">
                    <ThemeToggle value={theme} onSelect={() => setTheme()} />
                </div>
                <p>Version: v0.99</p>
            </Footer>
        </SidebarContainer>
    )
}

export default SideBar
