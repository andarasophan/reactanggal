import { addMonths, endOfMonth, format, getMonth, isAfter, isSameYear, setMonth, startOfMonth, startOfYear, subMonths } from 'date-fns'
import pakaiClass from 'pakai-class'
import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { ReactanggalContext } from '../context'

const monthsArr = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]]

const firstMonth = startOfYear(new Date())

const Months = () => {
  return <div>
    {
      monthsArr.map((el, i) => (
        <div key={`monthColumn-${i}`} className="reactanggal__calendar-months">
          {el.map(num => (
            <Month
              key={`month-${num}`}
              month={num}
            />
          ))}
        </div>
      ))
    }
  </div>
}

interface IMonth {
  month: number
}

const Month: React.FC<IMonth> = ({
  month
}) => {
  const monthRef = useRef<HTMLDivElement>(null)

  const {
    currentSelected,
    setPreSelectionYear,
    preSelectionYear,
    setPreSelection = () => { },
    setStep,
    minDate,
    maxDate,
    forceFocus,
    setForceFocus
  } = useContext(ReactanggalContext)

  const isFocusable = useMemo(() => month === getMonth(preSelectionYear), [month, preSelectionYear])

  const isDisabled = useMemo(() => {
    if (!minDate && !maxDate) return
    return (minDate && month < getMonth(minDate) && isSameYear(preSelectionYear, minDate)) || (maxDate && month > getMonth(maxDate) && isSameYear(preSelectionYear, maxDate))
  }, [minDate, maxDate, month, preSelectionYear])

  const handleClick = useCallback(() => {
    if (isDisabled) return
    setPreSelection(setMonth(preSelectionYear, month))
    setStep(0)
    setForceFocus(true)
  }, [isDisabled, setPreSelection, preSelectionYear, setStep, setForceFocus])

  //watch forceFocus
  useEffect(() => {
    if (forceFocus && isFocusable) {
      setForceFocus(false)
      monthRef.current?.focus()
    }
  }, [forceFocus, isFocusable, setForceFocus])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isFocusable) return
    const key = e.key
    if (key !== ' ' && key !== 'Enter' && key !== 'ArrowUp' && key !== 'ArrowDown' && key !== 'ArrowRight' && key !== 'ArrowLeft') return
    if (key === ' ' || key === 'Enter') {
      handleClick()
      return
    }

    let newPreSelection;
    let disabledMove;
    if (key === 'ArrowUp' || key === 'ArrowLeft') {
      newPreSelection = subMonths(preSelectionYear, key === 'ArrowUp' ? 4 : 1)
      disabledMove = minDate && isAfter(startOfMonth(minDate), newPreSelection)
    }
    else if (key === 'ArrowDown' || key === 'ArrowRight') {
      newPreSelection = addMonths(preSelectionYear, key === 'ArrowDown' ? 4 : 1)
      disabledMove = maxDate && isAfter(newPreSelection, endOfMonth(maxDate))
    }
    if (!disabledMove && newPreSelection) {
      setPreSelectionYear(newPreSelection)
      setForceFocus(true)
    }
  }, [isFocusable, handleClick, minDate, maxDate, preSelectionYear, setPreSelectionYear, setForceFocus])

  return (
    <div
      ref={monthRef}
      onKeyDown={handleKeyDown}
      tabIndex={isFocusable ? 0 : -1}
      className={pakaiClass(
        "reactanggal__button reactanggal__calendar-month",
        (+month === +getMonth(new Date()) && isSameYear(preSelectionYear, new Date())) && 'reactanggal__calendar-month--today',
        (currentSelected && +month === +getMonth(currentSelected) && isSameYear(preSelectionYear, currentSelected)) && 'reactanggal__calendar-month--selected',
        isDisabled && 'reactanggal__calendar-month--disabled'
      )}
      onClick={handleClick}
    >
      {format(addMonths(firstMonth, month), 'MMMM')}
    </div>
  )
}

export default Months
