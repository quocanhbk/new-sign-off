/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FileUpload from "./FileUpload";
import Combox from "../Combox";

const StyleDropDownMenu = styled.div`
  position: relative;
  z-index: 99;
`;
const StyleButton = styled.button`
  background: ${props => props.theme.color.fill.success};
  color:  ${props => props.theme.color.background.primary};
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  vertical-align: middle;
  transition: box-shadow 0.4s ease;
  &:focus {
    outline: none;
  }
  & span {
    font-weight: 700;
    vertical-align: middle;
    font-size: 14px;
    margin: 0 0.4rem;
  }
`;
const ContainerMenu = styled.div`
  list-style: none;
  padding: 0;
  margin: 0;
  display: block;
  padding: 0.5rem;
`;
const Item = styled.div`
  border-bottom: ${props => props.theme.color.border.primary};
  display: block;
  &:last-child {
    border: none;
  }
`;
const LinkItem = styled.a`
  text-decoration: none;
  color: #fff;
  padding: 10px 20px;
  display: block;
`;
const NavMenu = styled.nav`
  display: block;
  border: 2px solid ${props => props.theme.color.border.primary};
  background-color: ${props => props.theme.color.background.primary};
  position: absolute;
  z-index: 1;
  top: 100%;
  right: 0;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: opacity 0.4s ease;
  &.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;
const FormSelect = styled.div`
  padding: 0;
`;
const Text = styled.label`
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;

  font-size: 0.9rem;
  color: ${(props) => props.theme.color.text.secondary};

  padding: 0.5rem 0;
`;
const Div = styled.div`
    width: 100%;

    text-align: right;
    padding-top: 1rem;
    & button{
        background: ${props => props.theme.color.fill.success};
        color: ${props => props.theme.color.background.primary};
        cursor: pointer;
        padding: 0.5rem 1rem;
        border: none;
    }
`
const DropdownMenu = (props) => {
  const {isActive , setIsActive, handleFile, dataForm, val,handleFormValue, setValueDB } = props
  // const dropdownRef = useRef(null);
  // useEffect(() => {
  //   const pageClickEvent = (e) => {
  //     if (
  //       dropdownRef.current !== null &&
  //       !dropdownRef.current.contains(e.target)
  //     ) {
  //       setIsActive(!isActive);
  //     }
  //   };

  //   if (isActive) {
  //     window.addEventListener("click", pageClickEvent);
  //   }
  //   return () => {
  //     window.removeEventListener("click", pageClickEvent);
  //   };
  // }, [isActive]);

  return (
    <StyleDropDownMenu>
      <StyleButton onClick={() => setIsActive(!isActive)}>
        <span>{props.label}</span>
      </StyleButton>
      <NavMenu className={`menu ${isActive ? "active" : ""}`}>
        <ContainerMenu>
        <Text>Select form from my computer</Text>
          <FileUpload
            handleFile={(e) => handleFile(e, val.id)}
            name={val.name_required}
          />
          <FormSelect>
            <Text>Select form from database</Text>
            <Combox
              className="combox-form"
              selectTodo={dataForm}
              onSelect={v => setValueDB(v[0])}
              setIsActive={setIsActive}
            >
              {dataForm.map((data, index) => {
                return (
                  <Combox.Option
                    id={data.id}
                    searchText={[data.name]}
                    value={data.name}
                    key={index}
                  >
                    {data.name}
                  </Combox.Option>
                );
              })}
            </Combox>
            <Div>
                <button onClick={(e) => handleFormValue(e,val.id)}>Use form</button>
            </Div>
          </FormSelect>
        </ContainerMenu>
      </NavMenu>
    </StyleDropDownMenu>
  );
};
DropdownMenu.LinkItem = LinkItem;
DropdownMenu.Item = Item;

DropdownMenu.defaultProps = {
  name: "",
  label: "default",
};

DropdownMenu.propTypes = {
  name: PropTypes.string,
  label: PropTypes.any,
};
export default DropdownMenu;