import React, { useState } from 'react'
import './css/Class.css'

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null)

  // Calculate the days to render in the calendar
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const firstDay = new Date(year, month, 1)
  const weekday = firstDay.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Render a day cell in the calendar
  const renderDay = (day) => {
    const date = new Date(year, month, day)
    const isTuesdayThursdaySaturday = [2, 4, 6].includes(date.getDay())

    const handleClick = () => {
      if (isTuesdayThursdaySaturday) {
        setSelectedDate(date)
      }
    }

    return (
      <td key={day} onClick={handleClick}>
        <span className={isTuesdayThursdaySaturday ? 'selectable' : 'disabled'}>
          {day}
        </span>
      </td>
    )
  }

  return (
    <table className="calendarTable">
      <thead>
        <tr>
          <th className="not-selectable">日</th>
          <th className="not-selectable">一</th>
          <th className="selectable">二</th>
          <th className="not-selectable">三</th>
          <th className="selectable">四</th>
          <th className="not-selectable">五</th>
          <th className="selectable">六</th>
        </tr>
      </thead>

      <tbody>
        {Array.from(
          { length: Math.ceil((daysInMonth + weekday) / 7) },
          (_, i) => i
        ).map((week) => (
          <tr key={week}>
            {Array.from({ length: 7 }, (_, i) => i).map((dayOfWeek) => {
              const day = week * 7 + dayOfWeek - weekday + 1
              return day >= 1 && day <= daysInMonth ? (
                renderDay(day)
              ) : (
                <td key={day} />
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Calendar
