import { addWeeks, getDate, isAfter, isBefore, isSameDay, isSameMonth, subDays, subWeeks } from 'date-fns'
import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { ReactanggalContext } from '../context'
import pakaiClass from 'pakai-class'
import { addDays } from 'date-fns/esm'

interface IDay {
  day: Date
}

const Day: React.FC<IDay> = ({
  day
}) => {
  const dayRef = useRef<HTMLDivElement>(null)

  const {
    currentSelected,
    setCurrentSelected,
    setPreSelection = () => { },
    preSelection,
    showOutsideMonth,
    minDate,
    maxDate,
    forceFocus,
    setForceFocus
  } = useContext(ReactanggalContext)

  const isOutsideMonth = useMemo(() => !isSameMonth(day, preSelection), [day, preSelection])

  const isFocusable = useMemo(() => isSameDay(day, preSelection), [day, preSelection])

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

  //watch forceFocus
  useEffect(() => {
    if (forceFocus && isFocusable) {
      setForceFocus(false)
      dayRef.current?.focus()
    }
  }, [forceFocus, isFocusable, setForceFocus])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isFocusable) return
    const key = e.key
    if (key !== ' ' && key !== 'Enter' && key !== 'ArrowUp' && key !== 'ArrowDown' && key !== 'ArrowRight' && key !== 'ArrowLeft') return
    if (key === ' ' || key === 'Enter') {
      setCurrentSelected(preSelection)
      return
    }

    let newPreSelection;
    let disabledMove;
    if (key === 'ArrowUp' || key === 'ArrowLeft') {
      newPreSelection = key === 'ArrowUp' ? subWeeks(preSelection, 1) : subDays(preSelection, 1)
      disabledMove = minDate && isBefore(newPreSelection, minDate)
    }
    else if (key === 'ArrowDown' || key === 'ArrowRight') {
      newPreSelection = key === 'ArrowDown' ? addWeeks(preSelection, 1) : addDays(preSelection, 1)
      disabledMove = maxDate && isAfter(newPreSelection, maxDate)
    }
    if (!disabledMove && newPreSelection) {
      setPreSelection(newPreSelection)
      setForceFocus(true)
    }
  }, [setCurrentSelected, preSelection, setPreSelection, setForceFocus, isFocusable, minDate, maxDate])

  return (
    <div
      onKeyDown={handleKeyDown}
      ref={dayRef}
      tabIndex={isFocusable ? 0 : -1}
      className={pakaiClass(
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
