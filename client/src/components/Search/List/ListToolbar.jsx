/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Searchbar from "components/Searchbar";
import { BsFunnel } from "react-icons/bs";
import useClickOutside from "hooks/useClickOutside";
import FilterPopup from './FilterPopup'
const StyleToolbar = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 1rem 0 0.5rem;
`;
const IconWrapper = styled.button`
  color: ${(props) => props.theme.color.fill.primary};
  background-color: transparent;
  border: none;
  height: 2.5rem;
  padding: 0.5rem;
  border-radius: 99px;
  border: 1px solid ${props => props.theme.color.border.primary};
  /* display: flex;
  align-items: center;
  justify-content: center; */
  cursor: pointer;
  position: relative;

  &:hover {
    background: ${(props) => props.theme.color.border.primary};
  }
`;
const PopupWrapper = styled.div`
	position: absolute;
	right: 0;
	top: 120%;
	z-index: 22;
	border: 1px solid ${(props) => props.theme.color.border.primary};
	background: ${(props) => props.theme.color.background.primary};
	border-radius: 1rem;
`;

function ListToolbar({setQueryTitle, statusSelection}) {
	const [filterPopup, setFilterPopup] = useState(false);
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		const timeOutId = setTimeout(() => setQueryTitle(searchText), 250);
		return () => clearTimeout(timeOutId);
	}, [searchText]);

	const ref1 = useClickOutside(() => {
		setFilterPopup(false);
	});

	const handlePopup = (e, type) => {
		e.preventDefault();
		if (type === "filter") {
		setFilterPopup(!filterPopup);
		}
	};

	return (
		<StyleToolbar>
			<Searchbar search={searchText} setSearch={setSearchText} />
			<IconWrapper ref={ref1}>
				<BsFunnel size="20px" onClick={(e) => handlePopup(e, "filter")} />
				{filterPopup && 
					<PopupWrapper>
						<FilterPopup
							statusSelection={statusSelection}
						/>
					</PopupWrapper>
				}
			</IconWrapper>
		</StyleToolbar>
	);
}

export default ListToolbar;
