import React from 'react'
import styled from "styled-components";
import FlowSection from './FlowSection';

const Container = styled.div`
    & table {
        border-collapse: collapse;
    }
`
const data = {
    submitter: [{
        name: "La Quoc Anh",
        email: "anh.lq@ttgvn.com",
        status: "Done"
    }],
    advisor: [
        {name: "Ngo Kim Son", email: "son.nk@ttgvn.com", status: "Waiting"},
        {name: "Le Hoang Vu", email: "vu.lh@ttgvn.com", status: "Rejected"},
    ],
    approver: [
        {name: "Tran Thach Thao", email: "thao.tt@ttgvn.com", status: "Waiting"},
        {name: "Nguyen Hoang Tan", email: "tan.nh@ttgvn.com", status: "Waiting", last: true},
    ]
}
const ApprovalFlow = () => {
    return (
        <Container>
            <table>
                <tbody>
                    <FlowSection headline="Submitter" data={data.submitter} type="submitter"/>
                    <FlowSection headline="Advisor" data={data.advisor} type="advisor"/>
                    <FlowSection headline="Approver" data={data.approver} type="approver"/>
                </tbody>
            </table>
        </Container>
    )
}

export default ApprovalFlow