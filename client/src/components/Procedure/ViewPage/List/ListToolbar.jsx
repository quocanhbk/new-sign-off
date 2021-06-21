/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import Searchbar from "../../../Searchbar";

const StyleToolbar = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 1rem 0 0.5rem;
`;

function ListToolbar({search, setSearch}) {
  
  return (
    <StyleToolbar>
      <Searchbar search={search} setSearch={setSearch}/>
    </StyleToolbar>
  );
}

export default ListToolbar;
