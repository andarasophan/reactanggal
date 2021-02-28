import { getDate, isAfter, isBefore, isSameDay, isSameMonth } from 'date-fns'
import React, { useContext, useMemo } from 'react'
import clsx from 'clsx'
import { ReactanggalContext } from '../context'

interface IDay {
  day: Date
}

const Day: React.FC<IDay> = ({
  day
}) => {
  const {
    currentSelected,
    setCurrentSelected,
    setPreSelection = () => { },
    preSelection,
    showOutsideMonth,
    minDate,
    maxDate
  } = useContext(ReactanggalContext)

  const isOutsideMonth = useMemo(() => !isSameMonth(day, preSelection), [day, preSelection])

  const isDisabled = useMemo(() => {
    if (!minDate && !maxDate) return
    return (minDate && isBefore(day, minDate)) || (maxDate && isAfter(day, maxDate))
  }, [minDate, day, maxDate])

  const handleClick = () => {
    if (isDisabled) return
    if (isOutsideMonth && !showOutsideMonth) return
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
        isOutsideMonth && `reactanggal__calendar-day-num--${showOutsideMonth ? 'outside' : 'hidden'}`,
        isDisabled && 'reactanggal__calendar-day-num--disabled'
      )}
      onClick={handleClick}
    >
      {getDate(day)}
    </div>
  )
}

export default Day
