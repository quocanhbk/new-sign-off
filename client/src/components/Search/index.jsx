import React, { useState } from 'react'
import styled from 'styled-components'
import DisplayContent from './DisplayContent'
import List from './List'

const StyleContainer = styled.div`
    display:flex;
    width: 100%;
    height: 100%;
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
        title: 'Đề nghị thanh toán',
        deadline: '04/05/2021',
        status: 'Stopped',
        approved: 'Flexible',
        create_by: 'Nguyễn Văn Chuối',
        create_date: '01/05/2021'
    },
    {
        id: 3,
        title: 'Khách hàng abc def transform',
        deadline: '04/05/2021',
        status: 'Pending',
        approved: 'Process',
        create_by: 'Nguyễn Văn Chuối',
        create_date: '01/05/2021'
    },
    {
        id: 4,
        title: 'Chi phí tiếp khách hàng abc def transform',
        deadline: '04/05/2021',
        status: 'Rejected',
        approved: 'Flexible',
        create_by: 'Nguyễn Văn Chuối',
        create_date: '01/05/2021'
    },
]

const Search = () => {
    const [selectData, setSelectData] = useState([
        {
            approved: "",
            create_by: "",
            create_date: "",
            deadline: "",
            id: null,
            status: "",
            title: "",
        }
    ])
    const [open, setOpen] = useState(false)

    return (
        <StyleContainer>
            <List 
                data={data} 
                setSelectData={setSelectData}
                setOpen={setOpen}
            />
            <DisplayContent selectData={selectData} open={open}/>
        </StyleContainer>
    )
}

export default Search