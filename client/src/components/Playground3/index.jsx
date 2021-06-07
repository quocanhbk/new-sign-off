/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import Calendar from '../Calendar'
import TeamsCalendar from '../TeamsCalendar'
const Container = styled.div`
    display:flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    & .router {
        height: 100%;
    }
    padding: 5rem;
`

const Playground3 = () => {
    const [myDate, setMyDate] = useState((new Date()).toDateString())
    // myDate is a date string, to convert to date type, use new Date(myDate)
    return (
        <Container>
            <TeamsCalendar value={myDate} onChange={newDateString => setMyDate(newDateString)}/>
        </Container>
    )
}

export default Playground3