import { addDays, addWeeks, format, getWeeksInMonth, startOfMonth, startOfWeek } from 'date-fns'
import React, { useContext, useMemo } from 'react'
import { ReactanggalContext } from '../context'
import { myGetYearStart } from '../helpers'
import Months from './Months'
import Week from './Week'
import Years from './Years'

const CalendarBody = () => {
  const { step, preSelection, preSelectionYear } = useContext(ReactanggalContext)

  const renderDayNames = useMemo(() => {
    let weekStart = startOfWeek(new Date())
    return [0, 1, 2, 3, 4, 5, 6].map(el => (
      <div
        key={`dayname-${el}`}
        className="reactanggal__calendar-day reactanggal__calendar-day-name"
      >
        {format(addDays(weekStart, el), 'EEEEEE')}
      </div>
    ))
  }, [])

  const renderWeeks = useMemo(() => {
    if (step !== 0) return

    const weeks = []
    let currentWeekStart = startOfWeek(startOfMonth(preSelection))
    for (let i = 0; i < getWeeksInMonth(preSelection); i++) {
      weeks.push(
        <Week
          key={`week-${i}`}
          weekStart={currentWeekStart}
          week={i}
        />
      )
      currentWeekStart = addWeeks(currentWeekStart, 1)
    }
    return weeks
  }, [preSelection, step])

  const renderYearsColumn = useMemo(() => {
    if (step !== 1) return

    const yearsColumn = []
    let currentYearStart = myGetYearStart(preSelectionYear, 24)
    for (let i = 0; i < 6; i++) {
      yearsColumn.push(
        <Years
          key={`yearColumn-${i}`}
          yearStart={currentYearStart}
          yearColumn={i}
        />
      )
      currentYearStart = currentYearStart + 4
    }

    return yearsColumn
  }, [step, preSelectionYear])

  const renderMonths = useMemo(() => {
    if (step !== 2) return
    return <Months />
  }, [step])

  const renderCalender = useMemo(() => {
    if (step === 0) return renderWeeks
    else if (step === 1) return renderYearsColumn
    else if (step === 2) return renderMonths
    return
  }, [step, renderMonths, renderWeeks, renderYearsColumn])

  return (
    <div>
      {
        step === 0 &&
        <div className="reactanggal__calendar-weeks-header">
          {
            renderDayNames
          }
        </div>
      }

      <div className="reactanggal__calendar-body">
        {
          renderCalender
        }
      </div>
    </div>
  )
}

export default CalendarBody
