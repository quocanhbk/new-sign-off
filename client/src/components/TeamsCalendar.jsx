/* eslint-disable react/prop-types */
import React, {useState, useRef} from 'react'
import styled, { css, keyframes } from 'styled-components'
import {FiChevronLeft,FiChevronRight} from 'react-icons/all'
import {getFader} from '../utils/color'
import useClickOutside from '../hooks/useClickOutside'
import useKeyEvent from '../hooks/useKeyEvent'
import PropTypes from 'prop-types'
const calendarData = {
    dayName: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: [
        {id: 0, name: 'January'},
        {id: 1, name: 'February'},
        {id: 2, name: 'March'},
        {id: 3, name: 'April'},
        {id: 4, name: 'May'},
        {id: 5, name: 'June'},
        {id: 6, name: 'July'},
        {id: 7, name: 'August'},
        {id: 8, name: 'September'},
        {id: 9, name: 'October'},
        {id: 10, name: 'November'},
        {id: 11, name: 'December'}
    ],
    days: [
        {id: 0, name: 'Sunday'},
        {id: 1, name: 'Monday'},
        {id: 2, name: 'Tuesday'},
        {id: 3, name: 'Wednesday'},
        {id: 4, name: 'Thursday'},
        {id: 5, name: 'Friday'},
        {id: 6, name: 'Saturday'}
    ]
}
const Container = styled.div`
    position: relative;
    margin: ${props => props.demo ? "8px" : "0"};
    display: ${props => props.fullWidth ? "block" : "inline-block"};
    width: ${props => props.fullWidth ? "100%" : "auto"};
`;
const StyledSpan = styled.span`
    position: absolute;
    left: 100%;
    transform: translateX(-100%);
    top: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 0.25rem;
    border-left: 1px solid ${props => props.focus ? props.theme.color.fill.primary : props.theme.color.border.primary};
    svg {
        padding: 0 2px;
    }
`;
const Input = styled.input`
    color: ${props => props.theme.color.text.primary};
    padding: 6px 48px 6px 8px;
    height: 2rem;
    width: 100%;
    border: 1px solid ${props => props.focus ? props.theme.color.fill.primary : props.theme.color.border.primary};
    //box-shadow: 0 0 1px ${props => props.focus ? "4px" : "0px"} ${props => getFader(props.theme.color.fill.primary, 0.15)};
    outline: 0;
    border-radius: 5px;
    font-size: ${props => props.theme.textSize.medium};
    transition: border 0.15s linear;
    //pointer-events: ${props => props.displayMode !== "edit" ? "none" : "auto"};
    background-color: ${props => props.theme.color.background.secondary};
    pointer-events: none;
    
    &:disabled {
        color: ${props => props.theme.color.text.disabled};
        border-color: ${props => props.theme.color.fill.disabled};
    }
`;
const popupCalendar = keyframes`
    from {max-height: 0px; opacity: 0;}
    to {max-height: 350px; opacity: 1;}
`;
const StyledCalendar = styled.div`
    position: absolute;
    display: flex;
    z-index: 999;
    width: 480px;
    border: 1px solid ${props => props.theme.color.border.primary};
    box-shadow: ${props => props.theme.shadow};
    border-radius: 8px;
    overflow: hidden;
    top: ${props => props.bottom ? "110%" : "auto"};
    bottom: ${props => props.bottom ? "auto" : "110%"};
    left: ${props => props.left ? "auto" : "100%"};
    transform: ${props => props.left ? "translate(0%, 0)" : "translate(-100%, 0)"};
    transition: all 1s linear;
    animation: ${popupCalendar} 0.25s ease-out 0s 1 forwards normal;
    background: ${props => props.theme.color.background.primary};
    padding-bottom: 0.5rem;
`;
const Left = styled.div`
    flex: 7;
    
`
const Right = styled.div`
    flex: 6;
`
const CalendarHead = styled.div`
    width: 100%;
    background: ${props => props.theme.color.background.primary};
    padding: 0.5rem;
    display: flex;
    align-items: center;
    font-size: ${props => props.theme.textSize.medium};
    user-select: none;
`
const IconGroup = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
`
const StyledCalendarDate = styled.div`
    border-bottom: 1px solid ${props => props.theme.color.fill.primary};
    color: ${props => props.theme.color.fill.primary};
    font-weight: 700;
`
const StyledCalendarBar = styled.ul`
    display: flex;
    width: 100%;
    padding: 4px;
    gap: 4px;
    background: ${props => props.theme.color.background.primary};
    justify-content: center;
    flex-wrap: wrap;
    user-select: none;
    border-left: 1px solid ${props => props.theme.color.border.primary};
`
const CalendarContent = styled.ul`
    display: flex;
    width: 100%;
    background: ${props => props.theme.color.background.primary};
    flex-wrap: wrap;
    gap: 4px;
    padding: 4px;
    
`
const StyledMonthItem = styled.li`
    /* width: 44px;
    height: 44px; */
    flex: 1 0 20%;
    background: transparent;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 999px;
    &:before {
        content: '';
        padding-top: 100%;
        display: block;
    }
    &:hover {
        background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    }
    ${props => props.selected && css`
        font-weight: 700;
        color: ${props => props.theme.color.fill.primary};
        background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    `}
`
const StyledLi = styled.li`
    list-style-type: none;
    //width: calc(100%/7);
    flex: 1 0 12%;
    border-radius: 99px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    cursor: pointer;
    user-select: none;
    &:before {
        content: '';
        padding-top: 100%;
        display: block;
    }
    &.date-item {
        background: ${props => props.selected ? getFader(props.theme.color.border.primary, 0.5) : "transparent"};
        color: ${props => props.selected ? props.theme.color.fill.primary : props => props.current ? props.theme.color.text.primary : getFader(props.theme.color.text.primary, 0.6)};
        font-weight: ${props => props.selected ? 700 : 400};
    }
    &.date-item:hover {
        background: ${props => getFader(props.theme.color.border.primary, 0.5)};
    }
    
    &.date-title {
        color: ${props => props.theme.color.fill.primary};
        font-weight: 500;
    }
`;

function Calendar({value, onChange}) {
    const closePopup = () => setPopup(false)
    const [position, setPosition] = useState('bottom')
    const [viewMonth, setViewMonth] = useState(true)
    const [popup, setPopup] = useState(false)
    
    let ref = useClickOutside(closePopup)
    let {dayName, months} = calendarData
    let date = useRef(new Date(value ? value : (new Date()).toDateString()))
    useKeyEvent("Escape", () => {if (popup) setPopup(false)})
    
    const getMonthName = (id) => months.find(month => month.id === id).name
    const [yearState, setYearState] = useState(date.current.getFullYear())
    const [firstYear, setFirstYear] = useState(yearState - yearState % 10)
    const getDaysInMonth = (m, y) => {
        m += 1;
        return /8|3|5|10/.test(--m)?30:m===1?(!(y%4)&&y%100)||!(y%400)?29:28:31;
    }
    const updateCalendarTable = () => {
        var dayofmonth = []
        let id = 0;
        let previousNumDate = getDaysInMonth(date.current.getMonth() - 1)
        //get day of week of the first day of the month
        var x = new Date(`${date.current.getFullYear()}-${date.current.getMonth() + 1}-01`).getDay()

        for (var i = 1 - (x + 6 ) % 7; i <= getDaysInMonth(date.current.getMonth(), date.current.getFullYear()); i++) {
            if (i <= 0) { dayofmonth.push({id: id, month: "previous", value: previousNumDate + i}) }
            else { dayofmonth.push({id: id, month: "current", value: i}) }
            id++
        }
        for (var j = 0; j < dayofmonth.length % 7; j++) {
            dayofmonth.push({id: id, month: "next", value: j + 1})
            id++
        }
        return dayofmonth
    }
    // calendar table
    const [calendar, setCalendar] = useState(updateCalendarTable())

    const swipe = (type) => {
        date.current.setMonth(date.current.getMonth() + (type === "next" ? 1 : -1), 1)
        if ((type === "next" && date.current.getMonth() === 0) || (type === "prev" && date.current.getMonth() === 11))
            setYearState(date.current.getFullYear())
        setCalendar(updateCalendarTable())
    }
    const updateMonth = (month) => {
        date.current.setMonth(month)
        date.current.setFullYear(yearState)
        setCalendar(updateCalendarTable())
    }
    const swipeYear = (type) => {
        date.current.setFullYear(date.current.getFullYear() + (type === "next" ? 1 : -1))
        setYearState(yearState + (type === "next" ? 1 : -1))
        setCalendar(updateCalendarTable())
    }
    const swipe12 = (type) => {
        setFirstYear(firstYear + (type === "next" ? 12 : -12))
    }
    const selectDate = (day) => {
        date.current.setMonth(date.current.getMonth() + (day.month === "previous" ? -1 : day.month === "next" ? 1 : 0))
        date.current.setDate(day.value)
        onChange(date.current.toDateString())
        closePopup()
        setCalendar(updateCalendarTable())
    }
    const displayYear = () => {
        return firstYear + " - " + (firstYear + 11)
    }
    const selectYear = (year) => {
        date.current.setFullYear(year)
        setYearState(year)
        setCalendar(updateCalendarTable())
        setViewMonth(true)
    }
    const render12Year = () => {
        let arr = []
        for (let i = firstYear; i < firstYear + 12; i++) {
            arr.push(
                <StyledMonthItem onClick={() => selectYear(i)}>
                    {i}
                </StyledMonthItem>
            )
        }
        return arr
    }
    const clickIcon = () => {
        if (!popup) {
            //calculate the space at the bottom
            let h = window.innerHeight - ref.current.getBoundingClientRect().y
            let w = ref.current.getBoundingClientRect().x + ref.current.getBoundingClientRect().width
            let ph = h < 250 ? "top" : "bottom"
            let pw = w < 250 ? "left" : "right"
            setPosition([pw, ph])
        }
        setPopup(!popup)
    }
    return (
        <Container ref={ref}>
            <Input 
                focus={popup} 
                type="text" 
                value={value && (new Date(value)).getDate().toLocaleString(undefined, {minimumIntegerDigits: 2}) + " / " + ((new Date(value)).getMonth()+1).toLocaleString(undefined, {minimumIntegerDigits: 2}) +  " / " + (new Date(value)).getFullYear()}
                readOnly
            />
            <StyledSpan onClick={clickIcon} focus={popup}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </StyledSpan>
            {popup && 
            <StyledCalendar bottom={position[1] === "bottom"} left={position[0] === "left"}>
                <Left>
                    <CalendarHead>
                        <StyledCalendarDate >
                            {getMonthName(date.current.getMonth()) +  " " + date.current.getFullYear()}
                        </StyledCalendarDate>
                        <IconGroup>
                            <FiChevronLeft size="1.2rem" onClick={() => swipe('prev')}>Prev</FiChevronLeft>
                            <FiChevronRight size="1.2rem" onClick={() => swipe('next')}>Next</FiChevronRight>
                        </IconGroup> 
                    </CalendarHead>
                    <StyledCalendarBar>
                        {dayName.map(day => <StyledLi className="date-title" key={day}>{day}</StyledLi>)}
                    </StyledCalendarBar>
                    <CalendarContent>
                        {calendar.map(
                            day => 
                                <StyledLi
                                    current={day.month === "current"}
                                    className="date-item" 
                                    key={day.id} 
                                    onClick={() => selectDate(day)} 
                                    selected={value && day.value === (new Date(value)).getDate() && day.month === "current" && date.current.getMonth() === (new Date(value)).getMonth()}>
                                    {day.value}
                                </StyledLi>)
                        }
                    </CalendarContent>
                </Left>
                <Right>
                    {viewMonth ? 
                        <>
                            <CalendarHead>
                                <StyledCalendarDate onClick={() => {setViewMonth(!viewMonth); setFirstYear(yearState - yearState % 10)}}>
                                    {yearState}
                                </StyledCalendarDate>
                                <IconGroup>
                                    <FiChevronLeft size="1.2rem" onClick={() => swipeYear('prev')}>Prev</FiChevronLeft>
                                    <FiChevronRight size="1.2rem" onClick={() => swipeYear('next')}>Next</FiChevronRight>
                                </IconGroup>
                            </CalendarHead>
                            <StyledCalendarBar>
                                {months.map(month => 
                                    <StyledMonthItem key={month.id} selected={month.id === date.current.getMonth()} onClick={() => updateMonth(month.id)}>
                                        {month.name.slice(0, 3)}
                                    </StyledMonthItem>)
                                }
                            </StyledCalendarBar>
                        </>
                    :    
                        <>
                            <CalendarHead>
                                <StyledCalendarDate onClick={() => setViewMonth(!viewMonth)}>
                                    {displayYear()}
                                </StyledCalendarDate>
                                <IconGroup>
                                    <FiChevronLeft size="1.2rem" onClick={() => swipe12('prev')}>Prev</FiChevronLeft>
                                    <FiChevronRight size="1.2rem" onClick={() => swipe12('next')}>Next</FiChevronRight>
                                </IconGroup>
                            </CalendarHead>
                            <StyledCalendarBar>
                                {render12Year()}
                            </StyledCalendarBar>
                        </>
                    }
                </Right>
            </StyledCalendar>
            }
        </Container>
    )
}

Calendar.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
}

Calendar.defaultProps = {
    value: (new Date()).toDateString(),
    onChange: () => {}
}

export default Calendar