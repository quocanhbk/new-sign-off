/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import styled from "styled-components";
import CardApproval from "./CardApproval";
import DropdownMenu from "./DropdownMenu";
import FileUpload from "./FileUpload";
import Combox from "../Combox";
import { getFader } from "../../utils/color";

const StyleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  height: 20rem;

  & .tabitem--active {
    background: ${(props) => props.theme.color.text.secondary};
    color: ${(props) => props.theme.color.border.primary};

    transition: 0.4s all;
  }
`;
const StyleTabs = styled.div`
  position: relative;
  flex: 1;
  border: 0;
  border-radius: 0;
  cursor: pointer;
  outline: none;
  font-size: 1rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  font-weight: bold;
  color: ${(props) => props.theme.color.text.primary};
  background: transparent;
  transition: 0.4s all;
  background-color: ${(props) => props.theme.color.border.primary};
`;
const TabItem = styled.div`
  padding: 0.5rem 1rem;
`;
const Content = styled.div`
  flex: 2;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  overflow: auto;
  position: relative;
  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => getFader(props.theme.color.fill.secondary, 0.5)};
    border-radius: 99px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.color.fill.secondary};
  }
`;
const ContentRight = styled.div`

`;
const TabsComponent = ({ tabItems, dataForm, handleFile, handleForm, count, isActive, setIsActive }) => {
  const [active, setActive] = useState(tabItems[0].id);
  useEffect(() => {
    // console.log(count)
  },[count])

  useEffect(() => {
    setIsActive(false)
  },[active])

  return (
    <StyleWrapper className="wrapper">
      <StyleTabs className="tabs">
        {tabItems.map(({ id, name_required }) => (
          <TabItemComponent
            key={id}
            name_required={name_required}
            onItemClicked={() => setActive(id)}
            isActive={active === id}
          />
        ))}
      </StyleTabs>
      <Content className="content">
        {tabItems.map((val) => {
          return active === val.id ? (
            <ContentRight>
              <DropdownMenu isActive={isActive} setIsActive={setIsActive} val={val} handleFile={handleFile} handleForm={handleForm} dataForm={dataForm} label="Attach File"/>
              <CardList>
                {val.data &&
                  val.data.map((val) => {
                    return <CardApproval key={val.id} approvalData={val} />;
                  })}
              </CardList>
            </ContentRight>
          ) : (
            ""
          );
        })}
      </Content>
    </StyleWrapper>
  );
};

const TabItemComponent = ({
  name_required = "",
  onItemClicked = () => console.error("You passed no action to the component"),
  isActive = false,
}) => {
  return (
    <TabItem
      className={!isActive ? "tabitem" : "tabitem tabitem--active"}
      onClick={onItemClicked}
    >
      <p className="tabitem__title">{name_required}</p>
    </TabItem>
  );
};

export default TabsComponent;
