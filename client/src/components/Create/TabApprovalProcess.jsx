/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components'
import TabsComponent from './TabsComponent'

const StyleWrapper = styled.div`
    display:flex;
    width: 100%;
`

function TabApprovalProcess({data, setData, dataForm}) {    
    const [count, setCount] = useState(0)
    const [isActive,setIsActive] = useState(false)
    const [valueDB, setValueDB] = useState()

    const handleFile = (e,id) =>{
        let newData = data
        let currentApprovalData = newData.approvalDocument.find(doc => doc.id === id)
        currentApprovalData.data = [...currentApprovalData.data,{
            id : Math.random(),
            name: "",
            file_name: e.target.files[0].name,
            file_data: e.target.files[0],
            data_field: [],
        }
        ]
        setCount(count+1)
        setData(newData)
        setIsActive(false)
    }

    const handleFormValue = (e,id) =>{
        let newData = data
        let currentApprovalData = newData.approvalDocument.find(doc => doc.id === id)
        currentApprovalData.data = [...currentApprovalData.data,{
            id : Math.random(),
            name: "",
            file_name: valueDB,
            file_data: [],
            data_field: [],
        }
        ]
        setData(newData)
        setIsActive(false)
    }
    return (
        <StyleWrapper>
            <TabsComponent 
            tabItems={data.approvalDocument} 
            dataForm={dataForm} 
            handleFile={handleFile}
            setValueDB={setValueDB} 
            count={count}
            setIsActive={setIsActive}
            isActive={isActive}
            handleFormValue={handleFormValue}
            />
        </StyleWrapper>
    );
}

export default TabApprovalProcess;