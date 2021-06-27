import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {format} from 'date-fns'

const Container = styled.div`
    padding: 1rem 3rem;
    //border: 1px solid ${props => props.theme.color.border.primary};
    border-radius: 1rem;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    & .dashboard-time {
        font-size: 3rem;
        letter-spacing: 1px;
        font-weight: 600;
        color: ${props => props.theme.color.fill.primary};
        transition: all 0.4s ease-in-out;
    }
    transition: all 0.25 ease-in-out;
`

const DateBoard = () => {
    const [time, setTime] = useState(format((new Date()), "HH:mm"))
    useEffect(() => {
        setTimeout(() => {
            setTime(format((new Date()), "HH:mm"))
        }, 60000)
    })

    return (
        <Container>
            <div className="dashboard-time">{time}</div>
            <div className="dashboard-date">{format((new Date()), "eeee, MMMM do")}</div>
        </Container>
    )
}

export default DateBoard