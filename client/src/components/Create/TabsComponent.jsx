/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import styled from "styled-components";
import CardApproval from "./CardApproval";
import DropdownMenu from "./DropdownMenu";
import { getFader } from "../../utils/color";
import { GoTriangleLeft,BiCheckboxChecked,BiCheckbox } from "react-icons/all";

const StyleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20rem;

  & .tabitem--active {
    background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    color: ${(props) => props.theme.color.text.primary};

    transition: 0.4s all;

      & .triangle-active{
        display:block;
        color: ${props => props.theme.color.text.secondary};
        position: absolute;
        top: 50%; right:-3%;
        -webkit-transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
      }
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
  background-color: ${(props) => props.theme.color.background.secondary};
`;
const TabItem = styled.div`
  padding: 0.5rem;

  position: relative;
  overflow: hidden;
`;
const NamesTab =styled.span`
  display:flex;
  align-items: center;
  & .iconcheck{
    flex: 1;
  }
  & .check-active{
      color: ${props => props.theme.color.fill.success};
  }
  & p{
    flex: 10;
    padding-right: 1rem;
  }
  & .triangle-active {
    display: none;
  }
`
const Content = styled.div`
  flex: 2;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.color.border.primary};

  padding: 0.5rem;
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

const TabsComponent = ({ tabItems, dataForm, handleFile, count, isActive, setIsActive ,handleFormValue,setValueDB}) => {
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
        {tabItems.map(({ id, name_required,data }) => (
          <TabItemComponent
            key={id}
            data={data}
            name_required={name_required}
            onItemClicked={() => setActive(id)}
            isActive={active === id}
          />
        ))}
      </StyleTabs>
      <Content className="content">
        {tabItems.map((val) => {
          return active === val.id ? (
            <>
              <DropdownMenu 
              isActive={isActive}
              setIsActive={setIsActive}
              val={val} 
              handleFile={handleFile} 
              handleFormValue={handleFormValue} 
              dataForm={dataForm} 
              setValueDB={setValueDB}
              label="Attach File"/>
              <CardList>
                {val.data &&
                  val.data.map((val) => {
                    return <CardApproval key={val.id} approvalData={val} />;
                  })}
              </CardList>
            </>
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
  data = [],
  onItemClicked = () => console.error("You passed no action to the component"),
  isActive = false,
}) => {
  return (
    <TabItem
      className={!isActive ? "tabitem" : "tabitem tabitem--active"}
      onClick={onItemClicked}
    >
      <NamesTab>
        {(data.length > 0) ? <BiCheckboxChecked className="iconcheck check-active" size="1.5rem"/> : <BiCheckbox className="iconcheck check-unactive" size="1.5rem"/>}
        <p className="tabitem__title">{name_required} ({data.length})</p>
        <GoTriangleLeft className="triangle-active" size="1.5rem"/>
      </NamesTab>
    </TabItem>
  );
};

export default TabsComponent;
