import { addDays } from 'date-fns'
import React, { useMemo } from 'react'
import Day from './Day'

interface IWeek {
  weekStart: Date,
  week: string | number
}

const Week: React.FC<IWeek> = ({
  weekStart,
  week
}) => {
  const renderDays = useMemo(() => {
    return [0, 1, 2, 3, 4, 5, 6].map(el => (
      <Day
        key={`week-${week}-day-${el}`}
        day={addDays(weekStart, el)}
      />
    ))
  }, [weekStart, week])

  return (
    <div className="reactanggal__calendar-week">
      {renderDays}
    </div>
  )
}

export default Week
