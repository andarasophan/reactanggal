import { getDate, isSameDay, isSameMonth } from 'date-fns'
import React, { useContext } from 'react'
import clsx from 'clsx'
import { ReactanggalContext } from '../context'

interface IDay {
  day: Date
}

const Day: React.FC<IDay> = ({
  day
}) => {
  const { currentSelected, setCurrentSelected, setPreSelection = () => { }, preSelection, showOutsideMonth } = useContext(ReactanggalContext)

  const handleClick = () => {
    if (!(typeof setCurrentSelected === 'function')) return
    setCurrentSelected(day)
    if (!isSameMonth(day, preSelection)) setPreSelection(day)
  }

  return (
    <div
      className={clsx(
        'reactanggal__calendar-day reactanggal__calendar-day-num reactanggal__button',
        isSameDay(day, new Date()) && 'reactanggal__calendar-day-num--today',
        (currentSelected && isSameDay(day, currentSelected)) && 'reactanggal__calendar-day-num--selected',
        !isSameMonth(day, preSelection) && `reactanggal__calendar-day-num--${showOutsideMonth ? 'disabled' : 'hidden'}`
      )}
      onClick={handleClick}
    >
      {getDate(day)}
    </div>
  )
}

export default Day
