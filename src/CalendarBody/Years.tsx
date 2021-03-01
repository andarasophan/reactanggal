import { getYear, setYear, subYears } from 'date-fns'
import { addYears } from 'date-fns/esm'
import pakaiClass from 'pakai-class'
import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { ReactanggalContext } from '../context'

interface IYears {
  yearStart: string | number,
  yearColumn: string | number
}

interface IYear {
  year: number
}

const Years: React.FC<IYears> = ({
  yearStart,
  yearColumn
}) => {
  const renderYears = useMemo(() => {
    const years = []
    for (let i = 0; i < 4; i++) {
      years.push(
        <Year
          key={`yearColumn-${yearColumn}-year-${i}`}
          year={+yearStart + i}
        />
      )
    }
    return years
  }, [yearColumn, yearStart])

  return (
    <div className="reactanggal__calendar-years">
      {renderYears}
    </div>
  )
}

const Year: React.FC<IYear> = ({
  year
}) => {
  const yearRef = useRef<HTMLDivElement>(null)

  const {
    currentSelected,
    preSelection,
    preSelectionYear,
    setPreSelection = () => { },
    setPreSelectionYear,
    setStep,
    minDate,
    maxDate,
    forceFocus,
    setForceFocus
  } = useContext(ReactanggalContext)

  const isFocusable = useMemo(() => +year === +getYear(preSelectionYear), [year, preSelectionYear])

  const isDisabled = useMemo(() => {
    if (!minDate && !maxDate) return
    return (minDate && year < getYear(minDate)) || (maxDate && year > getYear(maxDate))
  }, [minDate, maxDate, year])

  const handleClick = useCallback(() => {
    if (isDisabled) return
    setPreSelectionYear(setYear(preSelection, year))
    setPreSelection(setYear(preSelection, year))
    setStep(2)
  }, [isDisabled, setPreSelectionYear, preSelection, year, setPreSelection, setStep])

  //watch forceFocus
  useEffect(() => {
    if (forceFocus && isFocusable) {
      setForceFocus(false)
      yearRef.current?.focus()
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
      newPreSelection = subYears(preSelectionYear, key === 'ArrowUp' ? 4 : 1)
      const getYearNewPre = getYear(newPreSelection)
      disabledMove = (minDate && getYearNewPre < getYear(minDate)) || getYearNewPre < 1
    }
    else if (key === 'ArrowDown' || key === 'ArrowRight') {
      newPreSelection = addYears(preSelectionYear, key === 'ArrowDown' ? 4 : 1)
      disabledMove = maxDate && getYear(newPreSelection) > getYear(maxDate)
    }
    if (!disabledMove && newPreSelection) {
      setPreSelectionYear(newPreSelection)
      setForceFocus(true)
    }
  }, [isFocusable, handleClick, minDate, maxDate, preSelectionYear, setPreSelectionYear, setForceFocus])

  return (
    <div
      ref={yearRef}
      onKeyDown={handleKeyDown}
      tabIndex={isFocusable ? 0 : -1}
      className={pakaiClass(
        "reactanggal__button reactanggal__calendar-year",
        +year === +getYear(new Date()) && 'reactanggal__calendar-year--today',
        (currentSelected && +year === +getYear(currentSelected)) && 'reactanggal__calendar-year--selected',
        isDisabled && 'reactanggal__calendar-year--disabled'
      )}
      onClick={handleClick}
    >
      {year}
    </div>
  )
}

export default Years
