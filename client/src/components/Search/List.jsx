import React from 'react';
import styled from 'styled-components'
import Card from './Card';
import ListToolbar from './ListToolbar';

const StyleListWrapper =styled.div`
    flex: 5;
    background-color: ${(props) => props.theme.color.background.primary};
    color: ${(props) => props.theme.color.text.primary};
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 0.5rem;
`
const TagBar = styled.div`
  display: flex;
  gap: 0.5rem;
  height: 2.5rem;
  align-items: center;
`;
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CardList = styled.div`
    width: 100%;
    flex: 1;
    
    display:flex;
    flex-direction: column;
    
    gap: 0.5rem;
`
const data = [
    {
        id: 1,
        title: 'Đề nghị thanh toán chi phí tiếp khách hàng abc def transform',
        deadline: '04/05/2021',
        status: 'Approved',
        approved: 'Flexible',
        create_by: 'Nguyễn Văn Chuối',
        create_date: '01/05/2021'
    },
    {
        id: 2,
        title: 'Đề nghị thanh toán chi phí tiếp khách hàng abc def transform',
        deadline: '04/05/2021',
        status: 'Stoped',
        approved: 'Flexible',
        create_by: 'Nguyễn Văn Chuối',
        create_date: '01/05/2021'
    },
    {
        id: 3,
        title: 'Đề nghị thanh toán chi phí tiếp khách hàng abc def transform',
        deadline: '04/05/2021',
        status: 'Pending',
        approved: 'Process',
        create_by: 'Nguyễn Văn Chuối',
        create_date: '01/05/2021'
    },
    {
        id: 4,
        title: 'Đề nghị thanh toán chi phí tiếp khách hàng abc def transform',
        deadline: '04/05/2021',
        status: 'Rejected',
        approved: 'Flexible',
        create_by: 'Nguyễn Văn Chuối',
        create_date: '01/05/2021'
    },
]
function List() {
    return (
        <StyleListWrapper>
            <ListToolbar/>
            <TagBar>
                <p>Filter: </p>
                <TagContainer>
                Dữ liệu ảo
                </TagContainer>
            </TagBar>
            <CardList>
                {data.map((task) => (
                    <Card
                    key={task.Id}
                    title={task.title}
                    deadline={task.deadline}
                    status={task.status}
                    approved={task.approved}
                    create_by={task.create_by}
                    />
                ))}
            </CardList>
        </StyleListWrapper>
    );
}

export default List;