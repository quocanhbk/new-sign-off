/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import Searchbar from "components/Searchbar";
import { BsGear } from "react-icons/bs";
import useClickOutside from "hooks/useClickOutside";
import FilterPopup from './FilterPopup'
import { getFader } from "utils/color";
const StyleToolbar = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 1rem 0 0.5rem;
  position: relative;
`;

const IconWrapper = styled.button`
	color: ${(props) => props.theme.color.fill.primary};
	background-color: transparent;
	border: none;
	height: 2.5rem;
	width: 2.5rem;
	border-radius: 99px;
	border: 1px solid ${props => props.theme.color.border.primary};
	cursor: pointer;
	display: grid;
	place-items: center;

	${props => props.active && css`
		background: ${props => props.theme.color.fill.primary};
		color: ${props => props.theme.color.background.primary};
	`}

	&:hover {
		background: ${(props) => !props.active && getFader(props.theme.color.border.primary, 0.5)};
	}
`;
const popOut = keyframes`
	from {
		opacity: 0;
		transform: scaleY(0.1);
	}
	to {
		opacity: 1;
		transform: scaleY(1);
	}
`
const PopupWrapper = styled.div`
	position: absolute;
	right: 0;
	top: 110%;
	width: 90%;
	z-index: 22;
	border: 2px solid ${(props) => props.theme.color.border.primary};
	background: ${(props) => props.theme.color.background.primary};
	border-radius: 0.5rem;
	box-shadow: ${props => props.theme.shadow};
	transform-origin: top right;
  	animation: ${popOut} 0.25s ease-in-out 0s 1 forwards normal;
`;

function ListToolbar({setQueryTitle, query, set}) {
	const [settingPopup, setSettingPopup] = useState(false);
	const [searchText, setSearchText] = useState("");
	const popupRef = useRef()
	useEffect(() => {
		const timeOutId = setTimeout(() => setQueryTitle(searchText), 250);
		return () => clearTimeout(timeOutId);
	}, [searchText]);

	const ref1 = useClickOutside(() => {
		setSettingPopup(false);
	}, popupRef.current);

	const handlePopup = (type) => {
		if (type === "filter") {
			setSettingPopup(!settingPopup);
		}
	};

	return (
		<StyleToolbar>
			<Searchbar search={searchText} setSearch={setSearchText} />
			<IconWrapper ref={popupRef} active={settingPopup}>
				<BsGear size="1.2rem" onClick={() => handlePopup("filter")} />
			</IconWrapper>
			{settingPopup && 
				<PopupWrapper ref={ref1}>
					<FilterPopup
						query={query}
						set={set}
					/>
				</PopupWrapper>
			}
		</StyleToolbar>
	);
}

export default ListToolbar;
